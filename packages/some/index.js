const fs = require("fs");
const util = require("util");
const adapter = require("adapter");

console.log("from some: isNode=%s", adapter.isNode());
console.log("from some: isBrowser=%s", adapter.isBrowser());
console.log(fs.readFileSync(__filename, "utf8"));

if (adapter.isBrowser()) {
  console.log("this is browser env");
}

console.log("util module on some:", util);
