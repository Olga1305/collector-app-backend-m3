const mongoose = require('mongoose');

const { Schema } = mongoose;

const myDollSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectID, ref: 'User' },
    doll: { type: Schema.Types.ObjectID, ref: 'Doll' },
    purchaseDate: { type: Date },
    purchasePrice: { type: Number },
    purchaseWay: { type: String },
    state: { type: String, default: 'Perfect' },
    complete: { type: Boolean, default: true },
    nudeDoll: { type: Boolean, default: false},
    headOnly: { type: Boolean, default: false },
    outfitOnly: { type: Boolean, default: false },
    partialOutfit: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const MyDoll = mongoose.model('MyDoll', myDollSchema);

module.exports = MyDoll;