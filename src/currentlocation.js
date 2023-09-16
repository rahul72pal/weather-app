import {useState} from 'react'

export default function currentlocation(){

  const[data , setData] = useState({});

  const http = new XMLHttpRequest();

  const findmylocation = ()=>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        setData(position);
        console.log(position.coords.latitude,position.coords.longitude)
      },(err)=>{
        alert(err.message);
      })
    }else{
      alert("Geolocation is not supported")
    }
    
  }

  findmylocation();
  console.log(data);
  
  return{
    data
  }
}