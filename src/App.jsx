import './App.css'
import snow from './assets/snow.jpg'
import clear from './assets/Clear.jpg'
import cloudy from './assets/Cloudy.jpg'
import fog from './assets/fog.png'
import rain from './assets/Rainy.jpg'
import strom from './assets/Stormy.jpg'
import sunny from './assets/Sunny.jpg'
import {useEffect, useState} from 'react'
import axios from 'axios'


export default function App() {

  const[data,setData] = useState({});
  const[location , setLocation] = useState('');
  const [image , setimage]= useState(clear)
  

  // console.log(location)

  const[longitude , setLongitude] = useState('');
  const[latitude , setLatitude] = useState('');

  const http = new XMLHttpRequest();

  function findmylocation(){

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position)
        // console.log(position.coords.longitude);
        // console.log(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude)
      },(err)=>{
        alert(err.message);
      })
    }else{
      alert("Geolocation is not supported")
    }
    
  }
  
  // console.log(longitude);
  // console.log(latitude);
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=17864f84d82f97e925103699a1101eda&units=metric`

  

  // console.log("lon and lat",url);

  
  const urlloaction = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=17864f84d82f97e925103699a1101eda&units=metric`

  findmylocation();

  function locationshow(){
     
    async function fetchdata(){
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        // console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchdata()
  }

  const serachlocation = (event)=>{
    
      if (event.key === 'Enter') {
            axios.get(urlloaction)
              .then((response) => {
                setData(response.data);
                // console.log(response.data);
                
              })
              .catch((error) => {
                console.error(error);
              });
        console.log("clear string")
    setLocation('');
          }
    
  }

  console.log(data);

  

  // Function to set the image based on weather condition
  function setImageByWeather(weatherMain) {
    console.log("weather image");
    switch (weatherMain) {
      case 'Clouds':
        setimage(cloudy);
        break;
      case 'Rain':
        setimage(rainy);
        break;
      case 'Clear':
        setimage(clear);
        break;
      case 'Thunderstorm':
        setimage(strom);
        break;
      case 'Fog':
        setimage(fog);
        break;
      case 'Sunny':
        setimage(sunny);
        break;
      case 'Snow':
        setimage(snow);
        break;
      default:
        setimage(clear); // Set a default image if the weather condition is unknown
    }
  }

  const weatherMain = data.weather? data.weather[0].main: null;

  console.log(weatherMain)

  

  useEffect(()=>{
    setImageByWeather(weatherMain);
  })

  console.log(image);

  
  return (
   <div className='app'>
     <div className='backgroundimg'>
       <img src={image}/>
     </div>
     <div >
       <button className='showloaction' onClick={()=>locationshow()}>Location</button>
     </div>
     <div className='searchlocation'>
       <input type='text' 
         className='inputseacrch'
          onKeyPress={serachlocation}
         onChange={event=>setLocation(event.target.value)}
         placeholder="Enter Location"
         ></input>
     </div>
     <div className='containerbox'>
       <div className='top'>
         <div className='location'>
           <p>Location: {data.name}</p>
         </div>
         <div className='temp'>
           <h1>{data.main ? data.main.temp:null}°C</h1>
         </div>
         <div className='desc'>
           <p>Main: {data.weather? data.weather[0].main: null}</p>
           <p>Visibility: {data.visibility}</p>
         </div>
       </div>
       <div className='bottom'>
         <div className='feels'>
           <p>Feels Linke: {data.main ? data.main.feels_like:null}</p>
         </div>
         <div className='humidity'>
           <p>Humidity: {data.main ? data.main.humidity:null}</p>
         </div>
         <div className='windspeed'>
           <p>Wind Speed: {data.wind? data.wind.speed: null}</p>
         </div>
       </div>
     </div>
   </div>
  )
}
