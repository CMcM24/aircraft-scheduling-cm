"use client";
import MyButton from "@/Components/MyButton/MyButton";
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListSubheader,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAircraftScheduler } from "./useAircraftScheduler";
import FlightTimeline from "@/Components/FlightTimeline/FlightTimeline";

export default function AircraftSceduler() {
  const {
    currentAircraft,
    allAircraft,
    allFlights,
    onSelectAircraft,
    onDeselectAircraft,
    onSelectFlight,
    onDeselectFlight,
    flightRotation,
    snackOpen,
    setSnackOpen,
  } = useAircraftScheduler();

  return (
    <>
      <main className="text-center grow items-center">
        <Box className="grow h-20 text-white items-center">
          <Typography variant="h3">Aircraft Scheduler</Typography>
        </Box><Box>
            <Typography variant="body2">Choose an aircraft, then choose your flights and add them to the 24 hour rotation.</Typography>
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
          <Box className="border-solid border-2 border-white rounded-xl max-h-[75vh] min-h-[18vh] overflow-x-hidden overflow-scroll">
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
                        className="order-white rounded-xl text-white"
                        color="primary"
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
          <Box className="border-solid border-2 border-white rounded-xl max-h-[75vh] min-h-[15vh] overflow-x-hidden overflow-scroll">
            <List>
              <ListSubheader className="bg-inherit text-base text-white">
                Flight Rotation
              </ListSubheader>
              {flightRotation.map((el, i) => {
                return (
                  <ListItem key={`flight-${i}`} className="flex">
                    <MyButton
                      variant="contained"
                      className="w-full text-white"
                      color="success"
                    >
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
                    <MyButton
                      color="error"
                      variant="outlined"
                      className="ml-2"
                      onClick={() => onDeselectFlight(el)}
                    >
                      <Typography variant="h5">X</Typography>
                    </MyButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="border-solid border-2 border-white rounded-xl max-h-[75vh] min-h-[15vh] overflow-x-hidden overflow-scroll">
            <List>
              <ListSubheader className="bg-inherit text-base text-white">
                Flights
              </ListSubheader>
              {currentAircraft > -1 &&
                allFlights.map((el, i) => {
                  return (
                    <ListItem key={`flight-${i}`} className="">
                      <MyButton
                        variant={
                          flightRotation.indexOf(el) !== -1
                            ? "contained"
                            : "outlined"
                        }
                        className="w-full text-white"
                        onClick={
                          flightRotation.indexOf(el) === -1
                            ? () => onSelectFlight(el)
                            : () => true
                        }
                      >
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
        <Typography variant="h5">Aircraft 24-Hour Timeline</Typography>
        <FlightTimeline flightData={flightRotation} />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackOpen}
          onClose={() => setSnackOpen(false)}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            Unable to add flight due to overlap.
          </Alert>
        </Snackbar>
      </main>
    </>
  );
}
