import CityCard from '../components/CityCard'
import HourlyForecast from '../components/HourlyForecast'
import Forecast from '../components/Forecast'
import Insights from '../components/Insights'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Recent_search from '../components/Recent_search'

const CityPage = () => {

  const {query} = useSelector((store)=>store.weather);

  return (
    <div className='relative z-10 flex flex-col items-center'>

      <Navbar />  
      {query != '' ? <div className='flex flex-col mt-10 items-center gap-5 w-full mx-auto '>

        <CityCard />
        <HourlyForecast />
        <Forecast />
        <Insights />

      </div> : <Recent_search />}
      
        
    </div>
  )
}

export default CityPage