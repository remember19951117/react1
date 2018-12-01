import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';
import { getMessage } from './utils/utils';

export function getUser(userData) {
	auth.login(userData);
	return {
		type: "GET_USER",
		user: userData
	}
}

export function delUser() {
	auth.loginOut();
	return {
		type: "DELETE_USER"
	}
}

export function pushUser(userData) {
	auth.login(Object.assign({}, auth.loggedIn(), userData));
	return {
		type: "PUSH_USER",
		user: userData
	}
}
//111111111111111传参
export function zhuce6(data) {

	return {
		type: "zhuce_sendData",
		user: data
	}
}
export function uploadImage(data) {
	return {
		type: 'UPDATE_USER_HEDAIMG',
		imgPath: data
	}
}

//根据key值设置默认地址
export function deSelectAddressWithKey(keyStr) {
	return {
		type: "DESELECT_ADDRESS_KEY",
		data: keyStr
	}
}

//用户登陆登录
export function login(username, password) {
	const url = fetchs.APIHost + '/user/login'
	const AES = require("crypto-js/aes");
	return dispatch => {
		return fetchs.read_Token(url, auth.getAuth("/user/login", "user", username, password))
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 401) {
					return "账号或密码输入错误，请重新输入！";
				} else if (json.statusCode == 403) {
					// console.log("权限拒绝")
				} else if (json.statusCode == 101) {
					var HmacMD5 = require("crypto-js/hmac-md5");
					var user = json.resource;
					user.password = HmacMD5(password, password).toString();
					dispatch(getUser(user));
				} else {
					return json.message;
				}
			});
	}
}

//用户登陆登录
export function login2(data) {
	const url = fetchs.APIHost + '/user/login'
	const AES = require("crypto-js/aes");
	return dispatch => {
		return fetchs.read_Token(url, auth.getAuth("/user/login"))
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 401) {
					return "账号或密码输入错误，请重新输入！";
				} else if (json.statusCode == 403) {
					// console.log("权限拒绝")
				} else if (json.statusCode == 101) {
					var HmacMD5 = require("crypto-js/hmac-md5");
					var user = json.resource;
					user.password = data.password;
					dispatch(getUser(user));
				} else {
					return json.message;
				}
			});
	}
}

//用户刷新
export function refresh() {
	const url = fetchs.APIHost + '/user/login'
	return dispatch => {
		return fetchs.read_Token(url, auth.getAuth("/user/login"))
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					var user = json.resource;
					delete user.password
					dispatch(pushUser(user));
				} else {
					return json.message;
				}
			});
	}
}

//创建注册
export function createUser(data) {
	const url = fetchs.APIHost + '/user/register';
	const token = auth.getAuth('/user/register');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				return json;
				// if(json.statusCode == 101){
				// 	// var HmacMD5 = require("crypto-js/hmac-md5");
				// 	// var user = json.resource;
				// 	// user.password = HmacMD5(user.password,user.password).toString();
				// 	// dispatch(getUser(json.resource));
				// 	return json.message;
				// }else{
				// 	return json.message;
				// }
			});
	}
}

//修改密码

export function updateUser(data) {
	const url = fetchs.APIHost + '/user/pwd';
	const token = auth.getAuth('/user/pwd');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//修改密码
export function get_user_block_pwd(type) {
	// console.log(type)
	const url = fetchs.APIHost + '/user/backPwd'
	return dispatch => {
		return fetchs.no_token(url, JSON.stringify(type))
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}



//更新用户头像
export function uploadImageAct(data) {
	const url = fetchs.APIHost + '/file';
	const token = auth.getAuth('/file');
	return dispatch => {
		return fetchs.uploadImg_Token(url, data)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 401) {
					// console.log("无权限")
				} else if (json.statusCode == 403) {
					// console.log("权限拒绝")
				} else if (json.statusCode == 108) {
					// console.log("插入数据出错")
				} else {
					// console.log('上传的图片', json);
					return json;
					// dispatch(uploadImage(json.url));
				}
			});
	}
}

//通过 code 获取用户信息
export function codeGetUser(code) {
	const url = fetchs.APIHost + '/wechat/code/user'
	return dispatch => {
		return fetchs.create(url, { code: code })
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch(getUser(json.resource));
				} else {
					return json;
				}
			});
	}
}

//通过 code 获取微信用户信息
export function codeGetWeixinUser(code) {
	const url = fetchs.APIHost + '/wechat/code/weixin/user';
	return dispatch => {
		return fetchs.create(url, { code: code })
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch({
						type: "GET_WEIXINUSER",
						data: json.resource
					});
				} else {
					alert(json.message);
				}
			});
	}
}

