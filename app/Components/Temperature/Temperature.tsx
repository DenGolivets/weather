'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Temperature () {

  const { forecast } = useGlobalContext();
  
  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
  return <Skeleton className='h-[32rem] w-full col-span-2 md:col-span-full' />;
  };

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  // State

  const [localTime, setLocalTime] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live Time Update

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);

      const formatedTime = localMoment.format('HH:mm:ss');

      const day = localMoment.format('dddd');

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div className='pt-6 pb-5 px-4 border rounded-lg flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='py-10 font-bold gap-1 flex items-center'>
        <span className='uppercase'>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold text-center'>
        {temp}°
      </p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
        </div>
        <p className='flex items-center gap-4'>
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  )
};

export default Temperature;
