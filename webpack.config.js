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

var depAlias = {
    'jquery': 'jquery/jquery.min.js',
    'angular': 'angular/angular.min.js',
    'angular-ui-router': 'angular-ui-router/angular-ui-router.min.js',
    'angular-sanitize': 'angular-sanitize/angular-sanitize.min.js',
    'bootstrap': 'bootstrap/css/bootstrap.min.css',
    'angular-bootstrap': 'angular-bootstrap/angular-bootstrap.min.js'
};

for (var dep in depAlias) {
    depAlias[dep] = path.resolve(PATHS.DEP, depAlias[dep]);
}

module.exports = {
    context: PATHS.SRC,

    entry: {
        app: './app.js',
        base: [
            'jquery',
            'angular',
            'angular-ui-router',
            'angular-sanitize',
            'bootstrap',
            'angular-bootstrap'
        ]
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
        alias: depAlias
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.html$/,
                loader: 'ng-cache'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url' // dev
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader: 'file?name=font/[name].[ext]?[hash]'
            }
        ],
        noParse: [
            /.*\.min\.js$/
        ]
    }
};
