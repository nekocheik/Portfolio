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
})({"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/setimmediate/setImmediate.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

},{"process":"../node_modules/process/browser.js"}],"../node_modules/timers-browserify/main.js":[function(require,module,exports) {
var global = arguments[3];
var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


require("setimmediate"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
},{"setimmediate":"../node_modules/setimmediate/setImmediate.js"}],"assets/MontreConnecter.svg":[function(require,module,exports) {
module.exports = "/MontreConnecter.d1308733.svg";
},{}],"assets/projets/armani/home__page.png":[function(require,module,exports) {
module.exports = "/home__page.51700597.png";
},{}],"assets/projets/armani/page_produits.png":[function(require,module,exports) {
module.exports = "/page_produits.7b11d942.png";
},{}],"assets/logoSocomptoir.svg":[function(require,module,exports) {
module.exports = "/logoSocomptoir.905e08d9.svg";
},{}],"assets/projets/so-comptoir/Page-S’inscrire.svg":[function(require,module,exports) {
module.exports = "/Page-S’inscrire.d91acaac.svg";
},{}],"assets/projets/so-comptoir/Home_page.svg":[function(require,module,exports) {
module.exports = "/Home_page.d891bdc8.svg";
},{}],"assets/projets/so-comptoir/Plan de travail – 1.svg":[function(require,module,exports) {
module.exports = "/Plan de travail – 1.514ff065.svg";
},{}],"assets/alien.svg":[function(require,module,exports) {
module.exports = "/alien.06625d74.svg";
},{}],"assets/projets/space-invaders/portrait.svg":[function(require,module,exports) {
module.exports = "/portrait.a3bc38dd.svg";
},{}],"app/project.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projects = void 0;
var projects = [{
  title: 'ARMANI',
  type: 'Projet personnel',
  numberProject: '1',
  subTitle: 'Projet : intégration',
  description: "R\xE9aliser un redesign du site Armani dans le quel j\u2019ai du fair le design des pages News , Produits et de la home page.\n    J\u2019ai aussi int\xE9gr\xE9 de tout le site en Mobile first responsive. ",
  skills: ['xd', 'JavaScript', 'Rellax', 'Html', 'Sass'],
  assets: {
    pesentation: require('../assets/MontreConnecter.svg'),
    image0fProject: [require('../assets/projets/armani/home__page.png'), require('../assets/projets/armani/page_produits.png')]
  },
  button: 'VISITER LE SITE',
  modifier: 'armani'
}, {
  title: 'SO’COMPTOIR',
  type: 'Projet école',
  numberProject: '2',
  subTitle: 'Projet : UI / UI',
  description: "R\xE9aliser un redesign pour un site \n    E-commerce d\u2019un bar \xE0 salade.\n    Pour ce projet nous \xE9tions une \xE9quipe de quatre dans laquelle j\u2019\xE9tais Chef de projet.\n    Les maquette \u2026\u2026  ",
  skills: ['xd', 'illustrator'],
  assets: {
    pesentation: require('../assets/logoSocomptoir.svg'),
    image0fProject: [require('../assets/projets/so-comptoir/Page-S’inscrire.svg'), require('../assets/projets/so-comptoir/Home_page.svg'), require('../assets/projets/so-comptoir/Plan de travail – 1.svg')]
  },
  link: require('../pages/So__comptoir.html'),
  button: 'REGARDER LES MAQUETTES',
  modifier: 'so_comptoir'
}, {
  title: 'SPACE-INVADERS',
  type: 'Projet personnel',
  numberProject: '3',
  subTitle: 'Projet : Javascript',
  description: "R\xE9aliser la cr\xE9ation d\u2019un jeu r\xE9tro en JavaScript. \n    </br>\n    J\u2019ai fait le jeu en Canvas ainsi qu\u2019en JavaScript natif sans l\u2019usage d\u2019aucune librairie . En ajoutant des fonctionnalit\xE9s\n    non pr\xE9sentes dans le jeu original.  ",
  skills: ['JavaScript', 'Canvas', 'Html', 'Sass'],
  link: '',
  assets: {
    pesentation: require('../assets/alien.svg'),
    image0fProject: [require('../assets/projets/space-invaders/portrait.svg')]
  },
  button: 'JOUER AU JEU',
  modifier: 'space_invaders'
}];
exports.projects = projects;
},{"../assets/MontreConnecter.svg":"assets/MontreConnecter.svg","../assets/projets/armani/home__page.png":"assets/projets/armani/home__page.png","../assets/projets/armani/page_produits.png":"assets/projets/armani/page_produits.png","../assets/logoSocomptoir.svg":"assets/logoSocomptoir.svg","../assets/projets/so-comptoir/Page-S’inscrire.svg":"assets/projets/so-comptoir/Page-S’inscrire.svg","../assets/projets/so-comptoir/Home_page.svg":"assets/projets/so-comptoir/Home_page.svg","../assets/projets/so-comptoir/Plan de travail – 1.svg":"assets/projets/so-comptoir/Plan de travail – 1.svg","../pages/So__comptoir.html":"pages/So__comptoir.html","../assets/alien.svg":"assets/alien.svg","../assets/projets/space-invaders/portrait.svg":"assets/projets/space-invaders/portrait.svg"}],"app/changeOfProject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeOfProject = changeOfProject;
exports.numberProject = void 0;

