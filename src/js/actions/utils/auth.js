import { request } from "https";
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var store = require('store');
var locale = require("../../locale/locale").locale;

/**
 * 获取auth头
 * @param username 用户名
 * @param password 密码
 * @param url 要访问的url
 */
export function getAuth(url,user = "user",username,password){

	var pass = AES.encrypt(url+":"+new Date().getTime(), password? HmacMD5(password,password).toString() : store.get("user").password);

    if(user != null &&　user == "admin"){
    	return "bearer "+(username? username : store.get("user").username)+":"+pass+":admin";
    }else{
    	return "bearer "+(username? username : store.get("user").username)+":"+pass;
    }
}

//登陆
export function login(user){
	store.set("user",user);
}

//登出
export function loginOut(){
	store.remove("user");
}

export function loggedIn() {
	var user = store.get("user");
	if(!!user){
		return user
	}else{
		return false;
	}
}


//语言切换
export function langChange(value){
	console.log(value,"参数")

 return	store.set("lang",value);

}

//获取语言包
export function getLang(){
	var lang = store.get("lang");
	if(lang){
		return locale[lang];
	}else{
		return locale.zh;
	}
}