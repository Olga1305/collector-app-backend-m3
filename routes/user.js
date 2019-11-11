const express = require('express');
const MyDoll = require('../models/MyDoll');

const router = express.Router();

const { checkIfLoggedIn } = require('../middlewares');
const {
  checkIfDollInTheList,
  getDollPhotos,
  getEbayQueries,
} = require('../middlewares/helpers');


// GET user's collection
router.get('/mycollection', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const dolls = await MyDoll.find({ owner: _id }).populate('doll');
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

// GET user's wishlist
router.get('/mywishlist', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const dolls = await MyDoll.find({ favOwner: _id }).populate('doll');
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

// GET a single doll from user's collection
router.get('/mycollection/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  try {
    const myDoll = await MyDoll.findById(dollId).populate('doll');
    if (myDoll) {
      getDollPhotos(myDoll.doll);
      getEbayQueries(myDoll.doll);
      res.json(myDoll);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

// GET a single doll from user's wishlist
router.get('/mywishlist/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  try {
    const myDoll = await MyDoll.findById(dollId).populate('doll');
    if (myDoll) {
      getDollPhotos(myDoll.doll);
      getEbayQueries(myDoll.doll);
      res.json(myDoll);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

// POST add a doll to user's collection
router.post(
  '/mycollection/:dollId',
  checkIfLoggedIn,
  async (req, res, next) => {
    const { dollId } = req.params;
    const { _id } = req.session.currentUser;
    const list = 'mycollection';
    try {
      const result = await checkIfDollInTheList(_id, dollId, list);
      if (!result) {
        const owner = _id;
        const doll = dollId;
        const myDoll = await MyDoll.create({ owner, doll });
        res.json(myDoll);
      }
    } catch (error) {
      next(error);
    }
  }
);

// POST add a doll to user's wishlist
router.post('/mywishlist/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser;
  const list = 'mywishlist';
  try {
    const result = await checkIfDollInTheList(_id, dollId, list);
    if (!result) {
      const favOwner = _id;
      const doll = dollId;
      const myDoll = await MyDoll.create({ favOwner, doll });
      res.json(myDoll);
    }
  } catch (error) {
    next(error);
  }
});

// PUT update doll in user's collection
router.put('/mycollection/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { purchaseDate, purchasePrice, purchaseWay, condition, kit } = req.body;

  try {
    const doll = await MyDoll.findByIdAndUpdate(dollId, {
      purchaseDate,
      purchasePrice,
      purchaseWay,
      condition,
      kit,
    });
    res.json(doll);
  } catch (error) {
    next(error);
  }
});

// PUT update doll in user's wishlist
router.put('/mywishlist/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { condition, kit } = req.body;

  try {
    const doll = await MyDoll.findByIdAndUpdate(dollId, {
      condition,
      kit,
    });
    res.json(doll);
  } catch (error) {
    next(error);
  }
});

// DELETE a single doll from user's collection
router.delete(
  '/mycollection/:dollId',
  checkIfLoggedIn,
  async (req, res, next) => {
    const { dollId } = req.params;
    try {
      const deletedDoll = await MyDoll.findByIdAndDelete(dollId);
      res.json(deletedDoll);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a single doll from user's wishlist
router.delete(
  '/mywishlist/:dollId',
  checkIfLoggedIn,
  async (req, res, next) => {
    const { dollId } = req.params;
    try {
      const deletedDoll = await MyDoll.findByIdAndDelete(dollId);
      res.json(deletedDoll);
    } catch (error) {
      next(error);
    }
  }
);

// GET check if doll is in user's collection
router.get('/mycollection/:dollId/check', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { dollId } = req.params;
  const list = 'mycollection';
  try {
    const result = await checkIfDollInTheList(_id, dollId, list);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET check if doll is in user's wishlist
router.get('/mywishlist/:dollId/check', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { dollId } = req.params;
  const list = 'mywishlist';
  try {
    const result = await checkIfDollInTheList(_id, dollId, list);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
