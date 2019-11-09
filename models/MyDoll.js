const mongoose = require('mongoose');

const { Schema } = mongoose;

const myDollSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectID, ref: 'User' },
    favOwner: { type: Schema.Types.ObjectID, ref: 'User' },
    doll: { type: Schema.Types.ObjectID, ref: 'Doll' },
    purchaseDate: { type: Date },
    purchasePrice: { type: Number },
    purchaseWay: { type: String },
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

const MyDoll = mongoose.model('MyDoll', myDollSchema);

module.exports = MyDoll;