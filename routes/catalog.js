const express = require('express');
const Doll = require('../models/Doll');

const router = express.Router();
// { mergeParams: true }
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


// // GET Subbrand dolls listing
router.get('/:brand', async (req, res, next) => {
  const  { brand } = req.params;
  console.log(brand);
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

// GET Fashion Royalty dolls listing
// router.get('/fashionroyalty', async (req, res, next) => {

//   try {
//     const dolls = await Doll.find({ subBrand: 'Fashion Royalty' });
//     res.json(dolls);
//   } catch (error) {
//     next(error);
//   }
// });

// GET Nu Face dolls listing
// router.get('/nuface', async (req, res, next) => {

//   try {
//     const dolls = await Doll.find({ subBrand: 'Nu Face' });
//     res.json(dolls);
//   } catch (error) {
//     next(error);
//   }
// });

// GET Poppy Parker dolls listing
// router.get('/poppyparker', async (req, res, next) => {

//   try {
//     const dolls = await Doll.find({ subBrand: 'Poppy Parker' });
//     res.json(dolls);
//   } catch (error) {
//     next(error);
//   }
// });



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
