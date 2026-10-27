import { fetchCoordinates, fetchWeatherbyCity } from '../API/WeatherAPI'
import { useEffect} from 'react';
import { setError, setFore_time, setIsday, setLoading,  setResponse,  setResults, setWeatherCode, setmax_temp, setmin_temp} from '../redux_features/weatherSlice';

import { Search } from 'lucide-react'
import { useState } from 'react'
import { setQuery } from '../redux_features/weatherSlice'
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

    const [City, setCity] = useState(""); 
    const {results,Isday,query} = useSelector((store)=>store.weather);  

    const dispatch = useDispatch();
    
    const submitHandle = (e) =>
    {
        e.preventDefault();
        dispatch(setQuery(City));
        setCity("");
    }


  return (

    <div className={`pt-10 inset-0 -z-20 w-full max-w-md sm:max-w-xl`}>

        <h1 className={`${(Isday===1 ? `text-[#143762]/95` : `text-white/80`)} sm:text-[47px] text-[35px] text-center  font-bold `}>Find Your Weather</h1>
        <p className={`${(Isday===1 ? `text-[#143762]/80` : `text-white/75`)} text-center sm:text-[20px] text-[16px]`} >Search for a city to see the latest forecast.</p>

        <form 
        className='relative mt-10'
        onSubmit={submitHandle}>

            <Search size={18} className={` ${(Isday===1 ? `text-[#143762]/80` : `text-white/70`)} hidden sm:block absolute z-10 top-1/2 -translate-y-1/2 left-5 `}/>
            <input 
            required
            placeholder='Search a city, or location' 
            type='text' 
            value={City}
            onChange={(e)=>{
                setCity(e.target.value);
            }}
            className={`bg-white/10 border border-white/20 backdrop-blur-xl outline-none rounded-4xl w-full px-8 sm:px-13 py-5 ${(Isday===1 ? `placeholder:text-[#143762]` : `placeholder:text-white/70`)} text-sm sm:text-[17px] shadow-md shadow-[#143762]/70`}/>
        
            <button
            className={`hidden sm:block cursor-pointer active:scale-98 bg-white/20 border border-white/20 ${(Isday===1 ? `text-[#143762]` : `text-white/70`)} px-6 py-3 rounded-4xl absolute top-1/2 -translate-y-1/2 right-2 font-medium transition hover:shadow-lg hover:shadow-[#143762]/30 `}
            >Search</button>

            <button>
                <Search size={28} className={` ${(Isday===1 ? `text-[#143762]` : `text-white/70`)} sm:hidden absolute z-10 top-1/2 -translate-y-1/2 right-6 bg-white/20 rounded-2xl p-1 cursor-pointer active:scale-96`}/>
            </button>


        </form>

    </div>
  )
}

export default Navbar