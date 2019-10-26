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


// GET Subbrand dolls listing
router.get('/:brand', async (req, res, next) => {
    const { brand } = req.params;
    console.log(brand)
    let subBrand;

    if ( brand === "fashionroyalty") {
        subBrand = "Fashion Royalty";
    } else if ( brand === "nuface" ) {
        subBrand = "Nu Face";
    } else {
        subBrand = "Poppy Parker";
    }      

    try {
    //   const dolls = await Doll.find();
      const dolls = await Doll.find({ subBrand });
      console.log(dolls);
      res.json(dolls);
    } catch (error) {
      next(error);
    }
  });



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