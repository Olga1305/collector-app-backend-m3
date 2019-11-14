const Ebay = require('ebay-node-api');

const clientId = process.env.EBAY_CLIENT;

const ebay = new Ebay({
  clientID: clientId,
});

const findByKeywords = query => ebay.findItemsByKeywords(query)
.then((data) => {
  return data;
}, (error) => {
  console.log(error);
});

module.exports = {
  findByKeywords,
};
