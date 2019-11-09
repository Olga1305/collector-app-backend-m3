const MyDoll = require('../models/MyDoll');

const router = express.Router();

const { checkIfLoggedIn } = require('./index');

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

// GET list
const getList = (list) => {
  router.get(`/${list}`, checkIfLoggedIn, async (req, res, next) => {
    const { _id } = req.session.currentUser;
    try {
      const dolls = await MyDoll.find({ owner: _id}).populate('doll');
      res.json(dolls);  
    } catch (error) {
      next(error);
    }
  });
}

// GET a single doll 
const getSingleDoll = (list) => {
  router.get(`/${list}/:dollId`, checkIfLoggedIn, async (req, res, next) => {
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
}

// POST add a doll to a list
const addDollToList = (list) => {
  router.post(`/${list}/:dollId`, checkIfLoggedIn, async (req, res, next) => {
    const { dollId } = req.params;
    const { _id } = req.session.currentUser; 
    try {
      const result = await checkIfDollInTheList(_id, dollId, list);
      if (!result) {
        const owner = _id;
        const favOwner = _id;
        const doll = dollId;
        let myDoll;
        if (list === 'mycollection') {
          myDoll = await MyDoll.create({ owner, doll });
        }
        if (list === 'mywishlist') {
          myDoll = await MyDoll.create({ favOwner, doll });
        }
        res.json(myDoll);
      }    
    } catch (error) {
      next(error);
    }
  });
}

// PUT update doll 
const updateDoll = (list) => {
  router.put(`/${list}/:dollId`, checkIfLoggedIn, async (req, res, next) => {
    const { dollId } = req.params;
    const {
      purchaseDate,
      purchasePrice,
      purchaseWay,
      condition,
      kit,
    } = req.body;
    
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
}

// DELETE a doll 
const deleteDoll = (list) => {
  router.delete(`/${list}/:dollId`, checkIfLoggedIn, async (req, res, next) => {
    const { dollId } = req.params;
    try {
      const deletedDoll = await MyDoll.findByIdAndDelete(dollId);
      res.json(deletedDoll);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = {
  checkIfDollInTheList,
  getDollPhotos,
  getEbayQueries,
  getList,
  getSingleDoll,
  addDollToList,
  updateDoll,
  deleteDoll,
};
