var ac_main =
webpackJsonpac__name_([3],{

/***/ "./node_modules/adal-ts/dist/index.js":
/***/ function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["adal-ts"] = factory();
	else
		root["adal-ts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var authentication_context_1 = __webpack_require__(1);
	var local_storage_1 = __webpack_require__(3);
	var navigator_1 = __webpack_require__(4);
	var aad_url_builder_1 = __webpack_require__(5);
	var guid_generator_1 = __webpack_require__(6);
	var user_decoder_1 = __webpack_require__(7);
	var aad_redirect_processor_1 = __webpack_require__(8);
	var query_string_deserializer_1 = __webpack_require__(10);
	var aad_logout_url_builder_1 = __webpack_require__(11);
	var Authentication = (function () {
	    function Authentication() {
	    }
	    Authentication.getContext = function (configuration) {
	        console.log('getContext...');
	        var context = new authentication_context_1.AuthenticationContext(configuration, new local_storage_1.LocalStorage(), new navigator_1.Navigator(), new guid_generator_1.GuidGenerator(), new aad_url_builder_1.AadUrlBuilder(new guid_generator_1.GuidGenerator()), new user_decoder_1.UserDecoder(), new aad_logout_url_builder_1.AadLogoutUrlBuilder());
	        //TODO this.enableNativeLogging();
	        return context;
	    };
	    Authentication.getAadRedirectProcessor = function () {
	        var p = new aad_redirect_processor_1.AadRedirectProcessor(new query_string_deserializer_1.QueryStringDeserializer(), new user_decoder_1.UserDecoder(), new local_storage_1.LocalStorage(), window);
	        return p;
	    };
	    return Authentication;
	}());
	exports.Authentication = Authentication;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(2);
	var AuthenticationContext = (function () {
	    function AuthenticationContext(config, storage, navigator, guidGenerator, aadUrlBuilder, userDecoder, logoutUrlBuilder) {
	        this.CONSTANTS = constants_1.Constants;
	        this.REQUEST_TYPES = constants_1.RequestTypes;
	        this.storage = storage;
	        this.navigator = navigator;
	        this.config = config;
	        this.guidGenerator = guidGenerator;
	        this.aadUrlBuilder = aadUrlBuilder;
	        this.userDecoder = userDecoder;
	        this.logoutUrlBuilder = logoutUrlBuilder;
	    }
	    AuthenticationContext.prototype.login = function () {
	        if (this.loginInProgress) {
	            this.info("Login in progress");
	            return;
	        }
	        var urlConfig = this.cloneConfig(this.config);
	        urlConfig.nonce = this.guidGenerator.generate();
	        urlConfig.state = this.guidGenerator.generate();
	        this.verbose('Expected state: ' + urlConfig.state + ' startPage:' + window.location);
	        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, window.location);
	        this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, urlConfig.state);
	        this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, urlConfig.nonce);
	        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
	        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR, '');
	        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
	        var url = this.aadUrlBuilder.with(urlConfig).build();
	        this.navigator.navigate(url);
	        this.loginInProgress = true;
	    };
	    AuthenticationContext.prototype.getUser = function () {
	        var idtoken = this.storage.getItem(constants_1.Constants.STORAGE.IDTOKEN);
	        if (idtoken === '')
	            return null;
	        var user = this.userDecoder.decode(idtoken);
	        return user;
	    };
	    AuthenticationContext.prototype.logout = function () {
	        var idtoken = this.storage.getItem(constants_1.Constants.STORAGE.IDTOKEN);
	        if (idtoken === '')
	            return null;
	        this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, '');
	        this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');
	        this.storage.setItem(this.CONSTANTS.STORAGE.IDTOKEN, '');
	        var url = this.logoutUrlBuilder.with(this.config.tenant, this.config.postLogoutRedirectUrl).build();
	        this.navigator.navigate(url);
	    };
	    AuthenticationContext.prototype.verbose = function (message) {
	    };
	    AuthenticationContext.prototype.info = function (message) {
	    };
	    AuthenticationContext.prototype.createOptions = function () {
	        return {
	            nonce: this.idTokenNonce,
	            tenant: this.config.tenant,
	            clientId: this.config.clientId
	        };
	    };
	    AuthenticationContext.prototype.cloneConfig = function (obj) {
	        if (null === obj || 'object' !== typeof obj) {
	            return obj;
	        }
	        var copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) {
	                copy[attr] = obj[attr];
	            }
	        }
	        return copy;
	    };
	    ;
	    return AuthenticationContext;
	}());
	exports.AuthenticationContext = AuthenticationContext;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	exports.Constants = {
	    ACCESS_TOKEN: 'access_token',
	    EXPIRES_IN: 'expires_in',
	    ID_TOKEN: 'id_token',
	    ERROR_DESCRIPTION: 'error_description',
	    SESSION_STATE: 'session_state',
	    STORAGE: {
	        TOKEN_KEYS: 'adal.token.keys',
	        ACCESS_TOKEN_KEY: 'adal.access.token.key',
	        EXPIRATION_KEY: 'adal.expiration.key',
	        STATE_LOGIN: 'adal.state.login',
	        STATE_RENEW: 'adal.state.renew',
	        NONCE_IDTOKEN: 'adal.nonce.idtoken',
	        SESSION_STATE: 'adal.session.state',
	        USERNAME: 'adal.username',
	        IDTOKEN: 'adal.idtoken',
	        ERROR: 'adal.error',
	        ERROR_DESCRIPTION: 'adal.error.description',
	        LOGIN_REQUEST: 'adal.login.request',
	        LOGIN_ERROR: 'adal.login.error',
	        RENEW_STATUS: 'adal.token.renew.status'
	    },
	    RESOURCE_DELIMETER: '|',
	    LOADFRAME_TIMEOUT: '6000',
	    TOKEN_RENEW_STATUS_CANCELED: 'Canceled',
	    TOKEN_RENEW_STATUS_COMPLETED: 'Completed',
	    TOKEN_RENEW_STATUS_IN_PROGRESS: 'In Progress',
	    LOGGING_LEVEL: {
	        ERROR: 0,
	        WARN: 1,
	        INFO: 2,
	        VERBOSE: 3
	    },
	    LEVEL_STRING_MAP: {
	        0: 'ERROR:',
	        1: 'WARNING:',
	        2: 'INFO:',
	        3: 'VERBOSE:'
	    }
	};
	exports.RequestTypes = {
	    LOGIN: 'LOGIN',
	    RENEW_TOKEN: 'RENEW_TOKEN',
	    UNKNOWN: 'UNKNOWN'
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var LocalStorage = (function () {
	    function LocalStorage() {
	    }
	    LocalStorage.prototype.setItem = function (key, value) {
	        localStorage.setItem(key, value);
	    };
	    LocalStorage.prototype.getItem = function (key) {
	        return localStorage.getItem(key);
	    };
	    return LocalStorage;
	}());
	exports.LocalStorage = LocalStorage;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Navigator = (function () {
	    function Navigator() {
	    }
	    Navigator.prototype.navigate = function (url) {
	        window.location.replace(url);
	    };
	    return Navigator;
	}());
	exports.Navigator = Navigator;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var AadUrlBuilder = (function () {
	    function AadUrlBuilder(guidGenerator) {
	        this.addLibMetadata = function () {
	            // x-client-SKU
	            // x-client-Ver
	            return '&x-client-SKU=Js&x-client-Ver=' + this.libVersion;
	        };
	        this.guidGenerator = guidGenerator;
	        this.state = this.guidGenerator.generate();
	        this.clientRequestId = this.guidGenerator.generate();
	        this.responseType = 'id_token';
	        this.libVersion = '1.0.0';
	        this.redirectUri = window.location.href;
	    }
	    AadUrlBuilder.prototype.with = function (options) {
	        this.nonce = options.nonce;
	        this.tenant = options.tenant;
	        this.clientId = options.clientId;
	        this.responseType = options.responseType || this.responseType;
	        this.redirectUri = options.redirectUri || this.redirectUri;
	        this.state = options.state;
	        this.slice = options.slice || this.slice;
	        this.clientRequestId = options.clientRequestId || this.clientRequestId;
	        this.libVersion = options.libVersion || this.libVersion;
	        this.extraQueryParameter = options.extraQueryParameter || this.extraQueryParameter;
	        return this;
	    };
	    AadUrlBuilder.prototype.build = function () {
	        var urlNavigate = AadUrlBuilder.MicrosoftLoginUrl + this.tenant + '/oauth2/authorize';
	        urlNavigate = urlNavigate + this.serialize() + this.addLibMetadata();
	        urlNavigate = urlNavigate + '&nonce=' + encodeURIComponent(this.nonce);
	        return urlNavigate;
	    };
	    AadUrlBuilder.prototype.serialize = function () {
	        var str = [];
	        str.push('?response_type=' + this.responseType);
	        str.push('client_id=' + encodeURIComponent(this.clientId));
	        if (this.resource) {
	            str.push('resource=' + encodeURIComponent(this.resource));
	        }
	        str.push('redirect_uri=' + encodeURIComponent(this.redirectUri));
	        str.push('state=' + encodeURIComponent(this.state));
	        if (this.slice) {
	            str.push('slice=' + encodeURIComponent(this.slice));
	        }
	        if (this.extraQueryParameter) {
	            str.push(this.extraQueryParameter);
	        }
	        //var correlationId = this.clientRequestId ? obj.correlationId : new GuidGenerator().generate();
	        str.push('client-request-id=' + encodeURIComponent(this.clientRequestId));
	        return str.join('&');
	    };
	    ;
	    AadUrlBuilder.MicrosoftLoginUrl = 'https://login.microsoftonline.com/';
	    return AadUrlBuilder;
	}());
	exports.AadUrlBuilder = AadUrlBuilder;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var GuidGenerator = (function () {
	    function GuidGenerator() {
	    }
	    GuidGenerator.prototype.generate = function () {
	        var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	        var hex = '0123456789abcdef';
	        var r = 0;
	        var guidResponse = "";
	        for (var i = 0; i < 36; i++) {
	            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
	                // each x and y needs to be random
	                r = Math.random() * 16 | 0;
	            }
	            if (guidHolder[i] === 'x') {
	                guidResponse += hex[r];
	            }
	            else if (guidHolder[i] === 'y') {
	                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
	                r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
	                r |= 0x8; // set pos 3 to 1 as 1???
	                guidResponse += hex[r];
	            }
	            else {
	                guidResponse += guidHolder[i];
	            }
	        }
	        return guidResponse;
	    };
	    GuidGenerator.prototype.decimalToHex = function (number) {
	        var hex = number.toString(16);
	        while (hex.length < 2) {
	            hex = '0' + hex;
	        }
	        return hex;
	    };
	    return GuidGenerator;
	}());
	exports.GuidGenerator = GuidGenerator;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var UserDecoder = (function () {
	    function UserDecoder() {
	        this.decodeJwt = function (jwtToken) {
	            if (this.isEmpty(jwtToken)) {
	                return null;
	            }
	            ;
	            var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
	            var matches = idTokenPartsRegex.exec(jwtToken);
	            if (!matches || matches.length < 4) {
	                this.warn('The returned id_token is not parseable.');
	                return null;
	            }
	            var crackedToken = {
	                header: matches[1],
	                JWSPayload: matches[2],
	                JWSSig: matches[3]
	            };
	            return crackedToken;
	        };
	        this.base64DecodeStringUrlSafe = function (base64IdToken) {
	            // html5 should support atob function for decoding
	            base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
	            if (window.atob) {
	                return decodeURIComponent(escape(window.atob(base64IdToken))); // jshint ignore:line
	            }
	            else {
	                return decodeURIComponent(escape(this.decodeBase64(base64IdToken)));
	            }
	        };
	    }
	    UserDecoder.prototype.decode = function (encoded) {
	        var jwtDecoded = this.decodeJwt(encoded);
	        if (!jwtDecoded) {
	            throw Error('Failed to decode value. Value has invalid format.');
	        }
	        var decodedPayLoad = this.safeDecodeBase64(jwtDecoded.JWSPayload);
	        var user = JSON.parse(decodedPayLoad);
	        //if (!user || !user.hasOwnProperty('aud')) throw new Error('');
	        return user;
	    };
	    UserDecoder.prototype.safeDecodeBase64 = function (value) {
	        var base64Decoded = this.base64DecodeStringUrlSafe(value);
	        if (!base64Decoded) {
	            //this.info('The returned id_token could not be base64 url safe decoded.');
	            throw Error('Failed to base64 decode value. Value has invalid format.');
	        }
	        return base64Decoded;
	    };
	    UserDecoder.prototype.decodeBase64 = function (base64IdToken) {
	        var codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	        base64IdToken = String(base64IdToken).replace(/=+$/, '');
	        var length = base64IdToken.length;
	        if (length % 4 === 1) {
	            throw new Error('The token to be decoded is not correctly encoded.');
	        }
	        var h1, h2, h3, h4, bits, c1, c2, c3, decoded = '';
	        for (var i = 0; i < length; i += 4) {
	            //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
	            // then 6 bits per base64 encoded character
	            h1 = codes.indexOf(base64IdToken.charAt(i));
	            h2 = codes.indexOf(base64IdToken.charAt(i + 1));
	            h3 = codes.indexOf(base64IdToken.charAt(i + 2));
	            h4 = codes.indexOf(base64IdToken.charAt(i + 3));
	            // For padding, if last two are '='
	            if (i + 2 === length - 1) {
	                bits = h1 << 18 | h2 << 12 | h3 << 6;
	                c1 = bits >> 16 & 255;
	                c2 = bits >> 8 & 255;
	                decoded += String.fromCharCode(c1, c2);
	                break;
	            }
	            else if (i + 1 === length - 1) {
	                bits = h1 << 18 | h2 << 12;
	                c1 = bits >> 16 & 255;
	                decoded += String.fromCharCode(c1);
	                break;
	            }
	            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
	            // then convert to 3 byte chars
	            c1 = bits >> 16 & 255;
	            c2 = bits >> 8 & 255;
	            c3 = bits & 255;
	            decoded += String.fromCharCode(c1, c2, c3);
	        }
	        return decoded;
	    };
	    ;
	    UserDecoder.prototype.isEmpty = function (str) {
	        return (typeof str === 'undefined' || !str || 0 === str.length);
	    };
	    ;
	    return UserDecoder;
	}());
	exports.UserDecoder = UserDecoder;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(2);
	var aad_redirect_url_1 = __webpack_require__(9);
	var AadRedirectProcessor = (function () {
	    function AadRedirectProcessor(queryStringDeserializer, userDecoder, storage, window) {
	        this.queryStringDeserializer = queryStringDeserializer;
	        this.userDecoder = userDecoder;
	        this.storage = storage;
	        this.window = window;
	    }
	    AadRedirectProcessor.prototype.process = function () {
	        var deserializedHash = this.queryStringDeserializer.deserialize(this.window.location.hash);
	        var aadRedirect = new aad_redirect_url_1.AadRedirectUrl(deserializedHash);
	        if (aadRedirect.isAadRedirect()) {
	            var userProfile = this.userDecoder.decode(aadRedirect.idToken);
	            this.storage.setItem(constants_1.Constants.STORAGE.IDTOKEN, aadRedirect.idToken);
	            this.window.location.assign(this.storage.getItem(constants_1.Constants.STORAGE.LOGIN_REQUEST));
	        }
	        return aadRedirect.isAadRedirect();
	    };
	    return AadRedirectProcessor;
	}());
	exports.AadRedirectProcessor = AadRedirectProcessor;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(2);
	var AadRedirectUrl = (function () {
	    function AadRedirectUrl(object) {
	        this.object = object;
	    }
	    Object.defineProperty(AadRedirectUrl.prototype, "idToken", {
	        get: function () {
	            return this.object[constants_1.Constants.ID_TOKEN];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AadRedirectUrl.prototype, "expiresIn", {
	        get: function () {
	            return this.object[constants_1.Constants.EXPIRES_IN];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AadRedirectUrl.prototype, "accesToken", {
	        get: function () {
	            return this.object[constants_1.Constants.ACCESS_TOKEN];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AadRedirectUrl.prototype, "sessionState", {
	        get: function () {
	            return this.object[constants_1.Constants.SESSION_STATE];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AadRedirectUrl.prototype.isAadRedirect = function () {
	        return (this.object.hasOwnProperty(constants_1.Constants.ERROR_DESCRIPTION) ||
	            this.object.hasOwnProperty(constants_1.Constants.ACCESS_TOKEN) ||
	            this.object.hasOwnProperty(constants_1.Constants.ID_TOKEN));
	    };
	    return AadRedirectUrl;
	}());
	exports.AadRedirectUrl = AadRedirectUrl;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(2);
	var QueryStringDeserializer = (function () {
	    function QueryStringDeserializer() {
	        this.plRegex = /\+/g;
	    }
	    QueryStringDeserializer.prototype.deserialize = function (queryString) {
	        queryString = this.trimHashSign(queryString);
	        var match;
	        // Regex for replacing addition symbol with a space
	        var searchRegex = /([^&=]+)=([^&]*)/g;
	        var obj = {};
	        match = searchRegex.exec(queryString);
	        while (match) {
	            obj[this.decode(match[1])] = this.decode(match[2]);
	            match = searchRegex.exec(queryString);
	        }
	        return obj;
	    };
	    QueryStringDeserializer.prototype.decode = function (s) {
	        return decodeURIComponent(s.replace(this.plRegex, ' '));
	    };
	    QueryStringDeserializer.prototype.trimHashSign = function (hash) {
	        if (hash.indexOf('#/') > -1) {
	            hash = hash.substring(hash.indexOf('#/') + 2);
	        }
	        else if (hash.indexOf('#') > -1) {
	            hash = hash.substring(1);
	        }
	        return hash;
	    };
	    return QueryStringDeserializer;
	}());
	exports.QueryStringDeserializer = QueryStringDeserializer;
	function hasAadProps(deserializedHash) {
	    return (deserializedHash.hasOwnProperty(constants_1.Constants.ERROR_DESCRIPTION) ||
	        deserializedHash.hasOwnProperty(constants_1.Constants.ACCESS_TOKEN) ||
	        deserializedHash.hasOwnProperty(constants_1.Constants.ID_TOKEN));
	}
	exports.hasAadProps = hasAadProps;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var AadLogoutUrlBuilder = (function () {
	    function AadLogoutUrlBuilder() {
	        this.postLogoutRedirectUri = window.location.href;
	    }
	    AadLogoutUrlBuilder.prototype.with = function (tenant, postLogoutRedirectUri) {
	        this.tenant = tenant;
	        this.postLogoutRedirectUri = postLogoutRedirectUri || this.postLogoutRedirectUri;
	        return this;
	    };
	    AadLogoutUrlBuilder.prototype.build = function () {
	        var urlNavigate = AadLogoutUrlBuilder.MicrosoftLoginUrl + this.tenant + '/oauth2/logout?';
	        urlNavigate = urlNavigate + 'post_logout_redirect_uri=' + encodeURIComponent(this.postLogoutRedirectUri);
	        return urlNavigate;
	    };
	    AadLogoutUrlBuilder.MicrosoftLoginUrl = 'https://login.microsoftonline.com/';
	    return AadLogoutUrlBuilder;
	}());
	exports.AadLogoutUrlBuilder = AadLogoutUrlBuilder;


/***/ }
/******/ ])
});
;

/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/app.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "html, body{\r\n  height: 100%;\r\n  font-family: Arial, Helvetica, sans-serif\r\n}\r\n\r\nspan.active {\r\n  background-color: gray;\r\n}\r\n", ""]);

// exports


/***/ },

/***/ "./node_modules/css-loader/index.js!./src/app/home/home.component.css":
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, "/*styles for home content only*/", ""]);

