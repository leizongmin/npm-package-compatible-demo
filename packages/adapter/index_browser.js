const util = require("util");
console.log("util module on adapter:", util);

function isNode() {
  return false;
}

function isBrowser() {
  return true;
}

module.exports = {
  isNode,
  isBrowser,
};
