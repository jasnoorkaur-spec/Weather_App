import { useSelector } from "react-redux";

const WeekForecast = ({item,Max_temp,Min_temp,code}) => 
{

  const { Isday } = useSelector((store)=>store.weather);

  const day = new Date(item).toLocaleDateString("en-US", 
    {
      weekday:"short",
    });

  const getWeatherIcon= (weatherCode,is_day) => 
    {
        if (weatherCode === 0) {
            return is_day===1 ? `/src/assets/icons/clear-day.svg` : `/src/assets/icons/clear-night.svg`;
        }

        if ([1, 2, 3].includes(weatherCode)) {
            return is_day===1 ? `/src/assets/icons/cloudy-day.svg` : `/src/assets/icons/cloudy-night.svg`;
        }

        if ([45, 48].includes(weatherCode)) {
            return `/src/assets/icons/fog.svg`;
        }

        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
            return `/src/assets/icons/rainy.svg`;
        }

        if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
            return `/src/assets/icons/snow.svg`;
        }

        if ([95, 96, 99].includes(weatherCode)) {
            return `/src/assets/icons/thunderstorm.svg`;
        }

        return is_day===1 ? `/src/assets/icons/clear-day.svg` : `/src/assets/icons/clear-night.svg`;
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
  

  
  return (
    <div className={`min-h-42 min-w-25 sm:min-h-45 sm:min-w-32 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-sm shadow-[#143762]/40 flex flex-col items-center justify-around `}>
        
        <p className={`text-center mt-1 font-bold text-[#003971] ${(Isday===1 ? `text-[#143762]` : `text-white/80`)}`}>{day} </p>

        <img alt='' src={getWeatherIcon(code,1)} className="sm:h-20 sm:w-20 h-15 w-15 mt-3 contrast-125 saturate-150 brightness-90"/>

        <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/80`)} text-sm sm:text-[16px]`}>{getWeatherInfo(code)}</p>

        <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/80`)} pb-2`}> 
            <span className="font-medium">{Math.round(Max_temp)}° / </span> 
            {Math.round(Min_temp)}° 
        </p>
        
    </div> )
}

export default WeekForecast