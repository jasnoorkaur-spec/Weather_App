import { Clock,MapPin, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"
import { setclearRecent, setError, setQuery } from "../redux_features/weatherSlice";
import { useState } from "react";
import { fetchCityFromCoords } from "../API/WeatherAPI";

const Recent_search = () => 
{
    const {recent,error} = useSelector((store)=>store.weather);
    const dispatch = useDispatch();
    const [locating, setLocating] = useState(false);

    const handleClick = () => 
    {
      if (!navigator.geolocation) {
        dispatch(setError("Geolocation is not supported by your browser"));
        return; }
      
      setLocating(true);

      navigator.geolocation.getCurrentPosition( async ({coords}) => 
      {
        try 
        {
          const city = await fetchCityFromCoords(coords.latitude, coords.longitude);
          dispatch(setQuery(city)); 

        } catch (err) 
        {
          dispatch(setError(err.message));
        } finally 
        {
          setLocating(false);
        }
      },
      (error) => 
      {
        setLocating(false);
        const messages = {
          1: "Location permission denied. Allow it in your browser settings.",
          2: "Your location is unavailable right now.",
          3: "Location request timed out. Try again.",
        };
        dispatch(setError(messages[error.code] ?? "Could not get your location"));
      },
        { enableHighAccuracy: false, timeout: 10000 });

    }

    if(error) {alert(error)};
    
    return (
      <div className="text-[#143762] flex flex-col items-center gap-8 max-w-150 mx-auto">
        {/* current location */}
        <button 
        onClick={handleClick}
        disabled={locating}
        className="cursor-pointer active:scale-99 flex items-center justify-center gap-1 text-md sm:text-[18px] font-medium sm:px-9 sm:py-4 px-6 py-3 mt-8 border border-white/50 shadow shadow-[#143762]/50 rounded-3xl">
          <MapPin />
          {locating ? "Locating..." : "Use my current location"}
        </button>

        {/* Recent Searches */}
        <div className='pb-7 mx-auto max-w-150 bg-white/10 border border-white/30 rounded-3xl shadow-md shadow-[#143762]/70'>
      
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 my-5 mx-6 font-semibold text-lg sm:text-xl">
              <Clock size={22} className="mt-1"/>
              Recent Searches</p>

            {recent.length > 0 && (
              <button
                onClick={() => dispatch(setclearRecent())}
                className="flex items-center gap-1 text-md sm:text-lg font-medium cursor-pointer mx-6 opacity-80 hover:opacity-100 transition">
                <X size={20} className="mt-1"/>
                Clear all
              </button> )}
          </div>

          <div className="px-6 mt-3">
            {recent.length === 0 ? (
            // Empty state
            <p className="text-center py-6">
              No recent searches yet. Search for a city to see it here.
            </p>) 
            : (
              // List of searches
              <div className="flex flex-wrap gap-2">
                {recent.map((city) => (
                  <button
                    key={city}
                    onClick={() => dispatch(setQuery(city))}
                    className="px-4 py-1.5 rounded-full bg-white/10 border border-white/30 hover:bg-white/30 transition cursor-pointer">
                    {city}
                  </button>
                ))}
              </div>)
            }
          </div>

        </div>

      </div>
  )
}

export default Recent_search