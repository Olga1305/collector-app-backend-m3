const express = require('express');
const Doll = require('../models/Doll');

const router = express.Router();
// const { checkIfLoggedIn } = require('../middlewares');

/* GET dolls listing. */
router.get('/', async (req, res, next) => {
  try {
    const dolls = await Doll.find();
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

router.get('/:dollId', async (req, res, next) => {
  const { dollId } = req.params;
  try {
    const doll = await Doll.findById(dollId);
    if (doll) {
      res.json(doll);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});





module.exports = router;