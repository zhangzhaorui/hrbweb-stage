/******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var activation = __webpack_require__(2);
	new Vue({
					el: '#bodycon',
					data: {
									show: false
					},
					props: ['loginname', 'sid'],
					components: {
									app: activation
					},
					created: function created() {
									var show = this.show;
									$.ajax({
													url: "/api/users/" + this.loginname + "/active",
													type: "PUT",
													cache: false,
													async: false,
													dataType: 'json',
													contentType: "application/json",
													data: (0, _stringify2.default)({ "sid": this.sid }),
													success: function success(json) {
																	show = true;
													},
													error: function error(json) {
																	if ($.parseJSON(json.responseText).code == 8012) {
																					show = false;
																	}
													}
									});
									this.show = show;
					}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(3)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] components/other/activation.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(8)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/wd/git/datahub_web_news/components/other/activation.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./activation.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./activation.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".created {\n  margin-top: 40px;\n  border-top: 5px solid #c8c8c8;\n  border-bottom: 1px solid #395289;\n  border-left: 1px solid #395289;\n  border-right: 1px solid #395289;\n  width: 740px;\n  height: 310px; }\n\n#successed {\n  float: left;\n  margin-top: 40px;\n  margin-left: 50px;\n  font-size: 27px;\n  color: #333333; }\n\n#info {\n  float: left; }\n\n#info p {\n  margin-left: -35px;\n  margin-top: 70px;\n  margin-bottom: 70px;\n  font: 16px;\n  text-align: center; }\n\n#login {\n  float: left;\n  margin-left: 245px;\n  margin-bottom: 56px;\n  background-image: -webkit-linear-gradient(top, #337ab7 0%, #265a88 100%);\n  background-image: linear-gradient(to bottom, #337ab7 0%, #265a88 100%);\n  font: 18px bold;\n  color: #ffffff;\n  height: 40px;\n  width: 255px; }\n\n.m-btnlogin {\n  background-color: #29abe2;\n  color: #fff;\n  font-size: 18px;\n  height: 40px; }\n\n.m-btnlogin:hover {\n  background-color: #1998ce; }\n\n#signs span {\n  display: block;\n  width: 100%; }\n\n#signs:hover {\n  color: #fff; }\n", ""]);

	// exports


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	// <style lang="sass">
	// 	.created{
	// 		margin-top: 40px;
	// 		border-top:5px solid #c8c8c8;
	// 		border-bottom: 1px solid #395289;
	// 		border-left: 1px solid #395289;
	// 		border-right: 1px solid #395289;
	// 		width:740px;
	// 		height:310px;
	// 	}
	// 	#successed{
	// 		float: left;
	// 		margin-top: 40px;
	// 		margin-left: 50px;
	// 		font-size:27px;
	// 		color: #333333;
	// 	}
	// 	#info {
	// 		float:left;
	// 	}
	// 	#info p{
	// 		margin-left: -35px;
	// 		margin-top: 70px;
	// 		margin-bottom: 70px;
	// 		font:16px;
	// 		text-align: center;
	// 	}
	// 	#login{
	// 		float: left;
	// 		margin-left: 245px;
	// 		margin-bottom:56px;
	// 		background-image: linear-gradient(to bottom, #337ab7 0%, #265a88 100%);
	// 		font:18px bold;
	// 		color:#ffffff;
	// 		height:40px;
	// 		width:255px;
	// 	}
	// 	.m-btnlogin {
	// 	    background-color: #29abe2;
	// 	    color: #fff;
	// 	    font-size: 18px;
	// 	    height: 40px;
	// 	}
	// 	.m-btnlogin:hover{
	// 		background-color:#1998ce;
	// 	}
	//
	// 	#signs span{
	// 		display:block;
	// 		width:100%;
	// 	}
	// 	#signs:hover{
	// 		color:#fff;
	// 	}
	//
	//
	// </style>
	//
	// <template>
	//     <!--<div class="container">
	//         <h2 class="red">{{msg}}</h2>
	//         ---{{show}}
	//     </div>-->
	//
	//     <div class="container" style="margin-top:50px; margin-bottom:100px; width:740px;" id="succnew" v-if="show">
	// 		<div>
	// 			<div ID="created" class="created">
	// 				<div ID="successed">
	// 					<p>注册DataHub账号</p>
	// 				</div>
	// 				<div ID="info" style="margin-top:70px">
	// 					<p style="font:16px;">恭喜您，账号<a></a>已注册成功，开始寻找海量数据吧！</p>
	// 				</div>
	// 				<div class="btn m-btnlogin" id="signs" style="width: 300px;float:left;margin-left:230px;">			
	// 					<model m-text="马上登陆" m-title="登录" m-href="login" m-width="300"></model>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	//
	// 	<div class="container" style="margin-top:50px; margin-bottom:100px; width:740px;" v-else>
	// 		<div class="created" id="created" v-if="shown">
	// 			<div id="successed">
	// 				<p>注册DataHub账号</p>
	// 			</div>
	// 			<div style="margin-top:70px" id="info">
	// 					<p style="font:16px;">您的激活链接已超过24小时有效期，无法激活。</p>
	// 			</div>
	// 			<div class="container" style="width: 210px;">
	// 				<div @click="repost" class="btn m-btnlogin" id="signs" style="width: 300px;float:left;margin-left:-55px;">			
	// 					重新发送激活邮件
	// 				</div>
	// 				<!--
	// 				<button class="btn btn-primary btn-lg" ID="resend" role="button" HREF="javaScript:void(0);">
	// 				重新发送激活邮件
	// 				</button>
	// 				-->
	// 			</div>
	// 		</div>	
	// 		<div class="created" id="created" v-else>
	// 			<div style="float:left;width:100%;margin-left: 140px;margin-top: 150px;">
	// 					<p style="font:16px;">邮件已发送！请点击邮箱(<a href={{email}}>{{email}}</a>)中的链接完成账号激活！</p>
	// 			</div>
	// 		</div>
	// 	</div>
	//
	//
	// </template>
	//
	// <script>
	exports.default = {
					data: function data() {
									return {
													shown: true
									};
					},

					props: ['loginname', 'show', 'sid'],
					computed: {
									email: function email() {
													var loginname = this.loginname;
													var newloginname = loginname.substring(loginname.indexOf("@"), loginname.length);
													return "http://mail" + newloginname;
									}
					},
					methods: {
									repost: function repost() {
													var shown = this.shown;
													$.ajax({
																	url: "/api/users/" + this.loginname + "/resend/active",
																	type: "PUT",
																	cache: false,
																	async: false,
																	dataType: 'json',
																	contentType: "application/json",
																	success: function success(json) {
																					shown = false;
																	}
													});
													this.shown = shown;
									}
					}
	};
	// </script>

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "\n    <!--<div class=\"container\">\n        <h2 class=\"red\">{{msg}}</h2>\n        ---{{show}}\n    </div>-->\n    \n    <div class=\"container\" style=\"margin-top:50px; margin-bottom:100px; width:740px;\" id=\"succnew\" v-if=\"show\">\n\t\t<div>\n\t\t\t<div ID=\"created\" class=\"created\">\n\t\t\t\t<div ID=\"successed\">\n\t\t\t\t\t<p>注册DataHub账号</p>\n\t\t\t\t</div>\n\t\t\t\t<div ID=\"info\" style=\"margin-top:70px\">\n\t\t\t\t\t<p style=\"font:16px;\">恭喜您，账号<a></a>已注册成功，开始寻找海量数据吧！</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"btn m-btnlogin\" id=\"signs\" style=\"width: 300px;float:left;margin-left:230px;\">\t\t\t\n\t\t\t\t\t<model m-text=\"马上登陆\" m-title=\"登录\" m-href=\"login\" m-width=\"300\"></model>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"container\" style=\"margin-top:50px; margin-bottom:100px; width:740px;\" v-else>\n\t\t<div class=\"created\" id=\"created\" v-if=\"shown\">\n\t\t\t<div id=\"successed\">\n\t\t\t\t<p>注册DataHub账号</p>\n\t\t\t</div>\n\t\t\t<div style=\"margin-top:70px\" id=\"info\">\n\t\t\t\t\t<p style=\"font:16px;\">您的激活链接已超过24小时有效期，无法激活。</p>\n\t\t\t</div>\n\t\t\t<div class=\"container\" style=\"width: 210px;\">\n\t\t\t\t<div @click=\"repost\" class=\"btn m-btnlogin\" id=\"signs\" style=\"width: 300px;float:left;margin-left:-55px;\">\t\t\t\n\t\t\t\t\t重新发送激活邮件\n\t\t\t\t</div>\n\t\t\t\t<!--\n\t\t\t\t<button class=\"btn btn-primary btn-lg\" ID=\"resend\" role=\"button\" HREF=\"javaScript:void(0);\">\n\t\t\t\t重新发送激活邮件\n\t\t\t\t</button>\n\t\t\t\t-->\n\t\t\t</div>\n\t\t</div>\t\n\t\t<div class=\"created\" id=\"created\" v-else>\n\t\t\t<div style=\"float:left;width:100%;margin-left: 140px;margin-top: 150px;\">\n\t\t\t\t\t<p style=\"font:16px;\">邮件已发送！请点击邮箱(<a href={{email}}>{{email}}</a>)中的链接完成账号激活！</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n    \n    \n";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(11)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }
/******/ ]);