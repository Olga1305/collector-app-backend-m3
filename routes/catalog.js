const express = require("express");
const Doll = require("../models/Doll");

const router = express.Router();

// const { checkIfLoggedIn } = require('../middlewares');

// GET all dolls listing
router.get("/", async (req, res, next) => {
  try {
    const dolls = await Doll.find();
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

// GET subbrand dolls listing
router.get("/:brand", async (req, res, next) => {
  const { brand } = req.params;
  let subBrand;

  if (brand === "fashionroyalty") {
    subBrand = "Fashion Royalty";
  } else if (brand === "nuface") {
    subBrand = "Nu Face";
  } else {
    subBrand = "Poppy Parker";
  }

  try {
    const dolls = await Doll.find({ subBrand });
    res.json(dolls);
  } catch (error) {
    next(error);
  }
});

// GET doll details
router.get("/:brand/:dollId", async (req, res, next) => {
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
