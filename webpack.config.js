/**
 * @file webpack 配置
 * @author yumao <zhangyu38@baidu.com>
 */

/* eslint-env node */

var path = require('path');
var webpack = require('webpack');

// 绝对路径
function absPath(p) {
    return path.resolve(__dirname, p);
}

var PATHS = {
    SRC: absPath('src'),
    DEP: absPath('dep'),
    ASSET: absPath('asset')
};

module.exports = {
    context: PATHS.SRC,

    entry: {
        app: './app.js',
        base: ['jquery', 'angular', 'angular-ui-router']
    },

    output: {
        path: PATHS.ASSET,
        filename: 'app.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('base', 'base.js')
    ],

    resolve: {
        root: PATHS.SRC,
        // TODO: general
        alias: {
            'jquery': path.resolve(PATHS.DEP, 'jquery/jquery.min.js'),
            'angular': path.resolve(PATHS.DEP, 'angular/angular.min.js'),
            'angular-ui-router': path.resolve(PATHS.DEP, 'angular-ui-router/angular-ui-router.min.js')
        }
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'ng-cache-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ],
        noParse: [
            /.*\.min\.js$/
        ]
    }
};
