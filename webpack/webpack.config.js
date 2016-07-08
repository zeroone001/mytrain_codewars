/**
 * Created by smzdm on 16/6/30.
 */
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);//从源地址到目的地址的绝对路径
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    entry: {
        app: path.resolve(APP_PATH,'index.js'),//获取项目入口JS文件
        vendors: ['jquery', 'moment']
    },
    output:{
        path: BUILD_PATH,
        publicPath: '',//用于配置文件的发布路径，如CDN
        filename: '[name].js'
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
        //各种加载器，即各种文件格式可用require引用
        loaders:[
            {
                test: /\.css$/,
                loaders:['style', 'css'],
                include: APP_PATH
            }
        ]
    },
    resolve:{
        //配置别名，在项目中可以缩减引用的路径
        alias:{

        }
    },
    devtool: 'eval-source-map'//生成sourcemap便于开发调试
};
function getEntry(){

}






