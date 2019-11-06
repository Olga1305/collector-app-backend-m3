const express = require('express');
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');

const router = express.Router();

const { checkIfLoggedIn } = require('../middlewares');
const { findUserDolls, checkIfDollInTheList, getDollPhotos, getEbayQueries } = require('../middlewares/helpers');

// GET show user's profile
// router.get('/profile', checkIfLoggedIn, async (req, res, next) => {
//   const { _id } = req.session.currentUser;
//   try {
//     const user = await User.findById({ _id });
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });


// GET show user's collection
router.get('/mycollection', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const list = 'myCollection';
  try {
    const user = await findUserDolls(_id, list);
    res.json(user.myCollection);  
  } catch (error) {
    next(error);
  }
});

// GET show a single doll from user's collection
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

// GET show user's wishlist
router.get('/mywishlist', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const list = 'myWishlist';
  try {
    const user = await findUserDolls(_id, list);
    res.json(user.myWishlist);
  } catch (error) {
    next(error);
  }
});

// POST add a doll to user's collection
router.post('/catalog/:brand/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser; 
  const list = 'myCollection';
  try {
    const user = await findUserDolls(_id, list);
    const result = await checkIfDollInTheList(user.myCollection, dollId);
    if (!result) {
      const owner = _id;
      const doll = dollId;
      const myDoll = await MyDoll.create({ owner, doll });
      const user = await User.findByIdAndUpdate(_id, { $push: { myCollection: [myDoll.id] } }, { new: true });
      res.json(user);
    }    
  } catch (error) {
    next(error);
  }
});

// POST add a doll to user's wishlist
router.post('/catalog/:brand/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser; 
  const list = 'myWishlist';
  try {
    const user = await findUserDolls(_id, list);
    const result = await checkIfDollInTheList(user.myWishlist, dollId);
    if (!result) {
      const owner = _id;
      const doll = dollId;
      const myDoll = await MyDoll.create({ owner, doll });
      const user = await User.findByIdAndUpdate(_id, { $push: { myWishlist: [myDoll.id] } }, { new: true });
      res.json(user);
    }    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
