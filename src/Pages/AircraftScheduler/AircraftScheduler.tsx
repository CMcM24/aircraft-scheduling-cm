"use client";
import MyButton from "@/Components/MyButton/MyButton";
import { Box, Button, List, ListItem, ListSubheader } from "@mui/material";
import { useEffect, useState } from "react";

interface IAircraftDataItem {
  ident: string;
  economySeats: number;
  base: string;
  type: string;
}
interface IFlightDataItem {
  arrivaltime: number;
  departuretime: number;
  destination: string;
  ident: string;
  origin: string;
  readable_arrival: string;
  readable_departure: string;
}

export default function AircraftSceduler() {
  const [allAircraft, setAllAircraft] = useState<IAircraftDataItem[]>([]);
  const [allFlights, setAllFlights] = useState<IFlightDataItem[]>([]);
  const [allAircraftFlights, setAllAircraftFlights] = useState<
    IFlightDataItem[]
  >([]);
  const [currentAircraft, setCurrentAircraft] = useState<number>(-1);

  useEffect(() => {
    getAircraftData();
    getFlightData();
  }, []);

  const getAircraftData = () => {
    fetch("https://recruiting-assessment.alphasights.com/api/aircrafts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("Aircraft:", data);
        setAllAircraft(data);
      });
  };

  const getFlightData = () => {
    const myData = fetch(
      "https://recruiting-assessment.alphasights.com/api/flights"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("Flights:", data);
        setAllFlights(data);
      });
  };

  const onSelectAircraft = (index: number) => {
    const filteredFlights = allFlights.filter(
      (el) => el.ident === allAircraft[index].ident
    );
    console.log("Filtered Flights:", filteredFlights)
    setCurrentAircraft(index);
    setAllAircraftFlights(filteredFlights);
  };

  const onDeselectAircraft = () => {
    setCurrentAircraft(-1);
    setAllAircraftFlights([]);
  };

  return (
    <main className="text-center grow items-center">
      <Box className="grow h-20 text-white items-center">
        Aircraft Scheduling
      </Box>
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        className="p-8"
      >
        <Box className="border-solid border-2 border-white rounded-xl">
          {allAircraft.length > 0 && (
            <List>
              <ListSubheader className="bg-inherit text-base text-white">
                Aircraft
              </ListSubheader>
              {allAircraft.map((el, i) => {
                return (
                  <ListItem key={`aircraft-${i}`}>
                    <MyButton
                      variant={`${
                        currentAircraft === i ? "contained" : "outlined"
                      }`}
                      onClick={
                        currentAircraft !== i
                          ? () => onSelectAircraft(i)
                          : onDeselectAircraft
                      }
                    >
                      <Box
                        sx={{
                          display: "grid",
                          columnGap: 3,
                          rowGap: 1,
                          gridTemplateColumns: "repeat(2, 1fr)",
                        }}
                      >
                        <div>
                          Aircraft ID: <b>{el.ident}</b>
                        </div>
                        <div>
                          Model: <b>{el.type}</b>
                        </div>
                        <div>
                          Home Base: <b>{el.base}</b>
                        </div>
                        <div>
                          # of Seats: <b>{el.economySeats}</b>
                        </div>
                      </Box>
                    </MyButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
        <Box className="border-solid border-2 border-white rounded-xl">
          <List>
            <ListSubheader className="bg-inherit text-base text-white">
              Flight Rotation
            </ListSubheader>
          </List>
        </Box>
        <Box className="border-solid border-2 border-white rounded-xl">
          <List>
            <ListSubheader className="bg-inherit text-base text-white">
              Flights
            </ListSubheader>
          </List>
        </Box>
      </Box>
    </main>
  );
}
