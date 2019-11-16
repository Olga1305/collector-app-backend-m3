/* eslint-disable no-param-reassign */

const isValidID = id => (req, res, next) => {
  if (req.params[id].match(/^[0-9a-fA-F]{24}$/)) next();
  else res.status(404).json({ code: 'not found' });
};

const checkIfLoggedIn = (req, res, next) => {
  if (req.session.backTo) delete req.session.backTo;
  if (req.session.currentUser) {
    next();
  } else {
    req.session.backTo = req.originalUrl;
    res.status(401).json({ code: 'unauthorized' });
  }
};

const checkEmailAndPasswordNotEmpty = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== '' && password !== '') {
    res.locals.auth = req.body;
    next();
  } else {
    res.status(422).json({ code: 'validation' });
  }
};

module.exports = {
  isValidID,
  checkIfLoggedIn,
  checkEmailAndPasswordNotEmpty,
};

