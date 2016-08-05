var webpack = require('webpack')
var path = require('path');
var fs = require('fs');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vuecommon.js');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true,compress: {
    warnings: false
}});
var srcDir = path.resolve(process.cwd(), 'public/js');
function getEntry() {
    var jsPath = path.resolve(srcDir, 'vjs');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'vjs', item);
        }
    });
    return files;
}

module.exports =  {
//  entry: [
//    './public/js/pagescript/vjs/regmessagev.js'
//  ],
//  output: {
//    filename: "regmess.js"
//  },
	
	entry: getEntry(),
	output: {
	    filename: "[name].js",
	    chunkFilename: "[name].js"
	},
	plugins: [commonsPlugin,UglifyJsPlugin],
	
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\//,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', ]
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    modulesDirectories: ['node_modules']
  }
}
