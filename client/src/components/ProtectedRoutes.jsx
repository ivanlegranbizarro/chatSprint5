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
    <div>
      {/* content */}
      {isAuthenticated && children}
    </div>
  );
}

export default ProtectedRoutes;
