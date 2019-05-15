// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app/MenuBurger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuBurger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var menuBurger =
/*#__PURE__*/
function () {
  function menuBurger() {
    _classCallCheck(this, menuBurger);

    this.navMenu = document.querySelector('nav');
    this.buttonCloseMenu = document.querySelector('nav .croi');
    this.buttons = undefined;
    this.links = undefined;
    this.bool = false;
    this.quryButtonAndLink();
    this.openMenu();
    this.closeMenu();
  }

  _createClass(menuBurger, [{
    key: "quryButtonAndLink",
    value: function quryButtonAndLink() {
      this.buttons = this.navMenu.querySelectorAll('p');
      this.links = this.navMenu.querySelectorAll('a');
    }
  }, {
    key: "openMenu",
    value: function openMenu() {
      var _this = this;

      this.links.forEach(function (button) {
        button.addEventListener('click', function (e) {
          if (_this.buttonCloseMenu.className !== 'croi active') {
            _this.links.forEach(function (link) {
              link.classList.add('active');
            });

            _this.buttons.forEach(function (button) {
              button.classList.add('active');
            });

            _this.buttonCloseMenu.classList.add('active');
          }
        }, true);
      });
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      var _this2 = this;

      this.buttonCloseMenu.addEventListener('click', function () {
        if (_this2.buttonCloseMenu.className === 'croi active') {
          _this2.links.forEach(function (link) {
            link.classList.remove('active');
          });

          _this2.buttons.forEach(function (button) {
            button.classList.remove('active');
          });

          _this2.buttonCloseMenu.classList.remove('active');
        }
      });
    }
  }, {
    key: "move",
    value: function move() {
      window.addEventListener('scroll', function (event) {
        var p = nav.querySelector('p');

        if (p.className === 'active') {
          nav.classList.add('move');
          var navLinks = document.querySelectorAll('nav a');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
          });
        }
      });
    }
  }]);

  return menuBurger;
}(); //  var menuBurge = function(){
//   var nav = document.querySelector('nav');
//   nav.addEventListener('click', function(){
//     let p =  nav.querySelectorAll('p');
//     if(p[0].classList.value[0] !== 'active'){
//       for (let i = 0; i < p.length; i++) {
//         p[i].classList.add('active')
//       }
//       nav.querySelector('.croi').classList.add('active')
//       toogleLink()
//     }
//   } , true)
//   nav.querySelector('.croi').addEventListener('click', function(){
//     let p =  nav.querySelectorAll('p');
//     for (let i = 0; i < p.length; i++) {
//       p[i].classList.remove('active')
//       if( p[0].classList.value[0] !== 'active' ){
//         toogleLink();
//       }
//     }
//     nav.querySelector('.croi').classList.remove('active')
//   }, true )
//   window.addEventListener('scroll', function ( event ) {
//     let p = nav.querySelector('p');
//     if ( p.className === 'active' ) {
//       nav.classList.add('move')
//       var navLinks = document.querySelectorAll('nav a');
//       navLinks.forEach( link => { link.classList.remove('active') });
//     }
//     window.clearTimeout( isScrolling );
//     let isScrolling = setTimeout( ()=> {
//       nav.classList.remove('move');
//       var navLinks = document.querySelectorAll('nav a');
//       navLinks.forEach( link => { link.classList.remove('active') });
//     }, 1000);
//   }, true);
// }
// var toogleLink = function(){
//   var navLinks = document.querySelectorAll('nav a');
//   for (let index = 0; index < navLinks.length; index++) {
//     navLinks[index].classList.toggle('active')
//   }
// }


exports.menuBurger = menuBurger;
},{}],"../node_modules/parcel/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"app/infinitScroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfinitScroll = void 0;

var _viewPort = require("./viewPort");

var _cluster = require("cluster");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfinitScroll =
/*#__PURE__*/
function () {
  function InfinitScroll() {
    _classCallCheck(this, InfinitScroll);

    this.elements = document.querySelectorAll('.images');
    this.scaleDeformation = 0;
    this.container = document.querySelector('.galerie__images');
    this.cloneImage(); // this.detecteLimitScroll();
    // this.clearDeformation();
  }

  _createClass(InfinitScroll, [{
    key: "cloneImage",
    value: function cloneImage() {
      var allImage = document.querySelectorAll('.galerie__images .images');
      var cln = allImage[0].cloneNode(true);
      var cln2 = allImage[0].cloneNode(true);
      this.container.appendChild(cln);
      this.container.appendChild(cln2);
      console.log(cln);
    }
  }, {
    key: "detecteLimitScroll",
    value: function detecteLimitScroll() {
      var _this = this;

      window.addEventListener('scroll', function () {
        if (_this.scaleDeformation < 1) {
          _this.scaleDeformation = 1;

          _this.deformpation();
        }

        var allImage = document.querySelectorAll('.galerie__images .images');
        var images = allImage[0];
        var imagesMemo = allImage[2];
        var veiwport = new _viewPort.ViewPort(imagesMemo, 'bottom', 'top');
        veiwport.detectViewport(function (callback) {
          if (callback) {
            _this.container.appendChild(images);
          }
        });
      });
    }
  }, {
    key: "deformpation",
    value: function deformpation() {}
  }, {
    key: "clearDeformation",
    value: function clearDeformation() {
      setInterval(function () {}, 100);
    }
  }]);

  return InfinitScroll;
}();

exports.InfinitScroll = InfinitScroll;
},{"./viewPort":"app/viewPort.js","cluster":"../node_modules/parcel/src/builtins/_empty.js"}],"app/appAbout.js":[function(require,module,exports) {
"use strict";

var _cursor = require("./cursor");

var _MenuBurger = require("./MenuBurger");

var _infinitScroll = require("./infinitScroll");

var _viewPort = require("./viewPort");

new _MenuBurger.menuBurger();

if (window.innerWidth > 800) {
  (0, _cursor.cursor)();
}
},{"./cursor":"app/cursor.js","./MenuBurger":"app/MenuBurger.js","./infinitScroll":"app/infinitScroll.js","./viewPort":"app/viewPort.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53208" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"../node_modules/parcel/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel/src/builtins/bundle-loader.js");b.register("js",require("../node_modules/parcel/src/builtins/loaders/browser/js-loader.js"));b.load([]).then(function(){require("app/appAbout.js");});
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/appAbout.4dad8ba7.js.map