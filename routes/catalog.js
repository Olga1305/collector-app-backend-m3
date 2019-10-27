const express = require('express');
const Doll = require('../models/Doll');

const router = express.Router();

// const { checkIfLoggedIn } = require('../middlewares');

// GET all dolls listing
router.get('/', async (req, res, next) => {
  try {
    const dolls = await Doll.find();
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});


// GET subbrand dolls listing
router.get('/:brand', async (req, res, next) => {
  const  { brand } = req.params;
  let subBrand;

  if (brand === 'fashionroyalty') {
    subBrand = 'Fashion Royalty';
  } else if (brand === 'nuface') {
    subBrand = 'Nu Face';
  } else {
    subBrand = 'Poppy Parker';
  }

  try {
    const dolls = await Doll.find({ subBrand });
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});


// GET doll details
router.get('/:brand/:dollId', async (req, res, next) => {
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
