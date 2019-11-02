const express = require('express');
const Doll = require('../models/Doll');

const router = express.Router();

// GET all dolls listing
router.get('/', async (req, res, next) => {
  try {
    const dolls = await Doll.find();
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

// GET subbrand dolls listing
router.get('/:brand', async (req, res, next) => {
  const { brand } = req.params;
  let subBrand;

  if (brand === 'fashionroyalty') {
    subBrand = 'Fashion Royalty';
  } else if (brand === 'nuface') {
    subBrand = 'Nu Face';
  } else {
    subBrand = 'Poppy Parker';
  }

  try {
    const dolls = await Doll.find({ subBrand });
    const allYears = [];
    const years = [];
    const allCollections = [];
    const collections = [];

    dolls.forEach((doll) => {
      if (doll.year !== '') {
        allYears.push(doll.year);
      } else {
        return allYears;
      }
    });

    if (allYears.length > 0) {
      allYears.forEach((item) => {
        if (years.indexOf(item) === -1) {
          years.push(item);
        }
        return years;
      });
    }

    dolls.forEach((doll) => {
      if (doll.collectionName !== '') {
        allCollections.push(doll.collectionName);
      } else {
        return allCollections;
      }
    });

    if (allCollections.length > 0) {
      allCollections.forEach((item) => {
        if (collections.indexOf(item) === -1) {
          collections.push(item);
        }
        return collections;
      });
    }

    const dollsByCollection = [];
    const collectionsByYear = [];

    const findDollsByCollection = (collection) => {
      const result = { collName: collection, collection: [] };
      result.collection.push(
        dolls.filter((doll) => {
          return doll.collectionName.includes(collection);
        })
      );
      return result;
    };

    const findCollectionsByYear = (arr, year) => {
      const result = { year, yearColl: [] };
      result.yearColl.push(
        arr.filter((el) => {
          return el.collection[0][0].year === year;
        })
      );
      return result;
    };

    collections.forEach((collection) => {
      dollsByCollection.push(findDollsByCollection(collection));
    });

    years.forEach((year) => {
      collectionsByYear.push(findCollectionsByYear(dollsByCollection, year));
    });

    res.json(collectionsByYear);
  } catch (error) {
    next(error);
  }
});

// GET doll details
router.get('/:brand/:dollId', async (req, res, next) => {
  const { dollId } = req.params;
  try {
    const doll = await Doll.findById(dollId);

    if (doll) {
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

      res.json(doll);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
