var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
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

        //创建了两个HtmlWebpackPlugin的实例，生成两个页面
        new HtmlwebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['app', 'vendors'],
            //要把script插入到标签里
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
        })
    ],
    //devServer:{
    //    historyApiFallback: true,
    //    hot: true,
    //    inline: true,
    //    progress: true,
    //    proxy: {
    //        '/api/*': {
    //            target: 'http://localhost:5000',
    //            secure: false
    //        }
    //    }
    //},
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