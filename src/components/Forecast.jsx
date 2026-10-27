import { useSelector } from "react-redux"
import WeekForecast from "./WeekForecast";
import { CalendarRange, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Forecast = () => {

  const {query,max_temp,min_temp,Isday,response,Fore_time,loading} = useSelector((store)=>store.weather);
  
  if(loading) return <div className="h-68 w-full max-w-210 mx-auto rounded-2xl animate-pulse bg-white/30"></div>

  if(response) {
    
    return (

    <div className={`bg-white/20 border border-white/30 backdrop-blur-md shadow-sm shadow-[#143762]/40 w-full max-w-210 mx-auto px-4 pb-5 rounded-2xl ${(Isday===1 ? `text-[#143762]` : `text-white/80`)}`}>

      <div className="my-3 flex justify-between">
        <p className="text-md sm:text-xl font-bold flex items-center gap-2">
          <CalendarRange className="mt-1"/>
          7-day Forecast</p>
        <Link to='/forecast' className="flex gap-1 cursor-pointer">
          <span className="hidden md:block">View full forecast</span><span><ChevronRight /></span>
        </Link>
      </div>
      

      <div className="flex gap-2 mt-6 sm:flex-nowrap overflow-x-auto scrollbar-none rounded-2xl">
        {Fore_time && Fore_time.slice(1).map ((item,idx)=>

          {
            const code = response.daily.weather_code[idx+1];

            return (

                <div key={idx}>
                  <WeekForecast item={item} Max_temp={max_temp[idx+1]} Min_temp={min_temp[idx+1]} code={code}  />
                </div>
            )
            
          })
        }
      </div>
      
    </div> )
  }
    
    

}

export default Forecast