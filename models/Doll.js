const mongoose = require('mongoose');

const { Schema } = mongoose;

const dollSchema = new Schema(
  {
    subBrand: { type: String },
    name: { type: String },
    character: { type: String },
    mold: { type: String },
    body: { type: String },
    skinTone: { type: String },
    hair: { type: String },
    closeUpImage: { type: String },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    accessoriesImage: { type: String },
    images: [{ type: String }],
    collectionName: { type: String },
    type: { type: String },
    distributedBy: { type: String },
    year: { type: Number },
    editionSize: { type: Number },
    releasePrice: { type: Number },
    ebayQueries: [{ type: String }],
    ebay: [],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Doll = mongoose.model('Doll', dollSchema);

module.exports = Doll;