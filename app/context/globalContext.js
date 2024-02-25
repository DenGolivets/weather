"use Client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {

  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async () => {
    try {
      const res = await axios.get('api/weather');

      setForecast(res.data);
    } catch (error) {
      console.log('Error fetching forecast data', error.message);
    }
  };

  // Air Quality

  const fetchAirQuality = async () => {
    try {
      const res = await axios.get('api/pollution');
      setAirQuality(res.data);
    } catch (error) {
      console.log('Error fetching forecast data', error.message);
    }
  };

  // Five Day Forecast

  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get('api/fiveday');
      setFiveDayForecast(res.data);

      console.log('five day forecast data: ', res.data);
    } catch (error) {
      console.log('Error fetching five day forecast data: ', error.message);
    }
  };

  //  Fetch Uv Data

  const fetchUvIndex = async () => {
    try {
      const res = await axios.get('/api/uv');
      setUvIndex(res.data);
    } catch (error) {
      
    }
  } 

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);

  return (
    <GlobalContext.Provider 
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
      }}
    >
      <GlobalContextUpdate.Provider>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);