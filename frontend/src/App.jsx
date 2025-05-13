import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'

const App = () => {
  return (
    <div className=' flex flex-col items-center justify-start'>
    <Routes>
<Route  path='/' element={<HomePage/>}  />
<Route  path='/login' element={<LoginPage/>}  />
<Route path='/signup' element={<SignupPage/>}  />

    </Routes>
    </div>
  )
}

export default App