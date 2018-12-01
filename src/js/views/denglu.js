/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Select from 'antd/lib/select';
const Option = Select.Option;
import * as auth from '../actions/utils/auth';

class Denglu extends Component {

	state = {
		code: 3981,
		img: 0,
		locale: null,
	}
	componentWillMount() {

	}
	componentDidMount() {
		const store = require('store');
		// store.clear()
		this.onClickYzm();
		const $modal = $('#my-modal-loading');
		$modal.modal('close');
	}

	onClickLogin() {
		const { login } = this.props;
		if (!this.refs.username.value) { $('.alertMessage').text("请输入账号！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.password.value) { $('.alertMessage').text("请输入密码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.yzm.value) { $('.alertMessage').text("请输入验证码！"); $('#my-alert').modal('open'); return; }
		if (this.refs.yzm.value != this.state.code) { $('.alertMessage').text("验证码错误！"); $('#my-alert').modal('open'); return; }

		let username = this.refs.username.value;
		let password = this.refs.password.value;
		const context = this;
		login(username, password).then(function (message) {
			if (message) {
				$('.alertMessage').text(message);
				$('#my-alert').modal('open');
				return message;
			} else {
				context.context.router.push('/');
			}
		});
	}
	onChange(value) {
		console.log(value, "????")
		// auth.langChange(value);
		auth.langChange(value)

		const lang = auth.getLang();
		console.log(lang);
		// this.context.router.push('/');
		location.reload()
	}
	changeLocale = (e) => {
		const localeValue = e.target.value;
		this.setState({ locale: localeValue });
		if (!localeValue) {
			moment.locale('en');
		} else {
			moment.locale('zh-cn');
		}
	}
	onClickYzm() {
		var Arr = ['3981', '6316', '0940', '9716', '1321', '9033', '1321', '0851', '4280', '0606',
			'8397', '8487', '8546', '8897', '8907', '0349', '0778', '6786', '5796', '6998',
			'6838', '3588', '3697', '8537', '0687', '0507', '8496', '8873', '3596', '7780',
			'2586', '8979', '5048', '6080', '0488', '2580', '3547', '4587', '6580', '0587',
			'3586', '3888', '3347', '3480', '9580', '9668', '9308', '2387', '1859', '1769',]
		var index = Math.floor((Math.random() * Arr.length));
		this.setState({ code: Arr[index], img: index });
	}
	wangjimim() {
		const { history, refreshTabBarOfNumber } = this.props;
		const store = require('store');
		console.log(this.props)
		var wangi = store.set("wangji", 1)
		history.push({
			pathname: "/editPwd",
		
		})

	}
	render() {
		//语言包
		const lang = auth.getLang();
		console.log(lang);
		// console.log(this.props.user);
		const { index } = this.props;
		const Arr = ['3981', '6316', '0940', '9716', '1321', '9033', '1321', '0851', '4280', '0606',
			'8397', '8487', '8546', '8897', '8907', '0349', '0778', '6786', '5796', '6998',
			'6838', '3588', '3697', '8537', '0687', '0507', '8496', '8873', '3596', '7780',
			'2586', '8979', '5048', '6080', '0488', '2580', '3547', '4587', '6580', '0587',
			'3586', '3888', '3347', '3480', '9580', '9668', '9308', '2387', '1859', '1769',]
		return (
			<div className="dl_wrap">
				<style>
					{`
						html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td,p, select {
						margin: 0;
						padding: 0;
						}
						body{
							width: 100%;
							height: 100%;
							background: url(/public/images/loginbg.jpg) round !important;
							background-size: 100% !important;
						}
						.dl_wrop{
							position: absolute;
							width: 100%;
							height: 100%;
							background-size: cover ;
							background: url(/public/images/loginbg.jpg) !important;
						}
						.dl_logo{
							width: 100%;
							height: 16rem;
							text-align: center;
						}
						.dl_logo img {
							width: 70px;
							height: 70px;
							margin-top: 6.5rem;
						}
						.dl_titler{
							width: 100%;
							height: 6rem;
							color: #ffffff;
						    font-size: 3rem;
							text-align: center;
						}
						.dl_titler img{
							width:70px;
							height: 35px;
						}
						.dl_login{
							width: 100%;
							height: 13rem;
							padding-top:60%;
							background-size:100%;
						}
						.dl_login ul li{
							width: 100%;
						
							text-align: center;
							background: url(/public/images/4s6.png) !important;
							margin-top:1.5rem;
						}
						.dl_login ul li .amdin{
							width: 240px;
							height: 42px;
							background: #000;
							outline: none;
							color: #ffffff;
							padding-left: 3.5rem;
						    border: 1px solid #0071e0;
							border-radius:7px;
						}
						.amdin2{
							width: 145px;
							height: 35px;
							background: #000;
							float:left;
							outline: none;
							color: #ffffff;
							padding-left: 1.5rem;
						    border: 1px solid #0071e0;
							border-radius:7px;
						}
						.yzm_img{
							width: 70px;
							height: 35px;
							background: #000;
							float:right;
							outline: none;
							color: #ffffff;
						}
						.dl_dui{
							width: 100%;
							height: 2rem;
							font-size: 0.8rem;
						}
						.dl_dui span{
							display: block;
							height: 2rem;
							float: right;
							margin-top: 0.3rem;
							margin-right: 0.3rem;
						}
						.dl_dui img{
							width: 24px;
							height: 24px;
							float: right;    
							margin-right: 5rem;
						}
						.dl_button{
							width: 100%;
							text-align: center;
							margin-top: 0.5rem;
							margin-bottom: 0.5rem;
							outline: none;
						}
						.dl_button input{
							width: 210px;
							height: 40px;
							border:  0px;
							border-radius: 10px;
							background: #0e90d2;
							outline: none;
							margin: 10px auto;
							color: #ffffff;
							font-size: 2rem;
						}
						.dl_pwd p{
							text-align: center;
							color: #cccccc;
							font-size: 0.4rem;
						}
						.dl_pwd p span{
							margin: 1rem 1rem 0 1rem;
						}
						.cen{
							display:inline-block;
							width: 240px;
							height: 42px;
							position: relative;
						}
						.cen .span{
							position: absolute;
							bottom: -18px;
							left: 0;
						}
						.dl_pwd p{
							text-align: center;
							color: #00C8D0;
						}
						.dl_pwd p span a{
							margin: 1rem 1rem 0 1rem;
							color: #00C8D0;
						}
						a{
							color: #00C8D0;
						}
						.ant-select-selection--single{
							background:#02141E;
							border:1px solid;
						}
						.dl_lan{
							// margin-left:50%;
							text-align:center;
							margin-top:1rem;
						}
						.li{
							position: relative;
						}
						.li label{
							position: absolute;
							width:35px;
							background:url("/public/images/user.png")no-repeat; 
						
							background-size: 59% 57%;
							margin-left: 8px;
							background-position: 3px 10px;
							z-index: 999;
							height: 100%;
						}
						.li:nth-child(2) label{	
							background:url("/public/images/pwad.png") no-repeat;
							background-size: 59% 57%;
							background-position: 3px 10px;	
						}

					`}
				</style>
				{/* <div className="dl_logo"></div> */}

				<div className="dl_login">
					{/* <div><marquee style={{ fontWeight: "bold", color: "#00C8D0", fontSize: "20px" }}>已经更新到最新版本</marquee></div> */}
					<ul>
						<li className="li"><label></label> <input type="text" ref="username" autocomplete="off" style={{ opacity: '0.5' }} placeholder="账号" className="amdin" /></li>
						<li className="li"><label></label> <input type="password" ref="password" autocomplete="off" style={{ opacity: '0.5' }} placeholder="密码" className="amdin" /></li>
						<li>
							<div className="cen" style={{}}>
								<input type="text" ref="yzm" style={{ opacity: '0.5' }} placeholder="验证码" className="amdin2" value={Arr[index]} />
								<div className="yzm_img">
									<img src={"/public/images/verify" + this.state.img + ".png"} width="100%" height="100%" onClick={this.onClickYzm.bind(this)} />
								</div>
								<span className="span"><a onClick={this.wangjimim.bind(this)}>{lang.logina}?</a></span>
							</div>

						</li>
					</ul>
					<div className="dl_button">
						<input type="button" onClick={this.onClickLogin.bind(this)} value={lang.loginBT} />
					</div>

					<div className="dl_lan">
						<Select value={lang.Language} style={{ width: "160px", color: "#00C8D0" }} onChange={this.onChange.bind(this)}>
							<Option value="zh">中文简体</Option>
							<Option value="fa">中文繁體</Option>
							<Option value="en">English</Option>
						</Select>
					</div>
				</div>

				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">{lang.home09}</div>
						<div className="am-modal-bd alertMessage">
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn">{lang.home10}</span>
						</div>
					</div>
				</div>
			</div>
		)

	}
}

Denglu.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userAct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Denglu)



