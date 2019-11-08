/* eslint-disable no-param-reassign */
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');
const WishlistDoll = require('../models/WishlistDoll');


const checkIfDollInTheList = async (_id, dollId, model) => {
  let result;
  let found = 0;
  let dolls;
  if (model === 'MyDoll') {
    dolls = await MyDoll.find({ owner: _id});
  }
  if (model === 'WishlistDoll') {
    dolls = await WishlistDoll.find({ owner: _id});
  }
  dolls.forEach((el) => {
    if (el.doll._id.toString() === dollId.toString()) {
      return found++;
    }
    return found;
  });
  if (found === 0) {
    result = false;
    return result;
  }
  result = true;
  return result;
};

const getDollPhotos = (doll) => {
  doll.images = [];

  if (doll.closeUpImage) {
    doll.images.push(doll.closeUpImage);
  }
  if (doll.image1) {
    doll.images.push(doll.image1);
  }
  if (doll.image2) {
    doll.images.push(doll.image2);
  }
  if (doll.image3) {
    doll.images.push(doll.image3);
  }
  if (doll.image4) {
    doll.images.push(doll.image4);
  }
  if (doll.accessoriesImage) {
    doll.images.push(doll.accessoriesImage);
  }
  return doll;
};

const getEbayQueries = (doll) => {
  doll.ebayQueries = [];

  const baseQuery = (
    `${doll.subBrand 
    } ${ 
    doll.character 
    } ${ 
    doll.name}`
  ).toLowerCase();
  const nrfb = `${baseQuery  } nrfb`;
  const nude = `${baseQuery  } doll nude`;
  const head = `${baseQuery  } doll head`;
  const outfit = `${baseQuery  } outfit`;

  // const subBrand = encodeURI(doll.subBrand);

  doll.ebayQueries.push(baseQuery, nrfb, nude, head, outfit);

  return doll;
};

module.exports = {
  checkIfDollInTheList,
  getDollPhotos,
  getEbayQueries,
};
