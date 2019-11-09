const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistDollSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectID, ref: 'User' },
    doll: { type: Schema.Types.ObjectID, ref: 'Doll' },
    condition: { type: String, default: 'Perfect' },
    kit: { type: String, default: 'Complete' },
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