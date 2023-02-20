import React from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoutes ( { children } ) {
  const [ user, setUser ] = React.useState( null );
  const navigate = useNavigate();
  const [ isAuthenticated, setIsAuthenticated ] = React.useState( false );

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if ( response.success ) {
        setUser( response.data.user );
        return true;
      } else {
        toast.error( response.message, {
          position: 'top-center',
        } );
        navigate( '/login' );
        return false;
      }
    } catch ( error ) {
      toast.error( error.message, {
        position: 'top-center',
      } );
      navigate( '/login' );
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
      navigate( '/login' );
    }
  }, [] );

  return (
    <div>
      {isAuthenticated && children}
      {user?.name}
      <br />
      {user?.email}
      <ToastContainer />
    </div>
  );
}

export default ProtectedRoutes;