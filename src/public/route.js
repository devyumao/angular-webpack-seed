/**
 * @file 路由
 * @author yumao <zhangyu38@baidu.com>
 */

define(function (require) {

    require('business/home');

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

});
