import './layout.css';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../features/Auth/Registration/Login';
import ToDo from '../features/List/ToDo';

const Layout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/logout" className="link">
          Logout
        </Link>
      </div>
      <div className="body">
        <Outlet />
      </div>

      <div className="footer"></div>
    </>
  );
};

export default Layout;
