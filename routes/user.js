const express = require('express');
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');
const WishlistDoll = require('../models/WishlistDoll');

const router = express.Router();

const { checkIfLoggedIn } = require('../middlewares');
const { checkIfDollInTheList, getDollPhotos, getEbayQueries } = require('../middlewares/helpers');


// GET user's collection
router.get('/mycollection', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const dolls = await MyDoll.find({ owner: _id}).populate('doll');
    res.json(dolls);  
  } catch (error) {
    next(error);
  }
});

// GET user's wishlist
router.get('/mywishlist', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const dolls = await WishlistDoll.find({ owner: _id}).populate('doll');
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
    const myDoll = await WishlistDoll.findById(dollId).populate('doll');    
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

// DELETE a single doll from user's collection
router.delete('/mycollection/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  try {
    const deletedDoll = await MyDoll.findByIdAndDelete(dollId);
    console.log(deletedDoll);
    res.json(deletedDoll);
  } catch (error) {
    next(error);
  }
});



// POST add a doll to user's collection
router.post('/mycollection/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser; 
  const model = 'MyDoll';
  try {
    const result = await checkIfDollInTheList(_id, dollId, model);
    if (!result) {
      const owner = _id;
      const doll = dollId;
      const myDoll = await MyDoll.create({ owner, doll });
      res.json(myDoll);
    }    
  } catch (error) {
    next(error);
  }
});

// POST add a doll to user's wishlist
router.post('/mywishlist/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser;
  const model = 'WishlistDoll'; 
  try {
    const result = await checkIfDollInTheList(_id, dollId, model);
    if (!result) {
      const owner = _id;
      const doll = dollId;
      const wishDoll = await WishlistDoll.create({ owner, doll });
      res.json(wishDoll);
    }    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
