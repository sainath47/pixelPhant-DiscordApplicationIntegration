
const mongoose = require("mongoose");

//---------------------------------validation-----------------------

const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

function isValidDate(input) {
    return !isNaN(Date.parse(input));
  }

  function isPositiveNumber(input) {
    return !isNaN(input) && parseFloat(input) > 0;
  }


module.exports ={isValid, isValidObjectId, isValidRequestBody, isValidDate, isPositiveNumber}