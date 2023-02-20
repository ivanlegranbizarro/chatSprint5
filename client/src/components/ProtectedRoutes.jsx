import React from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../redux/loaderSlice';
import { setUser } from '../redux/userSlice';

function ProtectedRoutes ( { children } ) {
  const { user } = useSelector( state => state.userReducer );
  const dispatch = useDispatch();
  const [ isAuthenticated, setIsAuthenticated ] = React.useState( false );

  const getCurrentUser = async () => {
    try {
      dispatch( showLoader() );
      const response = await GetCurrentUser();
      dispatch( hideLoader() );
      if ( response.success ) {
        dispatch( setUser( response.data.user ) );
        return true;
      } else {
        toast.error( response.message, {
          position: 'top-center',
        } );
        window.location.href = '/login';
        return false;
      }
    } catch ( error ) {
      dispatch( hideLoader() );
      toast.error( error.message, {
        position: 'top-center',
      } );
      window.location.href = '/login';
      return false;
    }
  };

  React.useEffect( () => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      getCurrentUser().then( result => {
        setIsAuthenticated( result );
      } );
    } else {
      window.location.href = '/login';
    }
  }, [] );

  return (
    <div className='h-screen w-screen bg-gray-100 p-2'>
      <div className='flex justify-between p-5'>
        <div className='flex items-center gap-1'>
          <i className='ri-message-3-line text-2xl'></i>
          <h1 className='text-green-500 text-2xl uppercase font-semibold'>Chat</h1>
        </div>
        <div className='flex gap-1 text-xl'>
          <i className='ri-shield-user-line'></i>
          <h1 className='underline'>{user?.name}</h1>
        </div>
      </div>
      <div className='p-5'>
        {/* content */}
        {isAuthenticated && children}
        <ToastContainer />
      </div>
    </div>
  );
}

export default ProtectedRoutes;
