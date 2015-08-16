webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @file 应用入口
	 * @author yumao <zhangyu38@baidu.com>
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    global.$ = global.jQuery = __webpack_require__(1);

	    angular.element(document).ready(function () {
	        angular.bootstrap(document, ['ncop']);
	    });

	    var app = angular.module('ncop', [
	        'ui.router',
	        'ui.bootstrap',
	        'ngSanitize'
	    ]);

	    app.config(__webpack_require__(2));

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 路由
	 * @author yumao <zhangyu38@baidu.com>
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(3);

	    config.$inject = [
	        '$locationProvider',
	        '$stateProvider',
	        '$urlRouterProvider'
	    ];

	    function config($locationProvider, $stateProvider, $urlRouterProvider) {
	        $urlRouterProvider.otherwise('/home');

	        $stateProvider
	            .state('home', {
	                url: '/home',
	                templateUrl: 'home.html',
	                controller: 'HomeController'
	            });

	        // $locationProvider.html5Mode(true);
	    }

	    return config;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 首页 入口
	 * @author yumao <zhangyu38@baidu.com>
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(4);
	    __webpack_require__(5);

	    var controller = __webpack_require__(9);
	    controller.$inject = ['$scope'];

	    return angular.module('ncop')
	        .controller('HomeController', controller);

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports) {

	var v1="<h1>{{title}}<h1> <button class=\"btn btn-info\">test</button></h1></h1>";
	window.angular.module(["ng"]).run(["$templateCache",function(c){c.put("home.html", v1)}]);
	module.exports=v1;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./home.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/less-loader/index.js!./home.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "h1 {\n  font-size: 20px;\n}\n", ""]);

	// exports


/***/ },
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 首页 controller
	 * @author yumao <zhangyu38@baidu.com>
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    function controller($scope) {
	        $scope.title = 'home';
	    }

	    return controller;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);