// exports


/***/ },

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ "./node_modules/rxjs/add/observable/of.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var of_1 = __webpack_require__("./node_modules/rxjs/observable/of.js");
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ },

/***/ "./src/app/about/about.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`About` component loaded asynchronously');
var AboutComponent = (function () {
    function AboutComponent(route) {
        this.route = route;
    }
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route
            .data
            .subscribe(function (data) {
            // your resolved data from route
            _this.localState = data.yourData;
        });
        console.log('hello `About` component');
        // static data that is bundled
        // var mockData = require('assets/mock-data/mock-data.json');
        // console.log('mockData', mockData);
        // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
        this.asyncDataWithWebpack();
    };
    AboutComponent.prototype.asyncDataWithWebpack = function () {
        var _this = this;
        // you can also async load mock data with 'es6-promise-loader'
        // you would do this if you don't want the mock-data bundled
        // remember that 'es6-promise-loader' is a promise
        setTimeout(function () {
            __webpack_require__.e/* System.import */(1).then(__webpack_require__.bind(null, "./src/assets/mock-data/mock-data.json"))
                .then(function (json) {
                console.log('async mockData', json);
                _this.localState = json;
            });
        });
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            styles: ["\n  "],
            template: "\n    <h1>About</h1>\n    <div>\n      For hot module reloading run\n      <pre>npm run start:hmr</pre>\n    </div>\n    <div>\n      <h3>\n        patrick@AngularClass.com\n      </h3>\n    </div>\n    <pre>this.localState = {{ localState | json }}</pre>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object])
    ], AboutComponent);
    return AboutComponent;
    var _a;
}());
exports.AboutComponent = AboutComponent;


