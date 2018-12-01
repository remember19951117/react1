var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/js/App' 
  ],
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build'
  },
  module: {
    loaders: [{ 
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader" 
    },{
      test: /\.css$|\.less$/,
      loaders: ['style','css','less'],
      include: __dirname
    },{
      test: /\.png$|\.jpg$/,
      loader: "url-loader?mimetype=image/png",
    },{ 
      test: /\.(gif|woff|woff2|svg|eot|ttf|otf)\??.*$/,
      loader: 'url-loader?limit=50000&name=[path][name].[ext]'
    }, {
      test: /\.json$/,  
      loader: 'json'
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'window.jQuery': "jquery",
            'window.$': 'jquery',
            'amazeui':'amazeui'
        }),
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}