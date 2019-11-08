const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistDollSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectID, ref: 'User' },
    doll: { type: Schema.Types.ObjectID, ref: 'Doll' },
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

const WishlistDoll = mongoose.model('WishlistDoll', wishlistDollSchema);

module.exports = WishlistDoll;