/***/ },

/***/ "./src/app/about/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/about/about.component.ts"));


/***/ },

/***/ "./src/app/app.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/app.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular 2 decorators and services
 */
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var adal_ts_1 = __webpack_require__("./node_modules/adal-ts/dist/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(appState) {
        this.appState = appState;
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack Starter';
        this.url = 'https://twitter.com/AngularClass';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
        adal_ts_1.Authentication.getAadRedirectProcessor().process();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                __webpack_require__("./src/app/app.component.css")
            ],
            template: "\n   \n\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */


/***/ },

/***/ "./src/app/app.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = __webpack_require__("./src/app/environment.ts");
var app_routes_1 = __webpack_require__("./src/app/app.routes.ts");
// App is our top level component
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var app_resolver_1 = __webpack_require__("./src/app/app.resolver.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var home_1 = __webpack_require__("./src/app/home/index.ts");
var about_1 = __webpack_require__("./src/app/about/index.ts");
var no_content_1 = __webpack_require__("./src/app/no-content/index.ts");
var x_large_1 = __webpack_require__("./src/app/home/x-large/index.ts");
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    app_service_1.AppState
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            declarations: [
                app_component_1.AppComponent,
                about_1.AboutComponent,
                home_1.HomeComponent,
                no_content_1.NoContentComponent,
                x_large_1.XLarge
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true })
            ],
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ApplicationRef !== 'undefined' && core_1.ApplicationRef) === 'function' && _a) || Object, (typeof (_b = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _b) || Object])
    ], AppModule);
    return AppModule;
    var _a, _b;
}());
exports.AppModule = AppModule;


