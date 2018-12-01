/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import * as newsAct from '../actions/newsAct';
import Link from 'react-router/lib/Link';
import { APIHost } from '../actions/utils/fetch';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import * as auth from '../actions/utils/auth';
var store=require("store");
const SubMenu = Menu.SubMenu;
class Home extends Component {
	state = {
		list: [],
		pageSize: 10000,
		page: 1,
		visible: false
	}

	componentWillMount() {
		//console.log(12312312312);
//		var user=store.get("user");
//		//console.log(user)
//			if(!user){
//				this.logOut();	
//			}
		//console.log(this.props);
		const { user } = this.props;
		if (user._id) {//如果登陆的话 就刷新
			require('../../css/test.css');
			require('../../css/gongyong.css');
			var loginTime=store.get("loginTime");
			// //console.log(loginTime);
			if(loginTime){//不是第一次登陆
			if(new Date().getTime()-Number(loginTime)<1800000){//距上次登陆时间小于30分钟，就刷新
			store.set("loginTime",new Date().getTime());//记录下本次的登录时间
			const { refresh } = this.props;
			refresh();	
			}
			else{//距上次登陆时间大于30分钟，退出，并移除登录时间
			this.logOut();	
			store.remove("loginTime");
			}
			}else{//是第一次登陆
			store.set("loginTime",new Date().getTime());
			// //console.log(store.get("loginTime"))
			}
		}
		
		
		const { newsListAct } = this.props;
		const context = this;
		newsListAct(this.state.page, this.state.pageSize ).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource })
				
			}
		})
		//UI框架 
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		setTimeout(function () {
			$('.am-slider').flexslider();
		});
	}

	componentDidMount() {
		const { user } = this.props;
		if (user.lJifenSum >= user.registerJibie * 10) {
			this.onclickEorror();
		}
		if (user.state == 2 && user.jiaoyiTotal <= 0) {
			this.onclickEorror2();
		}
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
    logOut() {
		// //console.log("111111")
		const { delUser, dispatch } = this.props;
		this.context.router.push('/denglu');
//		delUser();
	}
	onclickEorror() {
		$('.alertMessage').text("请进行动态复投！");
		$('#my-alert').modal('open');
	}
	onclickEorror2() {
		$('.alertMessage').text("请进行原点复投！");
		$('#my-alert').modal('open');
	}
	//报单中心
	onclickZC() {
		const { user } = this.props;
		if (user.baodan != 0) {
			this.context.router.push('/zhuce');
		} else {
			$('.alertMessage').text("您没有权限进行此操作！");
			$('#my-alert').modal('open');
		}
	}
	//公告
	onClickList(item) {
		const { newsInfoAct } = this.props;
		this.context.router.push("/homeNew/" + item._id)
	}
	//显示列表
	onClickNav() {
		alert("111")
	}
	//弹窗

	render() {
		const lang = auth.getLang();
		const { list = [] } = this.state;
		const context = this;
		const { user } = this.props;
		console.log("user",user)
		//主页面
		return (
			<div>
				<style>
					{`	
						.home-header{
							background: url(/public/images/headerbg.png) !important;
							margin-top:-0.33rem;
						}
						.warp{
							width:100%;
							height:100%;
							background:url(/public/images/bg.png) !important;
						}
						.warp ul li{
							height:7rem;
							background:url(/public/images/jifen.png) 100%;
							background-size:100% 100%;  
							color:#fff;
							margin-top:1rem;
						}
						.warp ul{
							width:90%;
							margin:0 auto;
							padding:1rem 0 0 0;
							padding-bottom: 2rem;
						}
						.tit{
							font-size:1rem;
							height:2rem;
							line-height:2rem;
							padding-left:1rem;
						}
						.num{
							color:#00F1FA;
							height:4rem;
							font-size:1.7rem;
							text-align:right;
							display:block;
							line-height:4rem;
							margin-right:2rem;
						}
						.jifentit img{
							width:100%;
							height:100%;
							background-size:100% 100%;  
							margin-top:1rem;
						}
						.nav{
							height:5%;
							position:absolute;
							right:1rem;
							top:1rem;
						}
						.banner{
							width:100%;
						}
						.banner img{
							width:100%;
							height:100%;
							background-size:100% 100%;  
						}
					`}
				</style>
				<div className="home-bg">
					<Link to="/Nav"><img className="nav" src="/public/images/onc.png" /></Link>
					<div className="banner">
						<img src="/public/images/banner.png" />
					</div>
				</div>
				<div className="home-header">
					<p className="ti"><marquee>{lang.nav01}{user.gunping}</marquee></p>
				</div>
				<div className="warp">
					<ul>
						<li><p className="tit">{lang.home02}</p><p className="num">{user.fengding.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home01}</p><p className="num">{user.gujia.toFixed(2)}</p></li>
						<p className="jifentit"><img src="/public/images/jif.png" /></p>
					
						<li><p className="tit">{lang.home03}</p><p className="num">{user.gufen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home04}</p><p className="num">{user.wJifen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home05}</p><p className="num">{user.lJifen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home06}</p><p className="num">{user.gwJifen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home07}</p><p className="num">{user.khJifen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home08}</p><p className="num">{user.jhJifen.toFixed(2)}</p></li>
						<li><p className="tit">{lang.home081}</p><p className="num">0.00</p></li>
						{/* <li><p className="tit">{lang.home082}</p><p className="num">0.00</p></li> */}
						<li><p className="tit">{lang.home083}</p><p className="num">0.00</p></li>
					</ul>
				</div>
				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">{lang.home09}</div>
						<div className="am-modal-bd alertMessage"></div>
						<div className="am-modal-footer">
							<span className="am-modal-btn">{lang.home10}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Home.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
		userAct: state.userAct,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userAct, ...newsAct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);