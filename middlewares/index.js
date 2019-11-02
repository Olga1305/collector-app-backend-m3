/* eslint-disable no-param-reassign */
const checkIfLoggedIn = (req, res, next) => {
  if (req.session.backTo) delete req.session.backTo;
  if (req.session.currentUser) {
    next();
  } else {
    req.session.backTo = req.originalUrl;
    // res.redirect('/login');
    res.status(401).json({ code: 'unauthorized' });
  }
};

const checkIfNoLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    // res.status(401).json({ code: 'unauthorized' });
  } else {
    next();
  }
};

const checkEmailAndPasswordNotEmpty = (req, res, next) => {
  const { email, password } = req.body;

  if (email !== '' && password !== '') {
    res.locals.auth = req.body;
    next();
  } else {
    // res.redirect('/signup');
    res.status(422).json({ code: 'validation' });
  }
};

module.exports = {
  checkIfLoggedIn,
  checkIfNoLoggedIn,
  checkEmailAndPasswordNotEmpty,
};
