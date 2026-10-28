import { useDispatch, useSelector } from "react-redux"
import { Cloud, CloudSun, Leaf, Sun, Sunrise, Sunset } from "lucide-react";
import rainy from '/src/assets/icons/rainy.svg'

const Insights = () => 
{

  const {Isday,response,loading} = useSelector((store)=>store.weather);
  const dispatch = useDispatch();

  const getAqiInfo = (aqi) => {
      if (aqi == null) return { label: "N/A" };
      if (aqi <= 50)  return { label: "Good"};
      if (aqi <= 100) return { label: "Moderate"};
      if (aqi <= 150) return { label: "Unhealthy for sensitive groups" };
      if (aqi <= 200) return { label: "Unhealthy"};
      if (aqi <= 300) return { label: "Very unhealthy"};
      return { label: "Hazardous"};
  };

  const getUvInfo = (uv) => {
      if (uv == null) return { label: "N/A" };
      if (uv < 3)  return { label: "Low"};
      if (uv < 6)  return { label: "Moderate"};
      if (uv < 8)  return { label: "High" };
      if (uv < 11) return { label: "Very high"};
      return { label: "Extreme"};
  };

    const aqi = response?.air_quality.us_aqi;
    const uv = response?.current.uv_index;
    
    const aqiPercent = aqi == null ? 0 : Math.min(aqi / 300, 1) * 100;
    const uvPercent  = uv  == null ? 0 : Math.min(uv / 11, 1) * 100;

    const formatTime = (str) => 
    {
      return new Date(str).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); 
    }

    const time1 = new Date(response?.daily.sunrise[0]);
    const sunrise = time1.getTime();

    const time2 = new Date(response?.daily.sunset[0]);
    const sunset = time2.getTime();

    const curr_time = new Date(response?.current.time);
    const now = curr_time.getTime();
    
    const sunpercent = Math.min(Math.max((now - sunrise) / (sunset - sunrise), 0), 1) * 100;

    
    const rain = response?.daily.precipitation_probability_max[0] ;
    const getRainInfo = (percent) => 
    {
      if (percent === null) return { label: "N/A" };
      if (percent < 10)  return { label: "Very unlikely"};
      if (percent < 30)  return { label: "Unlikely" };
      if (percent < 50)  return { label: "Possible"};
      if (percent < 70)  return { label: "Likely" };
      if (percent < 90)  return { label: "Very likely"};
      return { label: "Almost certain"};
    };
    
    if(loading) return <div className="max-w-210 w-full h-68 mx-auto rounded-2xl animate-pulse bg-white/30"></div>
    
    if(response) return (

    <div className={`bg-white/20 border border-white/30 px-4 shadow-sm shadow-[#143762]/40 backdrop-blur-md mb-5 pb-5 w-full max-w-210 mx-auto ${(Isday===1 ? `text-[#143762]` : `text-white/80`)} rounded-2xl`}>
      <p className="my-3 text-md sm:stext-xl font-bold flex gap-2"><CloudSun />Weather Insights</p>

      <div className="mt-6 flex gap-3">

        <div className="bg-white/10 backdrop-blur-xl shadow-sm shadow-[#143762]/40 border border-white/30 h-50 w-1/2 rounded-2xl">

          <p className="flex gap-2 items-center pt-3 px-3 font-semibold text-sm sm:text-xl">
            <span className="mt-1 text-green-700 bg-green-200/60 p-1.5 rounded-full"><Leaf /></span>
            Air Quality Index
          </p>

          <div className="flex ml-5 sm:ml-13 flex-wrap sm:flex-nowrap sm:gap-3 gap-1 items-end mt-5 sm:mt-3">
            <p className="text-2xl sm:text-5xl font-semibold ">{`${aqi!= null ? aqi : `Not available`}`}</p>
            <p className="text-sm sm:text-[16px]">{`${aqi != null ? getAqiInfo(aqi).label : `Not available`}`}</p>
          </div>

          <div className="relative h-2 rounded-full bg-linear-to-r from-green-500 via-yellow-400 to-red-500 mt-3 sm:mt-5 mr-5 ml-5 sm:ml-13">
              <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow border"
                  style={{ left: `${aqiPercent}%`}}
              />
          </div>
          
        </div>

        <div className="bg-white/10 backdrop-blur-xl shadow-sm shadow-[#143762]/40 border border-white/30 h-50 w-1/2 rounded-2xl">
          
          <p className="flex gap-2 items-center pt-3 px-3 font-semibold text-md sm:text-xl">
            <span className="mt-1 text-amber-500 bg-yellow-100/50 p-1.5 rounded-full"><Sun /></span>
            UV Index
          </p>

          <div className="flex ml-5 sm:ml-13 sm:flex-nowrap flex-wrap sm:gap-3 gap-1 items-end mt-4 sm:mt-3">
            <p className="text-3xl sm:text-5xl font-semibold ">{`${uv!= null ? Math.round(uv) : `Not available`}`}</p>
            <p className="">{`${uv != null ? getUvInfo(uv).label : `Not available`}`}</p>
          </div>

          <div className="relative h-2 rounded-full bg-linear-to-r from-green-500 via-yellow-400 to-red-500 mt-3 sm:mt-5 mr-5 ml-5 sm:ml-13">
              <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white shadow"
                  style={{ left: `${uvPercent}%`}}
              />
          </div>

        </div>

      </div>

      <div className="flex gap-3 mt-3 ">
        <div className="bg-white/10 border border-white/30 w-[55%] h-45 backdrop-blur-xl shadow-sm shadow-[#143762]/40 rounded-2xl ">
          
          <div className="flex justify-between items-center p-5 text-md sm:text-[17px]">
            <div className="flex items-center flex-col">
              <Sunrise sm:size={32} size={23}/>
              Sunrise
            </div>

            <div className="flex items-center flex-col">
              <Sunset sm:size={32} size={23}/>
              Sunset
              </div>
          </div>

          <div className="relative h-2 rounded-full mx-5 bg-white/40 mt-1">
            <Sun className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 ${(Isday===1 ? `text-[#143762]` : `text-white/80`)}`}
            style={{ left: `${sunpercent}%` }} />
          </div>

          <div className="flex justify-between items-center px-5 mt-5 text-lg sm:text-[22px] font-semibold">
            <p>{formatTime(time1)}</p>
            <p>{formatTime(time2)}</p>
          </div>

        </div>

        <div className="bg-white/10 border border-white/30 w-[45%] h-45 backdrop-blur-xl shadow-sm shadow-[#143762]/40 rounded-2xl ">
          <p className="px-4 py-3 font-semibold text-md sm:text-xl">Chance of rain</p>
          <div className="flex sm:gap-10 gap-5">
            <img className='sm:h-30 sm:w-30 h-15 w-15 mb-5 contrast-150 saturate-250 brightness-80'
              src={rainy}
              alt=""/>

            <div className="mt-3 sm:ml-2">
              <p className="text-2xl sm:text-4xl font-bold ">{rain}%</p>
              <p className="text-sm sm:text-lg mt-1">{getRainInfo(rain).label}</p>
            </div>

          </div>
        </div>
      </div>
      

    </div> )
  }

export default Insights