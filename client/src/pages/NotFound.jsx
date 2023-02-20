import React from 'react';

function NotFound () {
  return (
    <div className='h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center'>
      <div className='bg-white shadow-md p-5 flex flex-col gap-3 w-96'>
        <h1 className='text-6xl font-bold text-gray-900'>404</h1>
        <p className='text-2xl font-medium text-gray-900'>
          Oops! Looks like this page doesn't exist.
        </p>
        <img
          src='https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif'
          alt='Cute dog with a sign that says "404"'
          className='mx-auto'
        />
        <button className='bg-gray-900 text-white p-2 rounded mt-2'>
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