var _project = require("./project");

var _renderNavProject = require("./renderNavProject");

var _theproject = require("./theproject.js");

var numberProject = 0;
exports.numberProject = numberProject;

function changeOfProject() {
  renderChangeOfProject();
}

function renderChangeOfProject() {
  var project = document.querySelector('#home__page .project');
  project.innerHTML = "";
  exports.numberProject = numberProject = numberProject + 1;

  if (numberProject > _project.projects.length - 1) {
    exports.numberProject = numberProject = 0;
  }

  var tween = TweenLite.to(".circlesWhite", 15, {
    css: {
      animation: 'rotationCircle 15s infinite , retractation 4s forwards'
    }
  });
  setTimeout(function () {
    var tween = TweenLite.to(".circlesWhite", 15, {
      css: {
        animation: 'rotationCircle 15s infinite'
      }
    });
  }, 2900);
  var view = ChangeOfProjectView(_project.projects[numberProject]);
  project.appendChild(view.illustrationOfProject);
  project.appendChild(view.titlOfProject);
  (0, _renderNavProject.renderNavProject)(project);
}

var ChangeOfProjectView = function ChangeOfProjectView(project) {
  var view = {
    img: document.createElement('img'),
    titlOfProject: document.createElement('div'),
    illustrationOfProject: document.createElement('div'),
    a: document.createElement('a'),
    button: document.createElement('button'),
    render: function render() {
      this.a.href = "#hideenDiv";
      this.img.src = project.assets.pesentation;
      view.a.appendChild(this.img);
      this.illustrationOfProject.appendChild(this.a);
      this.titlOfProject.innerHTML = "<h3 class='".concat(project.modifier, "'>").concat(project.title, "</h3> <h4 class=\"type__of__projet\" >").concat(project.subTitle, "</h4>");
    }
  };
  view.illustrationOfProject.className = 'illustration__of__project';
  view.illustrationOfProject.addEventListener('click', function () {
    (0, _theproject.Theproject)(numberProject);
  });
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view;
};
},{"./project":"app/project.js","./renderNavProject":"app/renderNavProject.js","./theproject.js":"app/theproject.js"}],"app/renderNavProject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNavProject = void 0;

var _project = require("./project");

var _changeOfProject = require("./changeOfProject");

var renderNavProject = function renderNavProject(project) {
  var nav = document.querySelector('.nav__project p'); // console.log(numberProject)

  nav.classList.add('trasition__back');
  setTimeout(function () {
    nav.innerHTML = "";
    nav.className = "trasition__come";
    setTimeout(function () {
      nav.innerHTML = _changeOfProject.numberProject + 1;
      nav.className = "";
    }, 200);
  }, 400);
};

