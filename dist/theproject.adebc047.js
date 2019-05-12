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
})({"app/cursor.js":[function(require,module,exports) {
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
        _this.element.style.transform = "skew(".concat(_this.scaleX / 2, "deg , ").concat(_this.scaleY / 2, "deg)");
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
},{}],"assets/MontreConnecter.svg":[function(require,module,exports) {
module.exports = "/MontreConnecter.d1308733.svg";
},{}],"assets/logoSocomptoir.svg":[function(require,module,exports) {
module.exports = "/logoSocomptoir.905e08d9.svg";
},{}],"assets/alien.svg":[function(require,module,exports) {
module.exports = "/alien.06625d74.svg";
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
    pesentation: require('../assets/MontreConnecter.svg')
  },
  button: 'VISITER LE SITE',
  modifier: 'armani'
}, {
  title: 'SO’COMPTOIR',
  type: 'Projet école',
  numberProject: '2',
  subTitle: 'Projet : UI / UI',
  description: "R\xE9aliser un redesign pour un site \n    E-commer de vente de salade en ligne.</br>\n    Pour ce projet nous \xE9tions une \xE9quipe de 4 dans la quelle j\u2019\xE9tais Chef de projet ",
  skills: ['xd', 'illustrator'],
  assets: {
    pesentation: require('../assets/logoSocomptoir.svg')
  },
  link: require('../pages/So__comptoir.html'),
  button: 'REGARDER LES MAQUETTES',
  modifier: 'so_comptoir'
}, {
  title: 'SPACE-INVADERS',
  type: 'Projet personnel',
  numberProject: '3',
  subTitle: 'Projet : Javascript',
  description: "R\xE9aliser la cr\xE9ation d\u2019un jeu original en JavaScript.\n    J\u2019ai fait Le jeu en Canvas JavaScript natif sans l\u2019utilisation d\u2019aucune librairie .\n    Avec l\u2019ajout d\u2019\xE9l\xE9ments de gamplay qui ne sont pas dans le jeu original  ",
  skills: ['JavaScript', 'Canvas', 'Html', 'Sass'],
  link: '',
  assets: {
    pesentation: require('../assets/alien.svg')
  },
  button: 'JOUER AU JEU',
  modifier: 'space_invaders'
}];
exports.projects = projects;
},{"../assets/MontreConnecter.svg":"assets/MontreConnecter.svg","../assets/logoSocomptoir.svg":"assets/logoSocomptoir.svg","../pages/So__comptoir.html":"pages/So__comptoir.html","../assets/alien.svg":"assets/alien.svg"}],"app/renderNavProject.js":[function(require,module,exports) {
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
},{"./project":"app/project.js","./changeOfProject":"app/changeOfProject.js"}],"app/changeOfProject.js":[function(require,module,exports) {
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
  project.classList.add('back');
  setTimeout(function () {
    project.innerHTML = "";
    exports.numberProject = numberProject = numberProject + 1;

    if (numberProject > _project.projects.length - 1) {
      exports.numberProject = numberProject = 0;
    }

    var view = ChangeOfProjectView(_project.projects[numberProject]);
    project.appendChild(view.illustrationOfProject);
    project.appendChild(view.titlOfProject);
    setTimeout(function () {
      (0, _renderNavProject.renderNavProject)(project);
      project.classList.remove('back');
      project.classList.add('come');
      setTimeout(function () {
        project.classList.remove('come');
      }, 60);
    }, 500);
  }, 500);
}

var ChangeOfProjectView = function ChangeOfProjectView(project) {
  var view = {
    img: document.createElement('img'),
    titlOfProject: document.createElement('div'),
    illustrationOfProject: document.createElement('div'),
    a: document.createElement('a'),
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
},{"./project":"app/project.js","./renderNavProject":"app/renderNavProject.js","./theproject.js":"app/theproject.js"}],"app/viewPort.js":[function(require,module,exports) {
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

    _classCallCheck(this, ViewPort);

    this.element = element;
    this.body = {
      bottom: element.getBoundingClientRect().bottom,
      left: element.getBoundingClientRect().left,
      right: element.getBoundingClientRect().right,
      top: element.getBoundingClientRect().top
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
        _this.screen.positionScreenTop = window.pageYOffset;

        if (_this.elementPartTouch === 'top') {
          if (_this.screenPartTouch === 'bottom') {
            if (_this.body.top <= _this.screen.positionScreenBottom) {
              return callback(true);
            } else {
              return callback(false);
            }
          } else {
            if (_this.body.top >= _this.screen.positionScreenTop) {
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
      if (this.body.top < 0) {
        this.body.top = String(this.body.top);
        this.body.top = this.body.top.substr(1);
        this.body.top = Number(this.body.top);
        this.body.bottom = this.body.bottom + this.body.top;
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
  }

  _createClass(SrollPosition, [{
    key: "detectScroll",
    value: function detectScroll() {
      var _this = this;

      this.element.style.transform = "translateX( ".concat(this.positionX, "vw)");
      this.inversionPosition();
      this.detectSwipe();
      document.addEventListener("mousewheel", function (event) {
        if (!_this.checkBottomPage()) {
          return;
        }

        if (_this.positionX < 0) {
          _this.positionX = _this.positionX + event.deltaY;

          if (_this.positionX >= 0 && !_this.waitTime) {
            _this.positionX = 0;
            (0, _changeOfProject.changeOfProject)();
            _this.waitTime = true;
            setTimeout(function () {
              _this.waitTime = false;
            }, 1500);
          }

          if (_this.positionX < -100) {
            _this.positionX = -100;
          }

          if (_this.positionX >= 0) {
            _this.positionX = 0;
          }

          _this.element.style.transform = "translateX( ".concat(_this.positionX, "vw)");
          _this.inversion = true;
        }
      });
    }
  }, {
    key: "inversionPosition",
    value: function inversionPosition() {
      var _this2 = this;

      setInterval(function () {
        if (_this2.inversion) {
          if (_this2.positionX > -100) {
            _this2.positionX = _this2.positionX - 0.3;
            _this2.element.style.transform = "translateX( ".concat(_this2.positionX, "vw)");
          } else {
            _this2.inversion = false;
          }
        }
      }, 10);
    }
  }, {
    key: "detectSwipe",
    value: function detectSwipe() {
      var _this3 = this;

      document.addEventListener('touchstart', function (evnt) {
        var startClientY = evnt.changedTouches[0].clientY;
        document.addEventListener('touchmove', function (event) {
          if (!_this3.checkBottomPage()) {
            return;
          }

          _this3.inversion = false;
          var touchDelta = event.changedTouches[0].clientY - startClientY;

          if (touchDelta < 0) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ');
            touchDelta = Number(touchDelta) / 100 * 100;
          } else {
            return;
          }

          if (_this3.positionX < 0) {
            _this3.positionX = _this3.positionX + 5;

            if (_this3.positionX > 0) {
              _this3.positionX = 0;
              (0, _changeOfProject.changeOfProject)();
            }

            if (_this3.positionX < -100) {
              _this3.positionX = -100;
            }

            _this3.element.style.transform = "translateX( ".concat(_this3.positionX, "vw)");

            _this3.checkInversionPosition(_this3.positionX);
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
      var _this4 = this;

      var MemoPositionX = positionX;
      setTimeout(function () {
        if (MemoPositionX, _this4.positionX || _this4.positionX === 0) {
          _this4.inversion = true;
        }
      }, 1500);
    }
  }, {
    key: "checkBottomPage",
    value: function checkBottomPage() {
      var _this5 = this;

      var viewPort = new _viewPort.ViewPort(document.querySelector('main'), 'bottom', 'bottom');
      viewPort.detectViewport(function (callback) {
        if (callback) {
          _this5.bottomPage = true;
        } else {
          _this5.bottomPage = false;
        }
      });
      return this.bottomPage;
    }
  }]);

  return SrollPosition;
}();

exports.SrollPosition = SrollPosition;
;
},{"./changeOfProject":"app/changeOfProject.js","./viewPort":"app/viewPort.js"}],"app/animation.js":[function(require,module,exports) {
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
},{"./viewPort":"app/viewPort.js"}],"app/MenuBurger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuBurge = void 0;

var menuBurge = function menuBurge() {
  var nav = document.querySelector('nav');
  nav.addEventListener('click', function () {
    var p = nav.querySelectorAll('p');

    if (p[0].classList.value[0] !== 'active') {
      for (var i = 0; i < p.length; i++) {
        p[i].classList.add('active');
      }

      nav.querySelector('.croi').classList.add('active');
    }
  }, true);
  nav.querySelector('.croi').addEventListener('click', function () {
    var p = nav.querySelectorAll('p');

    for (var i = 0; i < p.length; i++) {
      p[i].classList.remove('active');
    }

    nav.querySelector('.croi').classList.remove('active');
  }, true);
  window.addEventListener('scroll', function (event) {
    var p = nav.querySelector('p');

    if (p.className === 'active') {
      nav.classList.add('move');
    }

    window.clearTimeout(isScrolling);
    var isScrolling = setTimeout(function () {
      nav.classList.remove('move');
    }, 1000);
  }, false);
};

exports.menuBurge = menuBurge;
},{}],"app/theproject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theproject = void 0;

var _cursor = require("./cursor");

var _scroll = require("./scroll");

var _animation = require("./animation");

var _MenuBurger = require("./MenuBurger");

var _project = require("./project");

(0, _MenuBurger.menuBurge)();
(0, _cursor.cursor)(); // console.log( srollPosition  )
// document.addEventListener('mousemove', function(event){
//   const x = event.pageX;
//   const y = event.pageY;
//   const target = document.querySelector('.projects')
//   const targetCoords = target.getBoundingClientRect()
//   const targetX = targetCoords.left + ( target.offsetWidth / 2);
//   const targetY = targetCoords.top + ( target.offsetHeight / 2);
//   const angleX = ( targetY - y ) / 105 ;
//   const angleY = ( targetX - x ) / 105 ;
//   target.style.transform = "rotateX("+ angleX +"deg) rotateY("+ angleY +"deg)"
// })

var Theproject = function Theproject(numberProject) {
  var main = document.querySelector('main');
  var name = document.querySelector('.name__and__profession');
  name.innerHTML = '';
  TweenLite.to(".circlesWhite", 5, {
    css: {
      animation: 'rotationCircle initial initial',
      zIndex: '-100'
    },
    ease: Power2.easeOut
  }); //////////

  TweenLite.to("#Ellipse_14 circle", 3, {
    css: {
      strokeDasharray: '10px',
      transitionDuration: '100ms'
    },
    ease: Power2.easeOut
  });
  TweenLite.to("#Ellipse_13", 3, {
    css: {
      strokeDasharray: '3259px',
      strokeDashoffset: '3259px',
      animation: 'write 3s forwards'
    },
    ease: Power2.easeOut
  });
  TweenLite.to("#Ellipse_12", 3, {
    css: {
      strokeDasharray: '1991px',
      strokeDashoffset: '1991px',
      animation: 'write 3s forwards'
    },
    ease: Power2.easeOut
  });
  TweenLite.to(".circlesWhite", 3, {
    css: {
      strokeDasharray: '1301px',
      strokeDashoffset: '1301px',
      animation: 'write 3s forwards'
    },
    ease: Power2.easeOut
  });
  TweenLite.to(".circle", 3, {
    css: {
      top: "-350px",
      width: "40vw",
      height: "40vw",
      position: "sticky",
      marginLeft: "auto",
      marginRight: "auto",
      left: "0",
      right: "0",
      animation: "circleGoCenter 0s",
      marginBottom: '-20vh'
    },
    ease: Power2.easeOut
  });
  setTimeout(function () {
    document.querySelector('body').id = "page__project";
    main.innerHTML = '';
  }, 3000);
  setTimeout(function () {
    var view = viewPoject(numberProject);
    main.append(view.project);
  }, 3500);
};

exports.Theproject = Theproject;

function viewPoject(numberProject) {
  var view = {
    project: document.createElement('div'),
    titlOfProject: document.createElement('div'),
    description: document.createElement('section'),
    descriptionText: document.createElement('section'),
    descriptionSkills: document.createElement('div'),
    ul: document.createElement('ul'),
    button: document.createElement('section'),
    illustrationOfProject: document.createElement('div'),
    render: function render() {
      var _this = this;

      this.titlOfProject.innerHTML = "<h1 class=\"".concat(_project.projects[numberProject].modifier, "\">").concat(_project.projects[numberProject].title, "</h1><h2 class=\"type__of__projet\" >").concat(_project.projects[numberProject].subTitle, "</h2>");
      this.descriptionText.innerHTML = "<p>".concat(_project.projects[numberProject].description, "</p>");

      _project.projects[numberProject].skills.forEach(function (element) {
        _this.ul.innerHTML += "<li>".concat(element, "</li>");
      });

      this.button.innerHTML = "<a><p>".concat(_project.projects[numberProject].button, "</p></a>");
      this.descriptionSkills.append(view.ul);
      this.descriptionText.append(view.descriptionSkills);
      this.description.append(view.descriptionText);
      this.titlOfProject.append(view.description);
      this.project.append(view.titlOfProject);
    }
  };
  view.project.className = "project";
  view.titlOfProject.className = "title__of__project";
  view.descriptionText.className = "description__text";
  view.description.className = "description";
  view.descriptionSkills.className = "description__skills";
  view.render();
  return view;
}
},{"./cursor":"app/cursor.js","./scroll":"app/scroll.js","./animation":"app/animation.js","./MenuBurger":"app/MenuBurger.js","./project":"app/project.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52936" + '/');

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
},{}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel/src/builtins/bundle-loader.js");b.register("html",require("../node_modules/parcel/src/builtins/loaders/browser/html-loader.js"));b.load([["So__comptoir.html","pages/So__comptoir.html"]]).then(function(){require("app/theproject.js");});
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/theproject.adebc047.js.map