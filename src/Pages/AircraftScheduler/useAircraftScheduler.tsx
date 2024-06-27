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
    console.log("Filtered Flights:", filteredFlights);
    setCurrentAircraft(index);
    // setAllAircraftFlights(filteredFlights);
  };

  const onDeselectAircraft = () => {
    setCurrentAircraft(-1);
    setAllAircraftFlights([]);
  };

  const caluculateTimePercent = (utcVal: number) => {
    return (utcVal / 86400) * 100; //86400 is 24hrs in seconds
  };

  return {
    currentAircraft,
    setCurrentAircraft,
    allAircraft,
    setAllAircraft,
    allFlights,
    setAllFlights,
    allAircraftFlights,
    setAllAircraftFlights,
    onSelectAircraft,
    onDeselectAircraft,
    caluculateTimePercent,
  };
};
