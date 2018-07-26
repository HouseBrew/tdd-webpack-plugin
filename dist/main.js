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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("cypress");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("directory-exists");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("relative");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs2":"cypress"}
var external_commonjs2_cypress_ = __webpack_require__(0);
var external_commonjs2_cypress_default = /*#__PURE__*/__webpack_require__.n(external_commonjs2_cypress_);

// EXTERNAL MODULE: external {"commonjs2":"directory-exists"}
var external_commonjs2_directory_exists_ = __webpack_require__(1);
var external_commonjs2_directory_exists_default = /*#__PURE__*/__webpack_require__.n(external_commonjs2_directory_exists_);

// EXTERNAL MODULE: external {"commonjs2":"relative"}
var external_commonjs2_relative_ = __webpack_require__(2);
var external_commonjs2_relative_default = /*#__PURE__*/__webpack_require__.n(external_commonjs2_relative_);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(3);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// CONCATENATED MODULE: ./src/utils.ts

function* getParentDirectories(file, until = '/') {
    let cd = file;
    while (cd.includes(until) && cd !== '/' && cd !== until) {
        cd = external_path_default.a.dirname(cd);
        yield cd;
    }
}


// CONCATENATED MODULE: ./src/TestDrivenDevPlugin.ts



class TestDrivenDevPlugin_TestDrivenDevPlugin {
    constructor(options) {
        this.options = {
            base: '/',
            testFolder: 'test',
            matchSpecs: '*.spec.js',
            baseUrl: 'http://localhost:8080'
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
            const changedFiles = this.getChangedFiles(compilation.fileTimestamps);
            const specs = this.getSpecs(changedFiles);
            this.test(specs);
            this.prevTimestamps = compilation.fileTimestamps;
        });
    }
    *getChangedFiles(map) {
        for (const [key, value] of map.entries()) {
            if ((this.prevTimestamps.get(key) || this.startTime) < value) {
                yield key;
            }
        }
    }
    *getSpecs(changedFiles) {
        for (const path of changedFiles) {
            for (const di of getParentDirectories(path, this.options.base)) {
                const testFolderPath = `${di}/${this.options.testFolder}`;
                const testFolderExist = external_commonjs2_directory_exists_default.a.sync(testFolderPath);
                if (testFolderExist) {
                    const match = `${testFolderPath}/${this.options.matchSpecs}`;
                    yield external_commonjs2_relative_default()(this.options.base, match);
                    break; // only test the nearest parent's test folder
                }
            }
        }
    }
}
/* harmony default export */ var src_TestDrivenDevPlugin = (TestDrivenDevPlugin_TestDrivenDevPlugin);

// CONCATENATED MODULE: ./src/CypressTDDPlugin.ts
// @ts-ignore


class CypressTDDPlugin_CypressTDDPlugin extends src_TestDrivenDevPlugin {
    test(specs) {
        // console.log(this.options)
        let specString = [...specs].join(',');
        if (!specString) {
            specString = `**/${this.options.matchSpecs}`;
        }
        external_commonjs2_cypress_default.a.run({
            reporter: 'min',
            config: {
                baseUrl: this.options.baseUrl,
                chromeWebSecurity: false,
                video: false,
                modifyObstructiveCode: false
            },
            spec: specString
        });
    }
}
/* harmony default export */ var src_CypressTDDPlugin = (CypressTDDPlugin_CypressTDDPlugin);

// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "TestDrivenDevPlugin", function() { return src_TestDrivenDevPlugin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CypressTDDPlugin", function() { return src_CypressTDDPlugin; });





/***/ })
/******/ ]);