const express = require("express");
const Doll = require("../models/Doll");

const router = express.Router();


// POST get dolls by query
router.post('/', async (req, res, next) => {
  const { query } = req.body;
  try {
    if (query !== '') {
      const allDolls = await Doll.find();
      const dolls = allDolls.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.character.toLowerCase().includes(query.toLowerCase()) ||
          item.mold.toLowerCase().includes(query.toLowerCase()) ||
          item.skinTone.toLowerCase().includes(query.toLowerCase()) ||
          item.body.toLowerCase().includes(query.toLowerCase()) ||
          item.hair.toLowerCase().includes(query.toLowerCase()) ||
          item.subBrand.toLowerCase().includes(query.toLowerCase()) ||
          item.collectionName.toLowerCase().includes(query.toLowerCase())
        );
      });
      res.json(dolls);
    }
  } catch (error) {
    next(error);
  }
});

// GET dolls by mold
router.get('/mold/:query', async (req, res, next) => {
  const { query } = req.params;
  try {
    if (query !== '') {
      const dolls = await Doll.find({ mold: {$regex : query} });     
      res.json(dolls);
    }
  } catch (error) {
    next(error);
  }
});

// GET dolls by skintone
router.get('/skintone/:query', async (req, res, next) => {
  const { query } = req.params;
  try {
    if (query !== '') {
      const dolls = await Doll.find({ skinTone: {$regex : query} });       
      res.json(dolls);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
