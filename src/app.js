/**
 * @file 应用入口
 * @author yumao <zhangyu38@baidu.com>
 */

define(function (require) {

    global.$ = global.jQuery = require('jquery');

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ncop']);
    });

    var app = angular.module('ncop', [
        'ui.router',
        'ui.bootstrap',
        'ngSanitize'
    ]);

    require('public/style/main.less');

    app.config(require('public/route'));

});
