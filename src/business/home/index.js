/**
 * @file 首页 入口
 * @author yumao <zhangyu38@baidu.com>
 */

define(function (require) {
    require('./home.html');
    require('./home.less');

    var controller = require('./home.js');
    controller.$inject = ['$scope'];

    return angular.module('ncop')
        .controller('HomeController', controller);
});
