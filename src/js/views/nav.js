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
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const store = require('store');
import * as auth from '../actions/utils/auth';
require("../../css/mian.css")


class Nav extends Component {
	state = {
		code: 0,
		sun: " "
	}
	
	componentWillMount() {
		const { user } = this.props;
		if (user._id) {
			require('../../css/test.css');
			require('../../css/gongyong.css');

		}
		// UI框架
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		setTimeout(function () {
			$('.am-slider').flexslider();
		});
		const { getCode } = this.props;
		getCode().then(function (result) {
			//console.log(result)
		}).catch(function (err) {
			//console.log(err)
		})
	}

	componentDidMount() {
		const { getCode } = this.props;
		const context = this;
		getCode().then(function (result) {
			//console.log(result);
			context.setState({ code: result.sum });
		})
	}

	onclickEorror() {
		$('.alertMessage').text("开发中，敬请期待！");
		$('#my-alert').modal('open');
	}



	onclickZC() {
		const { user } = this.props;
		if (user.baodan != 0) {
			this.context.router.push('/zhuce');
		} else {
			$('.alertMessage').text("您没有权限进行此操作！");
			$('#my-alert').modal('open');
		}
	}
	handleClick = (e) => {

		//console.log('click ', e);
	}
	logOut() {
		//console.log("111111")
		const { delUser, dispatch } = this.props;
		delUser();
	
		store.clear();  

		this.context.router.push('/denglu');
	
	}
	render() {
		const lang = auth.getLang();
		const context = this;
		const { user } = this.props;
		//主页面
		return (
			<div className="bod">
				<style>
					{`	
					.body{
						background-size:100% 100%;
						background: url(/public/images/bg.png) no-repeat;
					}
						.home-header{
							background: url(/public/images/headerbg.png) !important;
							margin-top:-0.33rem;
						}
						.warp{
							width:100%;
							color: #ff0000;
							background: url(/public/images/bg.png) no-repeat;
							background-size:100% 100%;
							position:relative;
						}
						.auto ul{
							background: url(/public/images/4s6.png) !important;
						}
						.auto ul li{
							border-bottom:1px solid #00F1FA;
						}
						.auto{
							width:82%;
							height:100%;
							margin: 0 auto;
						}
						.warp p{
							margin:0.2rem 0;
							display:block;
							width:82%;
							margin: 0 auto;
							height:1.7rem;
							background:#000;
							border-bottom:1px solid #00C8D0;
							color:#00C8D0;
							font-weight:bold;
						}
						.block{
							display:block;
							color:#00C8D0;
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
						.botto{
							width:100%;
							height:5rem;
							background:#000;
						}
						.ant-menu-dark .ant-menu-inline.ant-menu-sub{
							width:85%;
							margin: 0 auto;
						}
						.ant-menu-item > a.fuwu{
							color:#5ceff7;
						}
					`}
				</style>
				<div className="home-bg">
					<Link to="/"><img className="nav" src="/public/images/onc.png" /></Link>
					<div className="banner">
						<img src="/public/images/banner.png" />
					</div>
				</div>
				<div className="home-header">
					<p className="ti"><marquee>{lang.nav01}{user.gunping}</marquee></p>
				</div>
				<div className="warp">
					<p>{lang.nav02}</p>
					<div className="auto">
						<Menu
							// onClick={this.handleClick}
							style={{ color: "#00F1FA" }}
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							mode="inline"
							theme="dark"
						>
							<SubMenu key="sub1" title={<span><span>{lang.nav03}</span></span>}>
								<Menu.Item key="5"><Link to="/Gerenziliao">{lang.nav066}</Link></Menu.Item>
								<Menu.Item key="2"><Link to="/geren_child">{lang.nav0666}</Link></Menu.Item>

							</SubMenu>

							<SubMenu key="sub3" title={<Link to="/YiYuanGou"><span><span className="block">{lang.nav04}</span></span></Link>}></SubMenu>

							<SubMenu key="sub2" title={<span><span>{lang.nav05}</span></span>}>

								<Menu.Item key="5"><Link to="/zhuce">{lang.nav06}</Link></Menu.Item>
								<Menu.Item key="6"><Link to="/Directpush">{lang.nav07}</Link></Menu.Item>
								<Menu.Item key="7"><Link to="/tuandui">{lang.nav08}</Link></Menu.Item>
								<Menu.Item key="8"><Link to="/code">{lang.nav09}</Link></Menu.Item>
								<Menu.Item key="9"><Link to="/childuser">{lang.nav091}</Link></Menu.Item>
							</SubMenu>

							<SubMenu key="sub4" title={<span><span>{lang.nav10}</span></span>}>
								<Menu.Item key="9"><Link to="/JiYiDaTing">{lang.nav11}</Link></Menu.Item>
								<Menu.Item key="10"><Link to="/JinYuanGuaMai">{lang.nav12}</Link></Menu.Item>
								<Menu.Item key="11"><Link to="/JiYuanHuZhuan">{lang.nav13}</Link></Menu.Item>
								<Menu.Item key="12"><Link to="/JiYuanHuZhuanhuo">{lang.nav33}</Link></Menu.Item>

							</SubMenu>

							<SubMenu key="sub7" title={<span><span>{lang.nav14}</span></span>}>
								<Menu.Item key="9"><Link to="/integralconversion">{lang.nav15}</Link></Menu.Item>
								<Menu.Item key="10"><Link to="/integralW">{lang.nav16}</Link></Menu.Item>
								<Menu.Item key="11"><Link to="/integralL">{lang.nav17}</Link></Menu.Item>
								<Menu.Item key="12"><Link to="/integralopen">{lang.nav18}</Link></Menu.Item>
								<Menu.Item key="13"><Link to="/WLsell">{lang.nav181}</Link></Menu.Item>
							</SubMenu>

							<SubMenu key="sub10" title={<span><span>{lang.nav19}</span></span>}>
								<Menu.Item key="13"><Link to="/Activelist">{lang.nav191}</Link></Menu.Item>
								<Menu.Item key="14"><Link to="/ActivationListdetails">{lang.nav20}</Link></Menu.Item>
								<Menu.Item key="15"><Link to="/Upgrade2">{lang.nav21}</Link></Menu.Item>
								<Menu.Item key="16"><Link to="/Upgrade3">{lang.nav22}</Link></Menu.Item>
								<Menu.Item key="17"><Link to="/baodanmingxi">{lang.nav221}</Link></Menu.Item>
								<Menu.Item key="19"><Link to="/Fn">{lang.nav223}</Link></Menu.Item>
								<Menu.Item key="20"><Link to="/Fuwufeedb">{lang.nav224}</Link></Menu.Item>
							</SubMenu>

							<SubMenu key="sub9" title={<Link to="/GongGaoList"><span><span className="block">{lang.nav23}<span style={{ color: "red", float: "right", marginRight: "20px" }}>&nbsp;{this.state.code + "条未读"}</span></span></span></Link>}>

							</SubMenu>
							<Menu.Item key="18"><Link className="fuwu" to="/feedback">{lang.nav222}</Link></Menu.Item>
							<SubMenu key="sub11" title={<Link><span><span className="block" onClick={this.logOut.bind(this)}>{lang.nav24}</span></span></Link>}></SubMenu>
						</Menu>
					</div>
				</div>
			</div>
		)
	}
}

Nav.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)



