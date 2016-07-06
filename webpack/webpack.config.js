/**
 * Created by smzdm on 16/6/30.
 */
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: {
        app: path.resolve(APP_PATH,'index.js'),
        vendors: ['jquery', 'moment']
    },
    output:{
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    plugins:[
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

        new HtmlwebpackPlugin({
            title: 'Hello World app'
        })
    ],
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host:"0.0.0.0"
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loaders:['style', 'css'],
                include: APP_PATH
            }
        ]
    },
    devtool: 'eval-source-map'
};