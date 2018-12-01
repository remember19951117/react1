/*eslint-disable no-console, no-var */

	var webpack = require('webpack')
	var webpackDevMiddleware = require('webpack-dev-middleware')
	var webpackHotMiddleware = require('webpack-hot-middleware')
	var config = require('./webpack.config')
	var path = require('path');
	var express = require('express');

	var app = express();

	var compiler = webpack(config)
	app.use(webpackDevMiddleware(compiler, {
		noInfo: false,
		hot: true,
    	historyApiFallback: true,
		publicPath: config.output.publicPath,
		stats: {
			colors: true
		}
	}));

	app.use(webpackHotMiddleware(compiler));

	var dirpath = __dirname+"/views/";

	app.engine('html', require('ejs').renderFile); //设置视图模版引擎为 html

	var path = require('path') 
	var router = express.Router();

	app.use("/build",express.static(__dirname+"/build"));

	app.use("/public",express.static(__dirname+"/public"));
	
	app.post("/file",function(req, res){
		var httpProxy = require('http-proxy');
		var proxy = httpProxy.createProxyServer({});
		// proxy.web(req, res, { target: "http://47.92.88.214:4030/"});
		proxy.web(req, res, { target: "http://192.168.2.123:4030/"});
	});

	router.all('*',function(req, res){ return res.render(dirpath+'/express.html'); });
	app.use(router);

	app.listen(8180, function(error) {
	  if (error) {
	    console.error(error)
	  } else {
	    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", 8180, 8180);
	  }
	});
