/**
 * Created by shichenda on 2016/6/13.
 */
var express = require('express');

var app = express() , admin = express(), wechat = express(), mobile = express();

var dirpath = __dirname+"/views";

admin.engine('html', require('ejs').renderFile); //设置视图模版引擎为 html
mobile.engine('html', require('ejs').renderFile); //设置视图模版引擎为 html

var mobileRouter = express.Router();
var adminRouter = express.Router();
var wechatRouter = express.Router();

app.use("/build",express.static(__dirname+"/build"));
app.use(express.static(dirpath));
app.use("/public",express.static(__dirname+"/public"));

app.use("/",express.static(__dirname+"/index"));

app.post("/file",function(req, res){
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer({});
    proxy.web(req, res, { target: "http://192.168.199.170:2000/" }); //地址为后台服务器地址，要如果换服务器要改动。
});

adminRouter.all('*',function(req, res){ return res.render(dirpath+'/admin/index.html'); });
admin.use(adminRouter);

app.use('/admin', admin);

mobileRouter.all('*',function(req, res){ return res.render(dirpath+'/indexm.html'); });
mobile.use(mobileRouter);

app.use('/cyw', mobile);

wechatRouter.all("*",function(req, res){
    var httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer({});
    proxy.web(req, res, { target: "http://139.224.1.130:2000/wechat" }); //地址为后台服务器地址，要如果换服务器要改动。
});

wechat.use(wechatRouter);

app.use('/wechat', wechat);

app.listen(80, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", 80, 80);
    }
});