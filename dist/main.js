module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(2);
var resolvePath = __webpack_require__(0).resolve;

module.exports = function(directory, callback) {
  if (!directory || typeof directory !== 'string') {
    throw new TypeError('directory-exists expects a non-empty string as its first argument');
  }

  if (typeof callback === 'undefined') {

    return new Promise(function(resolve, reject) {
      fs.stat(resolvePath(directory), function(err, stat) {
        if (err) {
          return resolve(false);
        }
        resolve(stat.isDirectory());
      });
    });

  } else {

    fs.stat(resolvePath(directory), function(err, stat) {
      if (err) {
        return callback(null, false);
      }
      callback(null, stat.isDirectory());
    });
    
  }

};

module.exports.sync = function(directory) {
  if (!directory || typeof directory !== 'string') {
    throw new TypeError('directory-exists expects a non-empty string as its first argument');
  }

  try {
    return fs.statSync(resolvePath(directory)).isDirectory();
  } catch (e) {
    return false;
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/directory-exists/index.js
var directory_exists = __webpack_require__(1);
var directory_exists_default = /*#__PURE__*/__webpack_require__.n(directory_exists);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(0);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// CONCATENATED MODULE: ./src/utils.ts

const getParentDirectories = (file, until = '/') => {
    if (!file) {
        return [];
    }
    const result = [];
    let cd = file;
    console.log(cd);
    while (cd.includes(until) && cd !== '/' && cd !== until) {
        cd = external_path_default.a.dirname(cd);
        result.push(cd);
    }
    return result;
};


// CONCATENATED MODULE: ./src/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CypressWebpackPlugin", function() { return src_CypressWebpackPlugin; });


class src_CypressWebpackPlugin {
    constructor(options) {
        this.options = {
            base: '/',
            testFolder: 'test'
        };
        if (typeof options !== 'undefined') {
            this.options = options;
        }
        this.startTime = Date.now();
        this.prevTimestamps = new Map();
    }
    // Define the `apply` method
    apply(compiler) {
        compiler.hooks.emit.tap('CypressWebpackPlugin', (compilation) => {
            const changedFiles = [];
            compilation.fileTimestamps.forEach((value, key) => {
                if ((this.prevTimestamps.get(key) || this.startTime) < value) {
                    changedFiles.push(key);
                }
            });
            this.prevTimestamps = compilation.fileTimestamps;
            changedFiles.forEach((path) => {
                const dis = getParentDirectories(path, this.options.base);
                dis.forEach((di) => {
                    const testFolderPath = `${di}/${this.options.testFolder}`;
                    const testFolderExist = directory_exists_default.a.sync(testFolderPath);
                    if (testFolderExist) {
                        console.log(`cypress run --chrome ${testFolderPath}`);
                    }
                });
            });
        });
    }
}



/***/ })
/******/ ])["CypressWebpackPlugin"];