exports.renderNavProject = renderNavProject;
},{"./project":"app/project.js","./changeOfProject":"app/changeOfProject.js"}],"app/cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cursor = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cursor = function cursor() {
  var elipse = document.querySelector('.cursor.cursor__Two');
  var circle = document.querySelector('.cursor__one');
  var pointerCircle = new givPotionPointer(circle);
  var pointerEliplse = new givPotionPointer(elipse);
};

exports.cursor = cursor;

var givPotionPointer =
/*#__PURE__*/
function () {
  function givPotionPointer(element, child) {
    _classCallCheck(this, givPotionPointer);

    this.element = element;
    this.x = null;
    this.y = null;
    this.detectMoveCursor();
    this.child = child;
    this.scaleX = 0;
    this.scaleY = 0;
    this.clearDeformatiom();
  }

  _createClass(givPotionPointer, [{
    key: "detectMoveCursor",
    value: function detectMoveCursor() {
      var _this = this;

      window.addEventListener('mousemove', function (event) {
        _this.x = event.clientX - _this.element.getBoundingClientRect().width / 2;
        _this.y = window.pageYOffset + event.clientY - _this.element.getBoundingClientRect().height / 2;

        _this.giveMemoXY();

        if (_this.memoX > _this.x) {
          _this.scaleX++;
        } else {
          _this.scaleX--;
        }

        if (_this.memoY > _this.y) {
          _this.scaleY++;
        } else {
          _this.scaleY--;
        }

        _this.element.style.left = "".concat(_this.x, "px");
        _this.element.style.top = "".concat(_this.y, "px");
        _this.element.style.transform = "skew(".concat(_this.scaleX * 1.5, "deg , ").concat(_this.scaleY * 1.5, "deg)");
      });
    }
  }, {
    key: "giveMemoXY",
    value: function giveMemoXY() {
      if (!this.x && !this.y) {
        this.memoX = this.x;
        this.memoY = this.y;
      }
    }
  }, {
    key: "clearDeformatiom",
    value: function clearDeformatiom() {
      var _this2 = this;

      setInterval(function () {
        if (_this2.scaleY < 0) {
          _this2.scaleY++;
        } else {
          _this2.scaleY--;
        }

        if (_this2.scaleX < 0) {
          _this2.scaleX++;
        } else {
          _this2.scaleX--;
        }
      }, 25);
      setInterval(function () {
        _this2.element.style.transform = "skew(".concat(_this2.scaleX, "deg , ").concat(_this2.scaleY, "deg)");
      }, 10);
      setInterval(function () {
        _this2.memoX = _this2.x;
        _this2.memoY = _this2.y;
      }, 100);
    }
  }]);

  return givPotionPointer;
}();
},{}],"app/viewPort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewPort = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewPort =
/*#__PURE__*/
function () {
  function ViewPort(element) {
    var elementPartTouch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var bodyPartTouch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom';
    var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, ViewPort);

    this.element = element;
    this.body = {
      bottom: element.getBoundingClientRect().bottom + add,
      left: element.getBoundingClientRect().left + add,
      right: element.getBoundingClientRect().right + add,
      top: element.getBoundingClientRect().top + add
    };
    this.screen = {
      positionScreenBottom: null,
      positionScreenTop: null
    };
    this.elementPartTouch = elementPartTouch;
    this.screenPartTouch = bodyPartTouch;
    this.topNegatif();
  }

  _createClass(ViewPort, [{
    key: "detectViewport",
    value: function detectViewport(callback) {
      var _this = this;

      window.addEventListener('scroll', function (event) {
        _this.screen.positionScreenBottom = window.pageYOffset + window.innerHeight;
        _this.screen.positionScreenTop = window.pageYOffset; // console.log( this.body.top , this.screen.positionScreenTop  )

        if (_this.elementPartTouch === 'top') {
          if (_this.screenPartTouch === 'bottom') {
            if (_this.body.top <= _this.screen.positionScreenBottom) {
              return callback(true);
            } else {
              return callback(false);
            }
          } else {
            if (_this.body.top <= 0) {
              return callback(true);
            } else {
              return callback(false);
            }
          }
        } else {
          if (_this.screenPartTouch === 'bottom') {
            // console.log( this.body.bottom , this.screen.positionScreenBottom )
            if (_this.body.bottom <= _this.screen.positionScreenBottom) {
              return callback(true);
            } else {
              return callback(false);
            }
          } else {
            if (_this.body.bottom <= _this.screen.positionScreenTop) {
              return callback(true);
            } else {
              return callback(false);
            }
          }
        }
      });
    }
  }, {
    key: "topNegatif",
    value: function topNegatif() {
      if (this.body.top < 0) {// this.body.top =  String(this.body.top) ;
        // this.body.top = this.body.top.substr(1);
        // this.body.top = Number( this.body.top )
        // this.body.bottom = this.body.bottom + this.body.top  ;
      }
    }
  }]);

  return ViewPort;
}();

