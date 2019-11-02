const express = require("express");
const User = require("../models/User");
const Doll = require("../models/Doll");
const MyDoll = require("../models/MyDoll");

const router = express.Router();

const { checkIfLoggedIn } = require("../middlewares");

// GET show user's profile
router.get('/profile', checkIfLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);    
    res.json(user);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
