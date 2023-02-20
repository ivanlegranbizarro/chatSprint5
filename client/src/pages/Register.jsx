import React from 'react';

function Register () {
  const [ user, setUser ] = React.useState( {
    name: '',
    email: '',
    password: '',
  } );

  return (
    <div className='h-screen bg-green-500 flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-3 w-96'>
        <h1 className='text-2xl uppercase'>Chat Register</h1>
        <hr />
        <input type="text"
          value={user.name}
          onChange={e => setUser( { ...user, name: e.target.value } )}
          placeholder='Enter your name'
          className='border border-gray-400 p-2 rounded'
        />
        <input type="email"
          value={user.email}
          onChange={e => setUser( { ...user, email: e.target.value } )}
          placeholder='Enter your email'
          className='border border-gray-400 p-2 rounded'
        />
        <input type="password"
          value={user.password}
          onChange={e => setUser( { ...user, password: e.target.value } )}
          placeholder='Enter your password'
          className='border border-gray-400 p-2 rounded'
        />
        <button className='bg-green-500 hover:bg-green-700 text-white p-2 rounded mt-2'>Register</button>
      </div>
    </div>
  );
}

export default Register;