exports.ViewPort = ViewPort;
},{}],"app/scroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SrollPosition = void 0;

var _changeOfProject = require("./changeOfProject");

var _viewPort = require("./viewPort");

var _project = require("./project");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SrollPosition =
/*#__PURE__*/
function () {
  function SrollPosition(element) {
    _classCallCheck(this, SrollPosition);

    this.element = element;
    this.positionX = -100;
    this.numberMove = 0;
    this.memoNumberMove = this.numberMove;
    this.inversion = false;
    this.waitTime = false;
    this.bottomPage = false;
    this.translateZ = 0;
    this.onTransition = false;
  }

  _createClass(SrollPosition, [{
    key: "detectScroll",
    value: function detectScroll() {
      var _this = this;

      this.element.style.transform = "translateX( ".concat(this.positionX, "vw)");
      this.inversionPosition();
      this.detectSwipe();
      document.addEventListener("mousewheel", function (event) {
        if (!_this.checkBottomPage() || _this.onTransition) {
          return;
        }

        if (_this.positionX < 0) {
          _this.positionX = _this.positionX + event.deltaY / 1.5;
          _this.translateZ = _this.translateZ + event.deltaY / 4.5 * 55;

          if (_this.positionX >= 0 && !_this.waitTime) {
            _this.positionX = 0;
            _this.translateZ = 2024;
            _this.onTransition = true;
            _this.waitTime = true;
            setTimeout(function () {
              _this.waitTime = false;
            }, 1500);

            _this.transitionSetTimeout();

            (0, _changeOfProject.changeOfProject)();
            TweenLite.to(".project", 0, {
              css: {
                transform: "translate3d( 0px , 0px , ".concat(_this.translateZ, "px)")
              }
            });
            _this.translateZ = 0;
            console.log(_this.translateZ);
          }

          if (_this.positionX < -100) {
            _this.positionX = -100;
            _this.translateZ = 0;
          }

          if (_this.positionX >= 0) {
            _this.positionX = 0;
            _this.translateZ = 100;
          }

          _this.element.style.transform = "translateX( ".concat(_this.positionX, "vw)");

          _this.projecTransform3d();

          _this.inversion = true;
        }
      });
    }
  }, {
    key: "transitionSetTimeout",
    value: function transitionSetTimeout() {
      var _this2 = this;

      setTimeout(function () {
        _this2.onTransition = false;
      }, 1500);
    }
  }, {
    key: "projecTransform3d",
    value: function projecTransform3d() {
      TweenLite.to(".project", 3, {
        css: {
          transform: "translate3d( 0px , 0px , -".concat(this.translateZ, "px)")
        },
        ease: Power2.easeOut
      });
    }
  }, {
    key: "inversionPosition",
    value: function inversionPosition() {
      var _this3 = this;

      setInterval(function () {
        if (_this3.inversion) {
          if (_this3.positionX > -100 || !_this3.onTransition) {
            if (_this3.positionX > -100) {
              _this3.positionX = _this3.positionX - 0.3;
            }

            if (!_this3.onTransition) {
              _this3.translateZ = _this3.translateZ - 0.3;

              _this3.projecTransform3d();

              _this3.element.style.transform = "translateX( ".concat(_this3.positionX, "vw)");
            }
          } else {
            _this3.inversion = false;
          }
        }
      }, 10);
    }
  }, {
    key: "detectSwipe",
    value: function detectSwipe() {
      var _this4 = this;

      document.addEventListener('touchstart', function (evnt) {
        var startClientY = evnt.changedTouches[0].clientY;
        document.addEventListener('touchmove', function (event) {
          console.log(event);

          if (!_this4.checkBottomPage()) {
            return;
          }

          _this4.inversion = false;
          var touchDelta = event.changedTouches[0].clientY - startClientY;

          if (touchDelta < 0) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ');
            touchDelta = Number(touchDelta) / 100 * 100;
          } else {
            return;
          }

          if (_this4.positionX < 0) {
            _this4.positionX = _this4.positionX + touchDelta / 10;

            if (_this4.positionX > 0) {
              _this4.positionX = 0;
              (0, _changeOfProject.changeOfProject)();
            }

            if (_this4.positionX < -100) {
              _this4.positionX = -100;
            }

            _this4.element.style.transform = "translateX( ".concat(_this4.positionX, "vw)");

            _this4.checkInversionPosition(_this4.positionX);
          }
        });
        document.addEventListener('touchstart', function (event) {
          startClientY = 0;
        });
      });
    }
  }, {
    key: "checkInversionPosition",
    value: function checkInversionPosition(positionX) {
      var _this5 = this;

      var MemoPositionX = positionX;
      setTimeout(function () {
        if (MemoPositionX, _this5.positionX || _this5.positionX === 0) {
          _this5.inversion = true;
        }
      }, 1500);
    }
  }, {
    key: "checkBottomPage",
    value: function checkBottomPage() {
      var _this6 = this;

      var viewPort = new _viewPort.ViewPort(document.querySelector('main'), 'bottom', 'bottom', document.body.clientHeight * (40 / 100));
      viewPort.detectViewport(function (callback) {
        if (callback) {
          _this6.bottomPage = true;
        } else {
          _this6.bottomPage = false;
        }
      });
      return this.bottomPage;
    }
  }]);

  return SrollPosition;
}();

