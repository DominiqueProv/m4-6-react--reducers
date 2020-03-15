module.exports.delay = length =>
  new Promise(resolve => setTimeout(resolve, length));

//create the 3 seconds delay