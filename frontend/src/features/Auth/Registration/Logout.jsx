import './Registration.css';
import '../Input/Input';
import '../Button/Button';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/logout');
    const data = await response.json();
    if (data.message) {
      dispatch({ type: 'DelUser' });
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <>
      <div className="logout">
        <div className="login__form">
          <Link to="/" className="modal__close">
            ❌
          </Link>
          <h2 className="login__form__title">Выйти?</h2>
          <form onSubmit={logout}>
            <Button title={'Ок'} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Logout;
