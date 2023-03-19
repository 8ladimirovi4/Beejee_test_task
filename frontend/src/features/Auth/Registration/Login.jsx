import './Registration.css';
import '../Input/Input';
import '../Button/Button';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { login, password } = form;
    const response = await fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.message !== 'success') {
      setErrorMessage(data.message);
      navigate('/login');
    } else {
      localStorage.setItem('user', data.user.id);
      dispatch({ type: 'AddUser', payload: data.user });
      navigate('/');
    }
  };
  return (
    <>
      <div className="authauthentication">
        <div className="login__form">
          <Link to="/" className="modal__close">
            ❌
          </Link>
          <h2 className="login__form__title">Войти</h2>
          <form onSubmit={login}>
            <Input
              title={'имя пользователя'}
              name={'login'}
              type={'text'}
              placeholder="введите логин"
            />
            <Input
              title={'Пароль'}
              name={'password'}
              type={'password'}
              placeholder="введите пароль"
            />
            <Button title={'Логин'} />
            {errorMessage !== 'success' ? (
              <div className="error-message">{errorMessage}</div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
