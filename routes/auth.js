const express = require('express');
const bcrypt = require('bcrypt');

const { checkEmailAndPasswordNotEmpty } = require('../middlewares');

const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
  } else {
    res.status(401).json({ code: 'unauthorized' });
  }
});

router.post('/signup', checkEmailAndPasswordNotEmpty, async (req, res, next) => {
  const { username, email, password } = res.locals.auth;
  try {
    const user1 = await User.findOne({ username });
    if (user1) {
      return res.status(422).json({ code: 'username-not-unique' });
    }
    const user2 = await User.findOne({ email });
    if (user2) {
      return res.status(422).json({ code: 'email-not-unique' });
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ username, email, hashedPassword });
    req.session.currentUser = newUser;
    return res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', checkEmailAndPasswordNotEmpty, async (req, res, next) => {
  const { email, password } = res.locals.auth;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ code: 'not-found' });
    }
    if (bcrypt.compareSync(password, user.hashedPassword)) {
      req.session.currentUser = user;
      return res.json(user);
    }
    return res.status(404).json({ code: 'not-found' });
  } catch (error) {
    next(error);
  }
});

router.post('/sociallogin', async (req, res, next) => {
  const { email } = res.locals.auth;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ code: 'not-found' });
    }    
    req.session.currentUser = user;
    return res.json(user);    

  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.status(204).send();
  });
});

module.exports = router;