exports.SrollPosition = SrollPosition;
},{"./changeOfProject":"app/changeOfProject.js","./viewPort":"app/viewPort.js","./project":"app/project.js"}],"app/animation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = void 0;

var _viewPort = require("./viewPort");

var animation = function animation(params) {
  var titleProjet = document.querySelector('.projects h2');
  var viewPort = new _viewPort.ViewPort(titleProjet);
  viewPort.detectViewport(function (callback) {
    if (callback) {
      titleProjet.classList.add('transtision');
    } else {
      titleProjet.classList.remove('transtision');
    }
  });
};

exports.animation = animation;
},{"./viewPort":"app/viewPort.js"}],"app/app.js":[function(require,module,exports) {
"use strict";

var _timers = require("timers");

var _renderNavProject = require("./renderNavProject");

var _cursor = require("./cursor");

var _scroll = require("./scroll");

var _animation = require("./animation");

// import { menuBurger} from "./MenuBurger";
(0, _animation.animation)(); // new menuBurger();

if (window.innerWidth > 800) {
  (0, _cursor.cursor)();
}

var srollPosition = new _scroll.SrollPosition(document.querySelector('.sroll__barre'));
srollPosition.detectScroll();
},{"timers":"../node_modules/timers-browserify/main.js","./renderNavProject":"app/renderNavProject.js","./cursor":"app/cursor.js","./scroll":"app/scroll.js","./animation":"app/animation.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"../node_modules/parcel/src/builtins/loaders/browser/html-loader.js":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],"../node_modules/parcel/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
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
var b=require("../node_modules/parcel/src/builtins/bundle-loader.js");b.register("html",require("../node_modules/parcel/src/builtins/loaders/browser/html-loader.js"));b.register("js",require("../node_modules/parcel/src/builtins/loaders/browser/js-loader.js"));b.load([["So__comptoir.ef495521.html","pages/So__comptoir.html"],["theproject.adebc047.js","app/theproject.js"]]).then(function(){require("app/app.js");});
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/app.e87ca0bd.js.map