/***/ },

/***/ "./src/app/app.resolver.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
__webpack_require__("./node_modules/rxjs/add/observable/of.js");
var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return Observable_1.Observable.of({ res: 'I am data' });
    };
    DataResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataResolver);
    return DataResolver;
}());
exports.DataResolver = DataResolver;
// an array of services to resolve routes with data
exports.APP_RESOLVER_PROVIDERS = [
    DataResolver
];


/***/ },

/***/ "./src/app/app.routes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var home_1 = __webpack_require__("./src/app/home/index.ts");
var about_1 = __webpack_require__("./src/app/about/index.ts");
var no_content_1 = __webpack_require__("./src/app/no-content/index.ts");
exports.ROUTES = [
    { path: '', component: home_1.HomeComponent },
    { path: 'home', component: home_1.HomeComponent },
    { path: 'about', component: about_1.AboutComponent },
    {
        path: 'detail', loadChildren: function () { return __webpack_require__.e/* System.import */(0).then(__webpack_require__.bind(null, "./src/app/+detail/index.ts")).then(function (comp) {
            return comp.default;
        }); },
    },
    { path: '**', component: no_content_1.NoContentComponent },
];


/***/ },

/***/ "./src/app/app.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    AppState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppState);
    return AppState;
}());
exports.AppState = AppState;


