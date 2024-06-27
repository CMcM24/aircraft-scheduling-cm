"use client";
import MyButton from "@/Components/MyButton/MyButton";
import { Box, Button, List, ListItem, ListSubheader } from "@mui/material";
import { useEffect, useState } from "react";
import { useAircraftScheduler } from "./useAircraftScheduler";

export default function AircraftSceduler() {
  const {
    currentAircraft,
    allAircraft,
    allFlights,
    onSelectAircraft,
    onDeselectAircraft,
  } = useAircraftScheduler();

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
        <Box className="border-solid border-2 border-white rounded-xl max-h-[70vh] overflow-x-hidden overflow-scroll">
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
        <Box className="border-solid border-2 border-white rounded-xl max-h-[70vh] overflow-x-hidden overflow-scroll">
          <List>
            <ListSubheader className="bg-inherit text-base text-white">
              Flight Rotation
            </ListSubheader>
          </List>
        </Box>
        <Box className="border-solid border-2 border-white rounded-xl max-h-[70vh] overflow-x-hidden overflow-scroll">
          <List>
            <ListSubheader className="bg-inherit text-base text-white">
              Flights
            </ListSubheader>
            {allFlights.map((el, i) => {
              return (
                <ListItem key={``} className="">
                  <MyButton variant="outlined" className="w-full">
                    <Box
                      sx={{
                        display: "grid",
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: "repeat(3, 1fr)",
                      }}
                    >
                      <div>
                        Aircraft ID: <b>{el.ident}</b>
                      </div>
                      <div></div>
                      <div></div>
                      <div>
                        <b>{el.origin}</b>
                      </div>
                      <div>{`--->`}</div>
                      <div>
                        <b>{el.destination}</b>
                      </div>
                      <div>
                        <b>{el.readable_departure}</b>
                      </div>
                      <div></div>
                      <div>
                        <b>{el.readable_arrival}</b>
                      </div>
                    </Box>
                  </MyButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </main>
  );
}
