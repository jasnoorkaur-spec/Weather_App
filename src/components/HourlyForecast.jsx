import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setError, setLoading, setResponse} from "../redux_features/weatherSlice";
import { fetchWeatherbyCity } from '../API/WeatherAPI'
import { CalendarRange, ChevronRight } from 'lucide-react'
import {Link} from 'react-router-dom'

const HourlyForecast = () => 
{
    const {response,loading,error,Isday} = useSelector((store)=>store.weather);
    
    const getWeatherIcon= (Code,is_day) => 
    {
        if (Code === 0) {
            return is_day===1 ? `/src/assets/icons/clear-day.svg` : `/src/assets/icons/clear-night.svg`;
        }

        if ([1, 2, 3].includes(Code)) {
            return is_day===1 ? `/src/assets/icons/cloudy-day.svg` : `/src/assets/icons/cloudy-night.svg`;
        }

        if ([45, 48].includes(Code)) {
            return `/src/assets/icons/fog.svg`;
        }

        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(Code)) {
            return `/src/assets/icons/rainy.svg`;
        }

        if ([71, 73, 75, 77, 85, 86].includes(Code)) {
            return `/src/assets/icons/snow.svg`;
        }

        if ([95, 96, 99].includes(Code)) {
            return `/src/assets/icons/thunderstorm.svg`;
        }

        return is_day===1 ? `/src/assets/icons/clear-day.svg` : `/src/assets/icons/clear-night.svg`;
    };

    if(loading) return <div className="h-68 max-w-210 w-full mx-auto rounded-2xl animate-pulse bg-white/30"></div>
    
    if (response) 
    {
        const currentTime = response.current.time.slice(0, 13);

        const currentIndex = response.hourly.time.findIndex(
            (time) => time.startsWith(currentTime)
        );
        

        return (

        <div className={`bg-white/20 border border-white/30 backdrop-blur-md shadow-sm shadow-[#143762]/40  w-full max-w-210 mx-auto rounded-2xl px-4 pb-5 ${(Isday===1 ? `text-[#143762]` : `text-white/80`)}`}>

            <div className="flex justify-between my-3">
                <p className="text-md sm:text-xl font-bold flex items-center gap-2">
                    <CalendarRange className="mt-1"/>
                    24-Hour Forecast</p>
                <Link to='/forecast' className="flex sm:gap-1 cursor-pointer " >
                    <span className="hidden md:block">View full forecast</span><span><ChevronRight /></span>
                </Link>
            </div>
            
            <div className="flex gap-2 mt-6 overflow-x-auto sm:flex-nowrap scrollbar-none rounded-2xl">

                { response.hourly.time.slice(currentIndex,currentIndex+16).map((time, idx) => ({ time, idx })).filter(({idx}) => idx % 3 === 0 ).map(({time,idx})=>    // time = each item in the array
                    {
                    
                        const formattedTime =  new Date(time).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit"
                        });

                        const actualIndex = currentIndex + idx;

                        const code = response.hourly.weather_code[actualIndex]
                        const is_day = response.hourly.is_day[actualIndex];
                        

                        return (
                        <div key={idx} className="min-h-42 min-w-25 sm:min-h-45 sm:min-w-32 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-sm shadow-[#143762]/40 flex flex-col items-center">
                            
                            <p className=" font-medium mt-2">{formattedTime}</p>
                            <img alt='' src={getWeatherIcon(code,is_day)} className="h-20 w-20 mt-3 contrast-125 saturate-150 brightness-90"/>
                            <p className="text-lg sm:text-[25px] font-semibold">{Math.round(response.hourly.temperature_2m[actualIndex])}°</p>

                        </div> )
                    })
                }
            </div>

        </div> )
    } 
}

export default HourlyForecast