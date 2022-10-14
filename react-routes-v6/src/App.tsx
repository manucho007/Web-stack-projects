import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import BookRoutes from './pages/BookRoutes';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink end to={'/'}>
              {({ isActive }) => {
                return isActive ? 'Active Home' : 'Home';
              }}
            </NavLink>
          </li>
          <li>
            <NavLink to={'/books'}>Books</NavLink>
          </li>
        </ul>
      </nav>
      {location.state}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/*' element={<BookRoutes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
