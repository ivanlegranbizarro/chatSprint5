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
  const [ emailError, setEmailError ] = React.useState( '' );
  const [ passwordError, setPasswordError ] = React.useState( '' );

  const validateName = ( name ) => {
    if ( name.length < 3 ) {
      setNameError( 'Name must be at least 3 characters long' );
      return false;
    }
    if ( name.length > 12 ) {
      setNameError( 'Name must be at most 12 characters long' );
      return false;
    }
    setNameError( '' );
    return true;
  };

  const validateEmail = ( email ) => {
    const regex = /\S+@\S+\.\S+/;
    if ( !regex.test( email ) ) {
      setEmailError( 'Invalid email address' );
      return false;
    }
    setEmailError( '' );
    return true;
  };

  const validatePassword = ( password ) => {
    if ( password.length < 6 ) {
      setPasswordError( 'Password must be at least 6 characters long' );
      return false;
    }
    if ( password.length > 12 ) {
      setPasswordError( 'Password must be at most 12 characters long' );
      return false;
    }
    setPasswordError( '' );
    return true;
  };

  const register = async () => {
    const nameValid = validateName( user.name );
    const emailValid = validateEmail( user.email );
    const passwordValid = validatePassword( user.password );

    if ( !nameValid || !emailValid || !passwordValid ) {
      return;
    }

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
          onChange={e => setUser( { ...user, name: e.target.value } )}
          onBlur={e => validateName( e.target.value )}
          placeholder='Enter your name'
          className='border border-gray-400 p-2 rounded'
        />
        {nameError && <p className='text-red-500'>{nameError}</p>}
        <input type="email"
          value={user.email}
          onChange={e => setUser( { ...user, email: e.target.value } )}
          onBlur={e => validateEmail( e.target.value )}
          placeholder='Enter your email'
          className='border border-gray-400 p-2 rounded'
        />
        {emailError && <p className='text-red-500'>{emailError}</p>}
        <input type="password"
          value={user.password}
          onChange={e => setUser( { ...user, password: e.target.value } )}
          onBlur={e => validatePassword( e.target.value )}
          placeholder='Enter your password'
          className='border border-gray-400 p-2 rounded'
        />
        {passwordError && <p className='text-red-500'>{passwordError}</p>}
        <input type="password"
          value={user.passwordConfirmation}
          onChange={e => setUser( { ...user, passwordConfirmation: e.target.value } )}
          placeholder='Confirm your password'
          className='border border-gray-400 p-2 rounded'
        />
        <button onClick={register} className='bg-green-500 text-white p-2 rounded'>Register</button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
}

export default Register;


