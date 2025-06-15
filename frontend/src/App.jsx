import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'



const App = () => {

  const {authUser} = useAuthStore();
  const {check} = useAuthStore()

  useEffect(() => {
    check()
  }, [])
  

  return (
    <div>
      <Toaster/>
       <Routes>
 
      <Route path='/' element={authUser ? <HomePage/>:<Navigate to={'/login'}/>} />

    <Route path='/login' element={!authUser ? <LoginPage/> :<Navigate to={'/'}/> } />

     <Route path='/signup' element={!authUser ?<SignUpPage/>:<Navigate to={'/'} />} />
       </Routes>
    </div>
  )
}

export default App