import { useSelector , useDispatch } from 'react-redux';
import { fetchCoordinates, fetchWeatherbyCity } from '../API/WeatherAPI'
import { useEffect, useState } from 'react';
import { setError, setFore_time, setIsday, setLoading,  setRecent,  setResponse,  setResults, setWeatherCode, setmax_temp, setmin_temp} from '../redux_features/weatherSlice';
import { Droplet, Eye, Gauge, Wind } from 'lucide-react';
import clearday from '/src/assets/icons/clear-day.svg';
import clearnight from '/src/assets/icons/clear-night.svg';
import cloudnight from '/src/assets/icons/cloudy-night.svg';
import cloudday from '/src/assets/icons/cloudy-day.svg';
import rainy from '/src/assets/icons/rainy.svg';
import fog from '/src/assets/icons/fog.svg';
import snow from '/src/assets/icons/snow.svg';
import storm from '/src/assets/icons/thunderstorm.svg';

const CityCard = () => 
{
    const [Coord, setCoord] = useState(null);

    const {query,loading,error,results,max_temp,min_temp,Isday,weatherCode} = useSelector((store)=>store.weather);
    
    const dispatch = useDispatch();

    useEffect( function() 
    {
        if(!query) return
        const getData = async () =>
        {
            try 
            {
                dispatch(setLoading());

                let res = await fetchWeatherbyCity(query);

                dispatch(setResponse(res));
                
                dispatch(setResults(res.current));

                dispatch(setWeatherCode(res.current.weather_code));
                
                dispatch(setIsday(res.current.is_day));

                dispatch(setFore_time(res.daily.time));

                dispatch(setmax_temp(res.daily.temperature_2m_max));
                dispatch(setmin_temp(res.daily.temperature_2m_min));
                
                let res2 = await fetchCoordinates(query);
                setCoord(res2);

                let rec = `${res2.name}, ${res2.country}`;
                dispatch(setRecent(rec))
                

            }
            catch (err) 
            {
                dispatch(setError(err.message))
            }
        }

        getData();

    }, [query , dispatch])
    

    if(loading) return <div className="h-68 w-full max-w-210 mx-auto rounded-2xl animate-pulse bg-white/30"></div>
    if(error) return <p>{error}</p>
        
    const formatWeatherDate = (time) => 
    {
        const date = new Date(time);
        const today = new Date();

        
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const formatted = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });
        
        return isToday ? `Today, ${formatted}` : formatted;
    };

    const getWeatherInfo = (Code) =>
    {
        if (Code === 0) {
            return `Clear Sky`;
        }

        if ([1, 2, 3].includes(Code)) {
            return `Partly Cloudy`;
        }

        if ([45, 48].includes(Code)) {
            return `Fog`;
        }

        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(Code)) {
            return `Rainy`;
        }

        if ([71, 73, 75, 77, 85, 86].includes(Code)) {
            return `Snow`;
        }

        if ([95, 96, 99].includes(Code)) {
            return `Thunderstorm`;
        }

        return `Clear Sky`;
    };

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
    

    if(results) return (
        <div className={`bg-white/20 border border-white/30 pb-4 w-full max-w-210 mx-auto rounded-2xl ${(Isday===1 ? `text-[#143762]` : `text-white/80`)} z-10 shadow-sm shadow-[#143762]/40 backdrop-blur-md`}>
            
            {Coord && (
                
                <div className='pt-4 pl-6 font-bold sm:text-3xl text-[25px]'>
                    {`${Coord.name}, ${Coord.country}`}
                </div>
            )}

            {results && (
                <div className='flex flex-col '>
                    <p className='pl-6 pt-1 '>
                        {results && formatWeatherDate(results.time)}
                    </p>

                    <div className='flex items-center gap-8 flex-wrap '>

                        <img className='h-24 w-24 md:h-30 md:w-30 pl-3 my-7 contrast-125 saturate-150 brightness-90'
                        src={results && getWeatherIcon(weatherCode,Isday)}
                        alt=""/>
                        
                        <div className='mb-2 flex flex-col items-center'>

                            <p className='sm:text-[58px] text-[40px] font-semibold ml-5'>
                            {Math.round(results.temperature_2m)}°
                            </p>

                            <div >
                                <p className='text-lg mb-1'>{getWeatherInfo(weatherCode)}</p>
                            </div>
                            
                            <p className={` ${(Isday===1 ? `text-[#143762]` : `text-white/70`)} `}>High <span className='font-medium'>{Math.round(max_temp[0])}°</span> / Low <span className='font-medium'>{Math.round(min_temp[0])}°</span> </p>

                        </div>

                        <div className='grid grid-cols-2 sm:gap-x-15 gap-y-5 sm:ml-13 ml-7 gap-x-9'>

                            <div className='flex gap-3 items-center'>
                                <Droplet/>

                                <div className='flex flex-col '>
                                    <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/70`)}`}>Humidity</p>
                                    <span className='font-medium text-md  sm:text-lg'>{results.relative_humidity_2m}%</span>
                                </div>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <Eye />

                                <div>
                                    <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/70`)}`}>Visibility</p>
                                    <span className='font-medium text-md  sm:text-lg'>{(results.visibility/1000).toFixed(1)} km</span>
                                </div>
                                
                            </div>

                            <div className='flex gap-3 items-center'>
                                <Wind />

                                <div>
                                    <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/70`)}`}>Wind</p>
                                    <span className='font-medium text-md  sm:text-lg'>{results.wind_speed_10m} km/h</span>
                                </div>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <Gauge />

                                <div>
                                    <p className={`${(Isday===1 ? `text-[#143762]` : `text-white/70`)}`}>Pressure</p>
                                    <span className='font-medium text-md  sm:text-lg'>{Math.round(results.pressure_msl)} hpa</span>
                                </div>
                                
                            </div>
                        </div>
                            

                    </div>
                    
                </div> )
            }
        </div>
    )
}


export default CityCard;