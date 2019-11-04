const express = require('express');
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');

const router = express.Router();

const { checkIfLoggedIn, findUserDolls } = require('../middlewares');

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
router.get('/mycollection', async (req, res, next) => {
  const { _id } = req.session.currentUser;
  
  try {
    const user = await User.findById({ _id });  
    // console.log(user.myCollection)
    // const dolls = []; 
    // user.myCollection.forEach(async (el) => {
    //   const doll = await MyDoll.findById(el).populate('doll');    
    //   dolls.push(doll);
    //   console.log(dolls)
    //   return dolls;   
    // })

    const myCollection = await findUserDolls(user.myCollection); 
      // console.log(myCollection)
       
   
    
    // const myCollection = dolls;
     
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

// POST add a doll to user's wishlist
router.post('/catalog/:brand/:dollId', checkIfLoggedIn, async (req, res, next) => {
  const { dollId } = req.params;
  const { _id } = req.session.currentUser; 
  try {
    const owner = _id;
    const doll = dollId;
    const myDoll = await MyDoll.create({ owner, doll });
    const user = await User.findByIdAndUpdate(_id, { $push: { myWishlist: [myDoll.id] } }, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
