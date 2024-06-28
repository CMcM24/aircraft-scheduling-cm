"use client";
import { useEffect, useState } from "react";

export interface IAircraftDataItem {
  ident: string;
  economySeats: number;
  base: string;
  type: string;
}
export interface IFlightDataItem {
  arrivaltime: number;
  departuretime: number;
  destination: string;
  ident: string;
  origin: string;
  readable_arrival: string;
  readable_departure: string;
}

export const useAircraftScheduler = () => {
  const [allAircraft, setAllAircraft] = useState<IAircraftDataItem[]>([]);
  const [allFlights, setAllFlights] = useState<IFlightDataItem[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<IFlightDataItem[]>([]);
  const [flightRotation, setFlightRotation] = useState<IFlightDataItem[]>([]);
  const [currentAircraft, setCurrentAircraft] = useState<number>(-1);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    getAircraftData();
    getFlightData();
  }, []);

  const getAircraftData = async () => {
    try {
      const res = await fetch(
        "https://recruiting-assessment.alphasights.com/api/aircrafts"
      );
      if (!res.ok) {
        throw new Error(`Fetch Error: ${res.status}`);
      }
      const data = await res.json();
      setAllAircraft([data[0]]); // "Only one aircraft is to be supported", from prompt.
    } catch (error) {
      console.error("Error fetching aircraft data:", error);
    }
  };

  const getFlightData = async () => {
    try {
      const res = await fetch(
        "https://recruiting-assessment.alphasights.com/api/flights"
      );
      if (!res.ok) {
        throw new Error(`Fetch Error: ${res.status}`);
      }
      const data = await res.json();
      setAllFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  const onSelectAircraft = (index: number) => {
    const filteredFlights = allFlights.filter(
      (el) => el.ident === allAircraft[index].ident
    );
    console.log("Filtered Flights:", filteredFlights);
    setCurrentAircraft(index);
  };

  const onDeselectAircraft = () => {
    setCurrentAircraft(-1);
    setFilteredFlights(allFlights);
  };

  const onSelectFlight = (flight: IFlightDataItem) => {
    const newRotation = [...flightRotation, flight];
    const turnaroundTime = 1200; // 20min in seconds
  
    let hasOverlap = false;
  
    // Sort flights by departure time
    newRotation.sort((a, b) => a.departuretime - b.departuretime);
  
    for (let i = 1; i < newRotation.length; i++) {
      const previousFlightEndTime =
        newRotation[i - 1].arrivaltime + turnaroundTime;
      const currentFlightDepartureTime = newRotation[i].departuretime;
  
      // Check if there's a gap before this flight
      if (
        currentFlightDepartureTime <= previousFlightEndTime ||
        (i > 1 &&
          currentFlightDepartureTime - (newRotation[i - 2].arrivaltime + turnaroundTime) < turnaroundTime)
      ) {
        hasOverlap = true;
        setSnackOpen(true);
        break;
      }
    }
  
    if (!hasOverlap) {
      setFlightRotation(newRotation);
    }
  };

  const onDeselectFlight = (flight: IFlightDataItem) => {
    if (flightRotation.length === 1) {
      setFlightRotation([]);
      setFilteredFlights(allFlights);
      return;
    }
    const newRotation = [...flightRotation];
    const flightIndex = flightRotation.indexOf(flight);
    newRotation.splice(flightIndex, 1);
    setFlightRotation(newRotation);
  };

  return {
    currentAircraft,
    setCurrentAircraft,
    allAircraft,
    setAllAircraft,
    allFlights,
    setAllFlights,
    allAircraftFlights: filteredFlights,
    setAllAircraftFlights: setFilteredFlights,
    onSelectAircraft,
    onDeselectAircraft,
    onSelectFlight,
    onDeselectFlight,
    filteredFlights,
    flightRotation,
    snackOpen,
    setSnackOpen,
  };
};
