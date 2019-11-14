
const MyDoll = require('../models/MyDoll');

const checkIfDollInTheList = async (_id, dollId, list) => {
  let result;
  let found = 0;
  let dolls;
  if (list === 'mycollection') {
    dolls = await MyDoll.find({ owner: _id});
  }
  if (list === 'mywishlist') {
    dolls = await MyDoll.find({ favOwner: _id});
  }
  dolls.forEach((el) => {
    if (el.doll._id.toString() === dollId.toString()) {
      found += 1;
      return found;
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
    `${ 
      doll.character 
    } ${ 
      doll.name}`
  ).toLowerCase();
  const nrfb = `${baseQuery  } nrfb`;
  const nude = `${baseQuery  } doll nude`;
  const head = `${baseQuery  } doll head`;
  const outfit = `${baseQuery  } outfit`;

  doll.ebayQueries.push(baseQuery, nrfb, nude, head, outfit);

  return doll;
};

module.exports = {
  checkIfDollInTheList,
  getDollPhotos,
  getEbayQueries,
};