//修改密码    通过获取短信验证码信息  
// export function getSmsCode(mobile){
// 	const url = fetchs.APIHost+'/sms/reg';
// 	return dispatch => {
// 		return fetchs.creat_Token(url,{mobile:mobile})
// 			.then(response => response.json())
// 			.then(json => {
// 				if(json.statusCode == 102){
// 					return(json.message);
// 				}
// 			});
// 	}
// }
//通过获取短信验证码信息注册
export function getSmsCode(mobile) {
	const url = fetchs.APIHost + '/sms/reg';
	return dispatch => {
		return fetchs.create(url, mobile)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

//修改个人资料
export function submitEditUser(data) {
	const url = fetchs.APIHost + '/user/updateData';
	const token = auth.getAuth('/user/updateData');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}

// 获取用户 子账号  
export function get_user_child(page, size) {
	const url = fetchs.APIHost + '/message/getSonList/' + (page) + "/" + size;
	const token = auth.getAuth('/message/getSonList/' + (page) + "/" + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//获取我发布的信息列表 
export function myReleaseList(page, size) {
	const url = fetchs.APIHost + '/recruit/my/list/' + (page) + "/" + size;
	const token = auth.getAuth('/recruit/my/list/' + (page) + "/" + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					if (page > 1) {
						dispatch({
							type: "Qzzp_List_More_Data",
							data: json.resource
						});
						return json;
					} else {
						dispatch({
							type: "Qzzp_List_Data",
							data: json.resource
						});
						return json;
					}
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}

//发表评论
export function submitMessage(data) {
	const url = fetchs.APIHost + '/message';
	const token = auth.getAuth(('/message'), 'user');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.message
				} else {
					return json.message
				}
			});
	}
}

//获取某信息留言列表
export function getMessageList(id) {
	const url = fetchs.APIHost + '/message/list/' + id;
	return dispatch => {
		return fetchs.read(url)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch({
						type: "MESSAGE_LIST",
						data: json.resource
					});
					return json;
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}

//获取微信jssdk配置信息
export function getJsConfig(data) {
	const url = fetchs.APIHost + "/wechat/js/config";
	return dispatch => {
		return fetchs.create(url, data)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch({
						type: "GET_JS_CONFIG",
						data: json.resource
					});
					return true;
				} else {
					alert(json.message);
				}
			});
	}
}


//获取滚动图片
export function getSilder(type) {

	const url = fetchs.APIHost + '/mobile/view/slider/' + type
	return dispatch => {
		return fetchs.read(url)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch({
						type: "GET_SLIDER",
						slider: json.resource
					});
				} else {
					dispatch({
						type: "GET_SLIDER",
						slider: []
					});
				}
			});
	}
}



//删除我发发布过的信息
export function delMyReleaseList(key, id) {
	const url = fetchs.APIHost + '/recruit/' + id;
	const token = auth.getAuth('/recruit/' + id);
	return dispatch => {
		return fetchs.delete_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					dispatch({
						type: "Qzzp_DELETE",
						key: key
					});
					getMessage().success(json.message);
				} else {
					getMessage().error(json.message);
				}
			});
	}
}
//智慧城市
//购买
export function buyjf(number) {
	const url = fetchs.APIHost + '/transaction/buyRecord/' + number;
	const token = auth.getAuth('/transaction/buyRecord/' + number);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.message;
				} else {
					return json.message;
				}
			});
	}
}
//出售
export function selljf(sellnumber) {
	const url = fetchs.APIHost + '/transaction/sellerRecord/' + sellnumber;
	const token = auth.getAuth('/transaction/sellerRecord/' + sellnumber);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.message;
				} else {
					return json.message;
				}
			});
	}
}
//匹配记录
export function pipei() {
	const token = auth.getAuth('/transaction/ppList');
	const url = fetchs.APIHost + '/transaction/ppList';
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.resource;
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}
//交易记录
export function jilu(type) {
	var token = auth.getAuth('/transaction/buyList');
	var url = fetchs.APIHost + '/transaction/buyList';

	if (type == 'chushou') {
		var token = auth.getAuth('/transaction/sellList');
		var url = fetchs.APIHost + '/transaction/sellList';
	}
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.resource;
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}
//状态码切换
export function jiaoyiConfirm(id) {
	var token = auth.getAuth('/transaction/finishDeal/' + id);
	var url = fetchs.APIHost + '/transaction/finishDeal/' + id;
	return dispatch => {
		return fetchs.creat_Token(url, token, {})
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 101) {
					return json.resource;
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}
//兑换
export function exce(number, password) {
	const url = fetchs.APIHost + '/user/hallexchange';
	const token = auth.getAuth('/user/hallexchange');
	var body = { num: number, secondpwd: password }
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(body))
			.then(response => response.json());
	}
}

