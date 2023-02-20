import React from 'react';
import { Link } from 'react-router-dom';
import { LoginUser } from '../apicalls/users';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hideLoader, showLoader } from '../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function Login () {
  const dispatch = useDispatch();
  const [ user, setUser ] = React.useState( {
    email: '',
    password: '',
  } );

  const login = async () => {
    try {
      dispatch( showLoader() );
      const response = await LoginUser( user );
      dispatch( hideLoader() );
      if ( response.success ) {
        localStorage.setItem( 'token', response.data.token );
        window.location.href = '/';
      } else {
        toast.error( response.message, {
          position: 'top-center',
        } );
      }
    } catch ( error ) {
      dispatch( hideLoader() );
      toast.error( error.message, {
        position: 'top-center',
      } );
    }
  };

  React.useEffect( () => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      if ( window.location.pathname === '/login' ) {
        window.location.href = '/';
      }
    } else {
      if ( window.location.pathname === '/' ) {
        window.location.href = '/login';
      }
    }
  }, [] );

  return (
    <div className='h-screen bg-green-500 flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-3 w-96'>
        <h1 className='text-2xl uppercase'>Chat Login</h1>
        <hr />
        <input
          type='email'
          value={user.email}
          onChange={( e ) => setUser( { ...user, email: e.target.value } )}
          placeholder='Enter your email'
          className='border border-gray-400 p-2 rounded'
        />
        <input
          type='password'
          value={user.password}
          onChange={( e ) => setUser( { ...user, password: e.target.value } )}
          placeholder='Enter your password'
          className='border border-gray-400 p-2 rounded'
        />
        <button className='bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-2' onClick={login}>
          Login
        </button>
        <ToastContainer />
        <p className='text-sm mt-2'>
          Don't have an account yet?{' '}
          <Link to='/register' className='text-green-500 hover:text-green-700'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