/***/ },

/***/ "./src/app/environment.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// Angular 2
// rc2 workaround
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },

/***/ "./src/app/home/home.component.css":
/***/ function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./src/app/home/home.component.css");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ },

/***/ "./src/app/home/home.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"card-container\">\r\n\t<h1 x-large class=\"sample-content\">Adal-ts consumer</h1>\r\n\r\n\r\n\t<hr>\r\n\r\n\r\n\t<div>\r\n\t\t<h4>Adal-ts consumer</h4>\r\n\r\n\t\t<button [disabled]=\"disableLogin\" (click)=\"login();\">Login</button>\r\n\t\t<button (click)=\"getUser()\">getUser</button>\r\n\t\t<button [disabled]=\"disableLogout\"  (click)=\"logout()\">logout</button> \r\n\t\t\r\n\t\t<hr>\t\t\r\n\t\t<div>\r\n\t\t{{ user |json }}\r\n\t\t</div>\t \r\n\t</div>\r\n\r\n</div>"

/***/ },

/***/ "./src/app/home/home.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var adal_ts_1 = __webpack_require__("./node_modules/adal-ts/dist/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var title_1 = __webpack_require__("./src/app/home/title/index.ts");
var HomeComponent = (function () {
    function HomeComponent(appState, title) {
        this.appState = appState;
        this.title = title;
        this.disableLogout = false;
        this.disableLogin = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
    };
    HomeComponent.prototype.login = function () {
        console.log('login');
        var context = adal_ts_1.Authentication.getContext(this.createConfig());
        this.disableLogin = context.getUser() != null;
        if (this.disableLogin == false)
            context.login();
    };
    HomeComponent.prototype.logout = function () {
        console.log('logout');
        var context = adal_ts_1.Authentication.getContext(this.createConfig());
        var loggedInUser = context.getUser();
        this.disableLogout = loggedInUser == null;
        if (this.disableLogout == false)
            context.logout();
    };
    HomeComponent.prototype.getUser = function () {
        console.log('logout');
        var context = adal_ts_1.Authentication.getContext(this.createConfig());
        this.user = context.getUser();
    };
    HomeComponent.prototype.createConfig = function () {
        var config = {
            tenant: 'hneu70532.onmicrosoft.com',
            clientId: '61bdbb45-a004-48e3-98d9-e4f1740661c8',
            postLogoutRedirectUrl: window.location.origin + '/',
            //postLogoutRedirectUri: window.location.origin + '/',
            redirectUri: window.location.origin + '/'
        };
        return config;
    };
    HomeComponent = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'home'
            selector: 'home',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [
                title_1.Title
            ],
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [__webpack_require__("./src/app/home/home.component.css")],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: __webpack_require__("./src/app/home/home.component.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object, (typeof (_b = typeof title_1.Title !== 'undefined' && title_1.Title) === 'function' && _b) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b;
}());
exports.HomeComponent = HomeComponent;


/***/ },

