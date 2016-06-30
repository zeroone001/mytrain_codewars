var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: {
        //三个入口文件
        app: path.resolve(APP_PATH,'index.js'),//index是入口
        mobile: path.resolve(APP_PATH,'mobile.js'), //mobile入口
        vendors: ['jquery', 'moment']
    },
    output:{
        path: BUILD_PATH,
        filename: '[name].js'
    },
    plugins:[
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

        new HtmlwebpackPlugin({
            title: 'Hello World app',

        })
    ],
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
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