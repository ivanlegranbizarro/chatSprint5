import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';

function App () {
  const loaderState = useSelector( state => state.loaderReducer );
  const loader = loaderState ? loaderState.loader : false;
  return (
    <div>
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
