import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useLocation } from "react-router-dom"
import { fetchCoordinates } from "../API/WeatherAPI";
import { setError, setLoading } from "../redux_features/weatherSlice";
import { CalendarRange, CloudRain, Droplet, Sun, Wind } from "lucide-react";
import clearday from '/src/assets/icons/clear-day.svg';
import clearnight from '/src/assets/icons/clear-night.svg';
import cloudnight from '/src/assets/icons/cloudy-night.svg';
import cloudday from '/src/assets/icons/cloudy-day.svg';
import rainy from '/src/assets/icons/rainy.svg';
import fog from '/src/assets/icons/fog.svg';
import snow from '/src/assets/icons/snow.svg';
import storm from '/src/assets/icons/thunderstorm.svg';

const Detail_forecast = () => {

  const { query, response , Fore_time , max_temp, min_temp , Isday } = useSelector((store)=>store.weather);
  const [Coord, setCoord] = useState(null);
  const dispatch = useDispatch();

  const getWeatherIcon= (Code,Isday) => 
  {
      if (Code === 0) {
          return Isday===1 ? clearday : clearnight;
      }

      if ([1, 2, 3].includes(Code)) {
          return Isday===1 ? cloudday : cloudnight;
      }

      if ([45, 48].includes(Code)) {
          return fog;
      }

      if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(Code)) {
          return rainy;
      }

      if ([71, 73, 75, 77, 85, 86].includes(Code)) {
          return snow;
      }

      if ([95, 96, 99].includes(Code)) {
          return storm;
      }

      return Isday===1 ? clearday : clearnight;
  };

  const getWeatherInfo = (weatherCode) =>
  {
      if (weatherCode === 0) {
          return `Clear Sky`;
      }

      if ([1, 2, 3].includes(weatherCode)) {
          return `Partly Cloudy`;
      }

      if ([45, 48].includes(weatherCode)) {
          return `Fog`;
      }

      if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
          return `Rainy`;
      }

      if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
          return `Snow`;
      }

      if ([95, 96, 99].includes(weatherCode)) {
          return `Thunderstorm`;
      }

      return `Clear Sky`;
  };

  const getUvInfo = (uv) => {
      if (uv == null) return { label: "N/A" };
      if (uv < 3)  return { label: "Low"};
      if (uv < 6)  return { label: "Moderate"};
      if (uv < 8)  return { label: "High" };
      if (uv < 11) return { label: "Very high"};
      return { label: "Extreme"};
  };

  useEffect( function() {

    if (!query) return 
    const getData = async () =>
    {
      try 
      {
        dispatch(setLoading());
        let res = await fetchCoordinates(query)
        setCoord(res);

        dispatch(setLoading(false));
      }
      catch(err)
      {
        dispatch(setError(err.message));
      }
    }

    getData();
    
  }, [query])

  if (!response) {
    return <Navigate to="/" replace />;
  }

  if(Coord && response)
  {
    const currentTime = response.current.time.slice(0, 13);

    const currentIndex = response.hourly.time.findIndex(
      (time) => time.startsWith(currentTime));
      
    return (
    
    <div className={`z-10 inset-0 absolute ${(Isday===1 ? `text-[#143762]` : `text-white`)} w-full mx-auto px-3`}>

      <p className="pt-8 px-10 sm:px-22 text-3xl sm:text-[35px] font-semibold ">{`Forecast for ${Coord.name}, ${Coord.country}`}</p>
      <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/80`)} px-10 sm:px-22 `}>Detailed weather conditions for the week ahead</p>

      {/* 24-hour forecast */}
      <div className="bg-white/20 border border-white/30 pb-5 rounded-2xl max-w-340 mx-auto mt-9 backdrop-blur-xl">
        <p className="flex gap-2 p-5 text-lg sm:text-xl font-medium items-center"><span className="mt-1"><CalendarRange /></span>24-Hour Forecast</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none rounded-2xl pb-1 mx-5 mt-3">

          { response.hourly.time.slice(currentIndex,currentIndex+24).map((time, idx) =>    // time = each item in the array
            {
            
              const formattedTime =  new Date(time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
              });

              const actualIndex = currentIndex + idx;

              const code = response.hourly.weather_code[actualIndex]
              const is_day = response.hourly.is_day[actualIndex];
              

              return (
              <div key={idx} className="min-h-35 min-w-30 sm:min-h-60 sm:min-w-40 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-sm shadow-[#143762]/40 flex flex-col items-center gap-2">
                  
                  <p className="mt-2 font-medium">{formattedTime}</p>
                  <img alt='' src={getWeatherIcon(code,is_day)} className="h-15 w-15 sm:h-18 sm:w-20 mt-2 contrast-125 saturate-150 brightness-90"/>
                  <p className="text-[25px] font-semibold">{Math.round(response.hourly.temperature_2m[actualIndex])}°</p>
                  <p className="flex gap-2 items-center"><span><Droplet size={18}/></span>{response.hourly.relative_humidity_2m[actualIndex]}%</p>
                  <p className="flex gap-2 items-center"><span><Wind size={18}/></span>{response.hourly.wind_speed_10m[actualIndex]} km/h</p>
              </div> )

            })
          }
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="bg-white/20 border border-white/30 rounded-2xl max-w-340 mx-auto mt-5 backdrop-blur-xl pb-4">
        <p className="flex gap-2 p-5 text-lg sm:text-xl font-medium items-center"><span className="mt-1"><CalendarRange /></span>7-day Forecast</p>

        <div className="flex flex-col gap-2 mt-2 mx-2">
        {Fore_time && Fore_time.slice(1).map ((item,idx)=>

          {
            const day = new Date(item).toLocaleDateString("en-US", {weekday:"short"} );
            const date = new Date(item).toLocaleDateString('en-IN', {day: '2-digit', month: '2-digit'} );
            const code = response.daily.weather_code[idx+1];
            
            return (

                <div key={idx}>
                  <div className="bg-white/10 border border-white/30 backdrop-blur-xl text-lg rounded-2xl w-full max-w-330 mx-auto sm:grid sm:grid-cols-[0.4fr_0.8fr_0.3fr_1fr_1fr_1.3fr_1fr] flex flex-wrap gap-4 pb-5 items-center">
          
                    <p className="font-bold sm:pl-7 pl-3 text-md sm:text-xl">{day}</p>
                    <p >{date}</p>
                    <img alt='' src={getWeatherIcon(code,1)} className="h-13 w-13 sm:h-15 sm:w-15 pt-1 contrast-125 saturate-150 brightness-90"/>
                    <p className="hidden sm:block">{getWeatherInfo(code)}</p>
                    <span className="font-bold">{Math.round(max_temp[idx+1])}° <span className="font-normal">/ {Math.round(min_temp[idx+1])}°</span> </span> 
                    <p className="flex items-center gap-2 ml-3 text-[17px] sm:text-lg">
                      <Sun />
                      UV index: <span className="font-bold">{Math.round(response.daily.uv_index_max[idx+1])}</span>
                    </p>
                    <p className="flex items-center gap-2 ml-3 text-[17px] sm:text-lg">
                      <CloudRain />
                      Rain chance: <span className="font-bold">{response.daily.precipitation_probability_max[idx+1]}%</span>
                    </p>
                  </div>
                  
                </div>
            )
            
          })
        }
        </div>
      </div>

    </div>
  )}

}

export default Detail_forecast