//原点升级
export function userUpgrade(data) {
	const url = fetchs.APIHost + '/user/upgrade';
	const token = auth.getAuth('/user/upgrade');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//原点复投

export function userUpgrade3(data) {
	const url = fetchs.APIHost + '/user/FuTou';
	const token = auth.getAuth('/user/FuTou');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}



//交易管理

//积分互转
export function DingXiang(data) {
	const url = fetchs.APIHost + '/transaction/kaihu';
	const token = auth.getAuth('/transaction/kaihu');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//交易大厅--出售信息列表
export function JYList(page, size) {
	const url = fetchs.APIHost + '/transaction/allSell/list/' + page + '/' + size;
	const token = auth.getAuth('/transaction/allSell/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//转出记录
export function zhuanzhang(status ,num, page, size) {
	console.log(status,num, page, size)
	const url = fetchs.APIHost + '/transaction/kaihu/list/'+`${status}/`+ 1 + '/' + page + '/' + size;
	const token = auth.getAuth('/transaction/kaihu/list/'+`${status}/` + 1 + '/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//转入记录  
export function zhuanzhang2(status,num, page, size) {
	console.log(status,num, page, size)
	// const url = fetchs.APIHost+'/transaction/sell/list/'+page+'/'+size;
	// const token = auth.getAuth('/transaction/sell/list/'+page+'/'+size);
	const url = fetchs.APIHost + '/transaction/kaihu/list/'+`${status}/` + 2 + '/' + page + '/' + size;
	const token = auth.getAuth('/transaction/kaihu/list/'+`${status}/` + 2 + '/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
// -- W积分挂卖
export function GuaMai(data) {
	const url = fetchs.APIHost + '/transaction';
	const token = auth.getAuth('/transaction');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}
// W积分挂卖记录  
export function JYGMList(page, size) {
	const url = fetchs.APIHost + '/transaction/sell/list/' + page + '/' + size;
	const token = auth.getAuth('/transaction/sell/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//交易大厅 -- 货币转换
export function HuZhuan(data) {
	const url = fetchs.APIHost + '/transaction/buyzcb';
	const token = auth.getAuth('/transaction/buyzcb');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//货币转换记录  
export function JYZHList(page, size) {
	const url = fetchs.APIHost + '/transaction/zcb/list/' + page + '/' + size;
	const token = auth.getAuth('/transaction/zcb/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//交易大厅 -- 货币购买记录
// export function HBGMList(page,size){
//     const url = fetchs.APIHost+'/transaction/buygou/list/'+page+'/'+size;
//     const token = auth.getAuth('/transaction/buygou/list/'+page+'/'+size);
//    return dispatch => {
// 		return fetchs.read_Token(url, token)
// 			.then(response => response.json())
// 			.then(json => {
// 				if(json.statusCode == 107){
// 					return json.resource;
// 				}else{
// 					// console.log('返回的结果',json);
// 				}
// 			});
// 	}
// }

//财务管理
//基础收益
export function JCSY(page, size) {
	const url = fetchs.APIHost + '/staticList/list/' + page + '/' + size;
	const token = auth.getAuth('/staticList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//分享收益GET {page}/{size}
export function FenXiangList(page, size) {
	const url = fetchs.APIHost + '/dynamicList/list/' + page + '/' + size;
	const token = auth.getAuth('/dynamicList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//管理分红GET {page}/{size}
export function GuanLiList(page, size) {
	const url = fetchs.APIHost + '/getBuyEamingList/list/' + page + '/' + size;
	const token = auth.getAuth('/getBuyEamingList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//服务分红
export function FuWuList(page, size) {
	const url = fetchs.APIHost + '/managementList/list/' + page + '/' + size;
	const token = auth.getAuth('/managementList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}


// -- 确认购买
export function QueRen(id) {
	const url = fetchs.APIHost + '/transaction/buyeggmoney/' + id;
	const token = auth.getAuth('/transaction/buyeggmoney/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}


// -- 购买记录
export function GMList(page, size) {
	const url = fetchs.APIHost + '/transaction/buy/list/' + page + '/' + size;
	const token = auth.getAuth('/transaction/buy/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

// -- 确认支付
export function GMpay(id) {
	const url = fetchs.APIHost + '/transaction/' + id;
	const token = auth.getAuth('/transaction/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

// -- 确认完成
export function QueRenJY(id) {
	const url = fetchs.APIHost + '/transaction/' + id;
	const token = auth.getAuth('/transaction/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

// -- 取消交易
export function QuXiaoJY(id) {
	const url = fetchs.APIHost + '/transaction/repealSell/' + id;
	const token = auth.getAuth('/transaction/repealSell/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

// -- 查看订单详情
export function getTansInfo(id) {
	const url = fetchs.APIHost + '/transaction/findRecord/' + id;
	const token = auth.getAuth('/transaction/findRecord/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}

//我的团队
export function getMyTeam(username) {
	const url = fetchs.APIHost + '/user/allfriend/' + username;
	const token = auth.getAuth('/user/allfriend/' + username);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//我的团队
export function getMyTeam2(username) {
	const url = fetchs.APIHost + '/user/allfriend/' + username;
	const token = auth.getAuth('/user/allfriend/' + username);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//网络图
export function getAllfriend(username) {
	const url = fetchs.APIHost + "/user/allfriend/" + username;
	const token = auth.getAuth("/user/allfriend/" + username);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//阶层图
export function getAllfriend2(username) {
	const url = fetchs.APIHost + '/user/allfriend/' + username;
	const token = auth.getAuth('/user/allfriend/' + username);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				// console.log(json)
				return json;
			});
	}
}
//幸运大转盘
export function DZP() {
	const url = fetchs.APIHost + "/awardRecordDZP";
	const token = auth.getAuth("/awardRecordDZP");
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//大转盘记录
export function ZJJLList(page, size) {
	const url = fetchs.APIHost + '/awardRecordDZP/list';
	const token = auth.getAuth('/awardRecordDZP/list');
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//一元购顶部循环记录
export function showList(page, size) {
	const url = fetchs.APIHost + '/product/winAllList/' + page + '/' + size;
	const token = auth.getAuth('/product/winAllList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//商品列表
export function Shoppinglist() {
	const url = fetchs.APIHost + '/product/list';
	const token = auth.getAuth('/product/list');
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//抽奖记录列表
export function Numlist(page, size) {
	const url = fetchs.APIHost + '/product/joinList/' + page + '/' + size;
	const token = auth.getAuth('/product/joinList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}

// -- 抽奖中奖记录
export function WinningList(page, size) {
	const url = fetchs.APIHost + '/product/winList/' + page + '/' + size;
	const token = auth.getAuth('/product/winList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//获取商品详情
export function detailslist(id) {
	const url = fetchs.APIHost + ('/product/' + id);
	const token = auth.getAuth('/product/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json
			});
	}
}
//购买商品
export function SuccessList(data) {
	const url = fetchs.APIHost + '/order';
	const token = auth.getAuth('/order');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//修改个人资料
// export function submitEditUser(data) {
// 	const url = fetchs.APIHost + '/user/updateData';
// 	const token = auth.getAuth('/user/updateData');
// 	return dispatch => {
// 		return fetchs.creat_Token(url, token, JSON.stringify(data))
// 			.then(response => response.json())
// 			.then(json => { return json; });
// 	}
// }
//提现
export function Tixians(citybank, citynumber, citypassword) {
	const url = fetchs.APIHost + '/user/withdrawCash';
	const token = auth.getAuth('/user/withdrawCash');
	var body = { bankCard: citybank, number: Number(citynumber), secondpwd: citypassword }
	// console.log(44444, body);
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(body))
			.then(response => response.json());
	}
}
//提现记录
export function tixianlist() {
	const url = fetchs.APIHost + '/user/withdrawCashList';
	const token = auth.getAuth('/user/withdrawCashList');
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				if (json.statusCode == 107) {
					return json.resource;
				} else {
					// console.log('返回的结果', json);
				}
			});
	}
}
//我的购买列表
export function buylist(page, size) {
	const url = fetchs.APIHost + '/order/my/list/' + page + '/' + size;
	const token = auth.getAuth('/order/my/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}


//积分转换
export function integralconversion(data) {
	const url = fetchs.APIHost + '/transaction/buyzcb';
	const token = auth.getAuth('/transaction/buyzcb');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => { return json; });
	}
}
//我的直推
export function ZTlist(page, size) {
	const url = fetchs.APIHost + '/user/friends/' + page + '/' + size;
	const token = auth.getAuth('/user/friends/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//兑换积分
export function exchange(data) {
	const url = fetchs.APIHost + '/user/exchange';
	const token = auth.getAuth('/user/exchange');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				// console.log("返回", json)
				return json;
			});
	}
}
//兑换WL股份
export function exchange2(data) {
	const url = fetchs.APIHost + '/user/exchangeGufen';
	const token = auth.getAuth('/user/exchangeGufen');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				// console.log("返回", json)
				return json;
			});
	}
}
//问题反馈
export function feedback(data) {

	const url = fetchs.APIHost + '/systemSmg/userSmg';
	const token = auth.getAuth('/systemSmg/userSmg');
	// console.log(11111111, data)
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				// console.log("返回", json)
				return json;
			});
	}
}
// 获取用户反馈列表  

export function get_user_block(page, size, type) {
	const url = fetchs.APIHost + '/systemSmg/userSmgList/' + page + "/" + size +"/"+type;
	const token = auth.getAuth('/systemSmg/userSmgList/' + page + "/" + size+"/"+type);

	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json());
	}
}
//获取积分列表  ---WWWWWWWWWWWWW
export function integralWList(page, size) {
	const url = fetchs.APIHost + '/message/splitList/' + page + '/' + size;
	const token = auth.getAuth('/message/splitList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取积分列表   ---LLLLLLLLLLLLLL
export function integralList(page, size) {
	const url = fetchs.APIHost + '/message/list/' + page + '/' + size;
	const token = auth.getAuth('/message/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取购物积分记录   
export function gouwulist(page, size) {
	const url = fetchs.APIHost + '/message/getShopList/' + page + '/' + size;
	const token = auth.getAuth('/message/getShopList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取积分列表   ---开户积分
export function integralopenList(page, size) {
	const url = fetchs.APIHost + '/dynamicList/list/' + page + '/' + size;
	const token = auth.getAuth('/dynamicList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取积分列表   ---激活积分
export function integralactivationList(page, size) {
	const url = fetchs.APIHost + '/dynamicList/list/' + page + '/' + size;
	const token = auth.getAuth('/dynamicList/list/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//激活用户

export function jhUser(data) {
	const url = fetchs.APIHost + '/user/jhUser';
	const token = auth.getAuth('/user/jhUser');
	return dispatch => {
		return fetchs.creat_Token(url, token, JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}

//查看用户等级
export function querybtns(username) {
	const url = fetchs.APIHost + ('/user/Chaone/' + username);
	const token = auth.getAuth('/user/Chaone/' + username);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json
			});
	}
}
//保单明细列表
export function baodanmingxi(page, size) {
	const url = fetchs.APIHost + '/message/getBaodanList/' + page + '/' + size;
	const token = auth.getAuth('/message/getBaodanList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取个人反馈列表


export function getFeedb(page, size, type) {
	const url = fetchs.APIHost + '/systemSmg/userSmgList/' + page + '/' + size + '/' + type;
	const token = auth.getAuth('/systemSmg/userSmgList/' + page + '/' + size + '/' + type);
	return dispatch => {
		return fetchs.read_Token(url, token,)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}


}

//获取我的子账号
export function getchildUser(page, size) {
	const url = fetchs.APIHost + '/message/getSonList/' + page + '/' + size;
	const token = auth.getAuth('/message/getSonList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}

//获取WL股份明细
export function getWLsell(page, size) {
	const url = fetchs.APIHost + '/message/getGugenList/' + page + '/' + size;
	const token = auth.getAuth('/message/getGugenList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取未激活列表
export function getActivelist(page, size) {
	const url = fetchs.APIHost + '/message/getNoJihuo/' + page + '/' + size;
	const token = auth.getAuth('/message/getNoJihuo/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//撤销未激活账户
export function deleteUser(id) {

	const url = fetchs.APIHost + '/user/delfriend/' + id;
	const token = auth.getAuth('/user/delfriend/' + id);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}

//获取激活权限类型
export function getType() {
	const url = fetchs.APIHost + '/systemSet/list';
	const token = auth.getAuth('/systemSet/list');
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}
//获取未读新闻个数
export function getCode() {
	const url = fetchs.APIHost + '/systemSmg/not/read/list';
	const token = auth.getAuth('/systemSmg/not/read/list');
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
				return json;
			});
	}
}