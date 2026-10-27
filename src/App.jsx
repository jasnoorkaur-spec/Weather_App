// import  { AnimatedGroupCustomVariants } from './components/HeroSection'
import {  useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import CityPage from './pages/CityPage'
import Detail_forecast from './pages/Detail_forecast'


const App = () => {

  const {Isday,results,weatherCode,query}= useSelector((store)=>store.weather);

  const getWeatherBackground = (Code, Isday) => 
    {
        if (Code === 0) {
            return Isday===1 ? `bg-[url('/src/assets/clear_day.png')]` : `bg-[url('/src/assets/clear_night.png')]`;
        }

        if ([1, 2, 3].includes(Code)) {
            return Isday===1 ? `bg-[url('/src/assets/cloud_day.png')]` : `bg-[url('/src/assets/cloud_night.png')]`;
        }

        if ([45, 48].includes(Code)) {
            return `bg-[url('/src/assets/fog.png')]`;
        }

        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(Code)) {
            return `bg-[url('/src/assets/rain.png')]`;
        }

        if ([71, 73, 75, 77, 85, 86].includes(Code)) {
            return `bg-[url('/src/assets/snow.png')]`;
        }

        if ([95, 96, 99].includes(Code)) {
            return `bg-[url('/src/assets/storm.png')]`;
        }

        return Isday===1 ? `bg-[url('/src/assets/clear_day.png')]` : `bg-[url('/src/assets/clear_night.png')]`;
    };
    

  return (
    <div className='z-0 w-full mx-auto px-3'>

        <div className={`${(results ? getWeatherBackground(weatherCode,Isday) : `bg-[url('/src/assets/clear_day.png')]` )} inset-0 fixed bg-cover`}></div>
        
        <Routes>
            <Route path='/' element={<CityPage />}/>
            <Route path='/forecast' element={<Detail_forecast />} />
            <Route path='*' element={<p>no page</p>} />
        </Routes>
        
        
    </div>
  )
}

export default App