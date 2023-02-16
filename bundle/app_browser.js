(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // packages/adapter/index_browser.js
  var require_index_browser = __commonJS({
    "packages/adapter/index_browser.js"(exports, module) {
      function isNode() {
        return false;
      }
      function isBrowser() {
        return true;
      }
      module.exports = {
        isNode,
        isBrowser
      };
    }
  });

  // packages/some/index.js
  var require_some = __commonJS({
    "packages/some/index.js"() {
      var adapter2 = require_index_browser();
    }
  });

  // app_browser.js
  var adapter = require_index_browser();
  var some = require_some();
  console.log("isNode=%s", adapter.isNode());
  console.log("isBrowser=%s", adapter.isBrowser());
})();
