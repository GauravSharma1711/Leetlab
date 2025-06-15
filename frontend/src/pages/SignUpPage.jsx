import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isSigningUp,signUp} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const formData = {name,email,password};
    signUp(formData);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg ">
        
        <h2 className='text-black font-semibold text-4xl text-center'>Create New Account</h2>
        
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Enter your name"
              className='input input-primary focus:outline-none focus:ring-0 focus:border-gray-300
 w-full bg-white text-black'
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              className='input input-primary focus:outline-none focus:ring-0 focus:border-gray-300
 w-full bg-white text-black'
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className='input input-primary focus:outline-none focus:ring-0 focus:border-gray-300
 w-full bg-white text-black'
            />
          </div>

          <button 
          type="submit" 
          className="btn btn-lg btn-active btn-primary w-full">
          {isSigningUp
          ?
          ( <span className="loading loading-spinner loading-sm"></span>)
          :
          ('Submit')}
           
            </button>
        </form>

        <p className='text-gray-500 text-center'>
          Already have an account? <Link className='text-blue-500' to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