/***/ "./src/app/home/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/home/home.component.ts"));


/***/ },

/***/ "./src/app/home/title/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/home/title/title.service.ts"));


/***/ },

/***/ "./src/app/home/title/title.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var Title = (function () {
    function Title(http) {
        this.http = http;
        this.value = 'Angular 2';
    }
    Title.prototype.getData = function () {
        console.log('Title#getData(): Get Data');
        // return this.http.get('/assets/data.json')
        // .map(res => res.json());
        return {
            value: 'AngularClass'
        };
    };
    Title = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], Title);
    return Title;
    var _a;
}());
exports.Title = Title;


/***/ },

/***/ "./src/app/home/x-large/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/home/x-large/x-large.directive.ts"));


/***/ },

/***/ "./src/app/home/x-large/x-large.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
var XLarge = (function () {
    function XLarge(element, renderer) {
        // simple DOM manipulation to set font size to x-large
        // `nativeElement` is the direct reference to the DOM element
        // element.nativeElement.style.fontSize = 'x-large';
        // for server/webworker support use the renderer
        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    }
    XLarge = __decorate([
        core_1.Directive({
            selector: '[x-large]' // using [ ] means selecting attributes
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
    ], XLarge);
    return XLarge;
    var _a, _b;
}());
exports.XLarge = XLarge;


/***/ },

/***/ "./src/app/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// App
__export(__webpack_require__("./src/app/app.module.ts"));


/***/ },

/***/ "./src/app/no-content/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/no-content/no-content.component.ts"));


/***/ },

/***/ "./src/app/no-content/no-content.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var NoContentComponent = (function () {
    function NoContentComponent() {
    }
    NoContentComponent = __decorate([
        core_1.Component({
            selector: 'no-content',
            template: "\n    <div>\n      <h1>404: page missing</h1>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NoContentComponent);
    return NoContentComponent;
}());
exports.NoContentComponent = NoContentComponent;


/***/ },

/***/ "./src/main.browser.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/index.js");
var environment_1 = __webpack_require__("./src/app/environment.ts");
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = __webpack_require__("./src/app/index.ts");
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// needed for hmr
// in prod this is replace for document ready
hmr_1.bootloader(main);


/***/ }

},["./src/main.browser.ts"]);
//# sourceMappingURL=main.map