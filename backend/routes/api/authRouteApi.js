const authRouterApi = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

// Login ROUTER

authRouterApi.post('/auth/login', async (req, res) => {
  let user;
  try {
    user = await User.findOne({ where: { login: req.body.login } });

    if (!user) {
      res.json({ message: 'Пользователь не зарегистрирован' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
    return;
  }

  try {
    const compPass = await bcrypt.compare(req.body.password, user.password);

    if (!compPass) {
      res.json({ message: 'Неверный логин и/или пароль.' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
    return;
  }

  req.session.user = {
    id: user.id,
    login: user.login,
  };
  res.json({ message: 'success', user });
});

// LogOut ROUTER

authRouterApi.get('/auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: 'Не удалось выйти' });
      return;
    }
    res.clearCookie('user_sid');
    res.json({ message: 'success' });
  });
});
module.exports = authRouterApi;
