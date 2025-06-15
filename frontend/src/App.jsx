import React, { useEffect } from 'react'
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'
import ProfilePage from './pages/ProfilePage'
import CreateProblem from './pages/CreateProblem'

import ProtectedRoute from './components/ProtectRoute';
import ProblemsPage from './pages/ProblemsPage'

const App = () => {

  const {authUser} = useAuthStore();
   
  const {check, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    check()
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-gray-500">Checking Authentication...</p>
      </div>
    );
  }


  return (
    <div>
      <Toaster/>
       <Routes>
 

   <Route path='/' element={
  authUser ? <Navigate to="/problems" /> : <HomePage />
} />


    <Route path='/login' element={!authUser ? <LoginPage/> :<Navigate to={'/problems'}/> } />

     <Route path='/signup' element={!authUser ?<SignUpPage/>:<Navigate to={'/problems'} />} />

     <Route path='/profile' element={authUser ?<ProfilePage/>:<Navigate to={'/'} />} />

     <Route path='/create' element={authUser ?<CreateProblem/>:<Navigate to={'/'} />} />

  <Route path='/problems' element={authUser ?<ProblemsPage/>:<Navigate to={'/'} />} />

       </Routes>
    </div>
  )
}

export default App