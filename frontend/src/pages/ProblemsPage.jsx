import React, {  useState } from 'react'
import Navbar from '../components/Navbar'

import Table from '../components/Table';

const ProblemsPage = () => {


    


    const difficulties = ["EASY" , "MEDUIM" , "HARD"]
   
    const [difficulty, setDifficulty] = useState("ALL")
     const  [search , setSearch] = useState("");

    
    

    

  return (

      <div>


    <Navbar/>


<div className=' flex w-full items-center justify-center mt-16 ' >
{/* search bar */}
<label className="input  bg-transparent outline-none  border-none focus:outline-none focus:ring-0
">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  required placeholder="Search" 
   className=' font-semibold text-2xl'
  />
</label>
{/* difficulty dorp downs */}
  <div>
    <div className="dropdown">
  <div tabIndex={0} role="button" className="btn p-6 m-1">Difficulty</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-6 shadow-sm">
    {difficulties.map((item) => (
      <li key={item}>
        <a onClick={() => setDifficulty(item)}>{item}</a>
      </li>
    ))}
  </ul>
</div>
  </div>



  
</div>
  
 <div className=' flex w-full items-center justify-center mt-16 ' >
    <Table difficulty={difficulty} search={search} />
  </div>

    <div> 
        
        

{
  
  
}
    </div>
    </div>
  )
}

export default ProblemsPage