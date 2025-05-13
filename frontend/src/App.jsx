import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'

import {Toaster} from 'react-hot-toast'


import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';


const App = () => {

  let authUser = null;


  return (
    <div className=' flex flex-col items-center justify-start'>
      <Toaster/>
    
    <Routes>
<Route  path='/' element={ authUser ? <HomePage/> : <Navigate to={'/login'} /> }  />
<Route  path='/login' element={!authUser ? <LoginPage/> : <Navigate to={'/'}/>}  />
<Route path='/signup' element={!authUser ? <SignupPage/>: <Navigate to={'/'}/>}  />

    </Routes>
    </div>
  )
}

export default App