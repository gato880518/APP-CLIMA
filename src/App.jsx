
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import Loading from './components/Loading';
import WheatherCard from './components/WheatherCard';

function App() {

  const [coords, setCoords] = useState({})

  const [weather, setwheather] = useState()

  const [temp, settemp] = useState()


  const success = pos => {

    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)

  }, [])


  useEffect(() => {
    if (coords) {
      const apiKey = '538ca7a93f8f60101ca3dffa42ba1ba7'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL)
        .then(res => {
          setwheather(res.data)
          console.log(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * (9 / 5) + 32).toFixed(1)
          settemp({ celsius, farenheit })
        })

        .catch(err => console.log(err))
    }

  }, [coords])




  return (
    <div className="App">
      
      {
        weather?
        <WheatherCard weather={weather}
          temp={temp} />
          :
          <Loading/>
      }
    </div>
  )
}

export default App



