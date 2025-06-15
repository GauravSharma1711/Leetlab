import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const Navbar = () => {

  const navigate = useNavigate();

  const { logout , authUser } = useAuthStore();

  const handleLogout = async () => {
    await logout(); 
  }

 const handleSignup = () => {
    navigate('/signup');
};

const handleLogin = () => {
    navigate('/login');
};




  return (
     <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1/3">
    <Link to={'/'} className="btn btn-ghost text-xl">LeetLab</Link>
  </div>

  <div className="flex gap-6">

   {!authUser? 
(
    <>
   <button
   onClick={handleSignup}
   className="btn btn-soft btn-primary">SignUp</button>
<button 
onClick={handleLogin}
className="btn btn-soft btn-primary">Login</button>
    </>
)
   :
   (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://avatar.iran.liara.run/public/boy"/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'} className="justify-between"> Profile </Link>
        </li>

        <li>
          <Link to={'/create'} >CreateProblem</Link>
          </li>

        <li>
          <button onClick={handleLogout}>Logout</button>
          </li>
      </ul>
    </div>
   )
   
}

  </div>



</div>
      
      


  )
}

export default Navbar