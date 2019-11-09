const { getList, getSingleDoll, addDollToList, updateDoll, deleteDoll } = require('../middlewares/helpers');

const myCollection = 'mycollection';
const myWishlist = 'mywishlist';

// GET user's collection
getList(myCollection);

// GET user's wishlist
getList(myWishlist);

// GET a single doll from user's collection
getSingleDoll(myCollection);

// GET a single doll from user's wishlist
getSingleDoll(myWishlist);

// POST add a doll to user's collection
addDollToList(myCollection);

// POST add a doll to user's wishlist
addDollToList(myWishlist);

// PUT update doll in user's collection
updateDoll(myCollection);

// PUT update doll in user's wishlist
updateDoll(myWishlist);

// DELETE a single doll from user's collection
deleteDoll(myCollection);

// DELETE a single doll from user's wishlist
deleteDoll(myWishlist);

module.exports = router;
