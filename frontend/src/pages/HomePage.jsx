import React from 'react'



import Navbar from '../components/Navbar';
import  Home  from '../components/Home';

const HomePage = () => {


  return (
    <div className=' min-h-screen w-full ' >

    {/* navbar */}
   <Navbar/>
    <Home/>
   
    </div>
  )
}

export default HomePage