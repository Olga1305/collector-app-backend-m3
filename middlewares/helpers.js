/* eslint-disable no-param-reassign */
const User = require('../models/User');
const Doll = require('../models/Doll');
const MyDoll = require('../models/MyDoll');


const findUserDolls = async (_id, list) => {
    const user = await User.findById({ _id })
    .populate({
      path: list,
      populate: { path: 'doll'},
    }); 
    return user;
    
};

const checkIfDollInTheList = (list, dollId) => {   
    let result = undefined;   
    let found = 0;
    list.forEach((el) => {
      if (el.doll._id.toString() === dollId.toString()) {
        return found++;
      } else {
        return found;
      }
    });
    if (found === 0) {
        result = false;
        return result;
      } else {
          result = true;
        return result;
      }  
};


module.exports = {
  findUserDolls,
  checkIfDollInTheList,
};

