const isEmpty = (obj) => {
    if (Object.entries(obj).length === 0 && obj.constructor === Object)
      return true;
    return false;
  };
  
  module.exports = {
    isEmpty,
  };