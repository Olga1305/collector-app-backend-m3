const express = require('express');
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');

const router = express.Router();

const { checkIfLoggedIn } = require('../middlewares');

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
  // const dolls = []; 
  try {
    const user = await User.findById({ _id });  
   
    // try {    
       
    //   user.myCollection.forEach(async (el) => {
    //     const doll = await MyDoll.findById(el).populate('doll');      
    //     return dolls.push(doll);
    //   })      
      
      
    // } catch (error) {
    //   next(error);
    // }    
    res.json(user.myCollection);
  } catch (error) {
    next(error);
  }
});

// GET show user's wishlist
router.get('/mywishlist', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById({ _id });
    res.json(user.myWishlist);
  } catch (error) {
    next(error);
  }
});

// POST add a doll to user's collection
router.post('/catalog/:brand/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser; 
  try {
    const owner = _id;
    const doll = dollId;
    const myDoll = await MyDoll.create({ owner, doll });
    const user = await User.findByIdAndUpdate(_id, { $push: { myCollection: [myDoll.id] } }, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
