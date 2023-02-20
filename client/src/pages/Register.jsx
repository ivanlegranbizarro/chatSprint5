import React from 'react';
import { RegisterUser } from '../apicalls/users';
import { Link } from 'react-router-dom';

function Register () {
  const [ user, setUser ] = React.useState( {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  } );

  const [ nameError, setNameError ] = React.useState( '' );
  const [ passwordError, setPasswordError ] = React.useState( '' );
  const [ confirmPasswordError, setConfirmPasswordError ] = React.useState( '' );
  const [ emailError, setEmailError ] = React.useState( '' );

  const validateName = ( name ) => {
    if ( name.length < 3 || name.length > 12 ) {
      setNameError( 'Name must be between 3 and 12 characters' );
    } else {
      setNameError( '' );
    }
  };

  const validatePassword = ( password ) => {
    if ( password.length < 6 || password.length > 12 ) {
      setPasswordError( 'Password must be between 6 and 12 characters' );
    } else {
      setPasswordError( '' );
    }
  };

  const validateEmail = ( email ) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !emailRegex.test( email ) ) {
      setEmailError( 'Invalid email' );
    } else {
      setEmailError( '' );
    }
  };

  const validateConfirmPassword = ( confirmPassword ) => {
    if ( confirmPassword !== user.password ) {
      setConfirmPasswordError( 'Passwords do not match' );
    } else {
      setConfirmPasswordError( '' );
    }
  };

  const register = async () => {
    try {
      const response = await RegisterUser( user );
      if ( response.success ) {
        localStorage.setItem( 'token', response.data.token );
        window.location.href = '/';
      } else {
        console.log( response.message );
      }
    } catch ( error ) {
      console.log( error.message );
    }
  };

  return (
    <div className='h-screen bg-green-500 flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-3 w-96'>
        <h1 className='text-2xl uppercase'>Chat Register</h1>
        <hr />
        <input type="text"
          value={user.name}
          onChange={( e ) => {
            setUser( { ...user, name: e.target.value } );
            validateName( e.target.value );
          }}
          placeholder='Enter your name'
          className='border border-gray-400 p-2 rounded'
        />
        <span className='text-red-600'>{nameError}</span>
        <input type="email"
          value={user.email}
          onChange={( e ) => {
            setUser( { ...user, email: e.target.value } );
            validateEmail( e.target.value );
          }}
          placeholder='Enter your email'
          className='border border-gray-400 p-2 rounded'
        />
        <span className='text-red-600'>{emailError}</span>
        <input type="password"
          value={user.password}
          onChange={( e ) => {
            setUser( { ...user, password: e.target.value } );
            validatePassword( e.target.value );
          }}
          placeholder='Enter your password'
          className='border border-gray-400 p-2 rounded'
        />
        <span className='text-red-600'>{passwordError}</span>
        <input type="password"
          value={user.passwordConfirmation}
          onChange={( e ) => {
            setUser( { ...user, passwordConfirmation: e.target.value } );
            validateConfirmPassword( e.target.value );
          }}
          placeholder='Confirm your password'
          className='border border-gray-400 p-2 rounded'
        />
        <span className='text-red-600'>{confirmPasswordError}</span>
        <button
          className='bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-2'
          onClick={register}
          disabled={nameError || passwordError ||
            confirmPasswordError || !user.name || !user.email || !user.password || !user.passwordConfirmation}
        >
          Register
        </button>
        <Link to='/login' className='text-blue-500'>Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;
