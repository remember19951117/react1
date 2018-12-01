/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
var store = require('store');
var HmacMD5 = require("crypto-js/hmac-md5");
import * as auth from '../actions/utils/auth';

class XiuGaiMiMa extends Component {

	state = {
		onchange: 1,
		value:"",
	
	}

	componentDidUpdate() {
		$('.am-slider').flexslider();
	}

	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	onChange = (e) => {
		// //console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
		
	}
	// 修改 登陆密码
	editUser() {
		const { updateUser, pushUser, user,get_user_block_pwd ,} = this.props;
		// //console.log(user)
		
		if (!this.refs.verification.value) { $('.alertMessage').text("请输入验证码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.password.value) { $('.alertMessage').text("请输入新密码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.towPassword.value) { $('.alertMessage').text("请再次输入新密码！"); $('#my-alert').modal('open'); return; }
		if (this.refs.towPassword.value != this.refs.password.value) { $('.alertMessage').text("两次密码不一致！"); $('#my-alert').modal('open'); return; }
		var data = {
			"mobile":this.state.value,
			"password": this.refs.password.value,
			"VerificationCode": this.refs.verification.value
		}
		// console.log(data)
	
		const context = this;
		const store = require('store');
		var arr = Object.keys(user);
		console.log( arr.length ==0)
		// return
		if( arr.length ==0){
			get_user_block_pwd(data).then(function (result) {
				// //console.log(result)
				if (result.statusCode==101) {
					context.refs.verification.value = "";
					context.refs.password.value = "";
					context.refs.towPassword.value = "";
				
					$('.alertMessage').text(result.message);
					$('#my-alert').modal('open');
						 store.clear() ; 
					// pushUser({ password: HmacMD5(data.password, data.password).toString() });
					// context.context.router.push('/denglu');
				}else{
					$('.alertMessage').text(result.message);
					$('#my-alert').modal('open');
				}
			
			});
		}else{
			updateUser(data).then(function (result) {
				// //console.log(result)
				if (result.statusCode==101) {
					context.refs.verification.value = "";
					context.refs.password.value = "";
					context.refs.towPassword.value = "";
					// $('.alertMessage').text(result.message);
					 store.clear()  
					// pushUser({ password: HmacMD5(data.password, data.password).toString() });
					// context.context.router.push('/denglu');
					$('.alertMessage').text(result.message);
					$('#my-alert').modal('open');
				}else{
					$('.alertMessage').text(result.message);
					$('#my-alert').modal('open');
				}
			
			});
		}

	}

	//验证码
	onClickYanZhengMa() {
		const { getSmsCode } = this.props;
		const { user } = this.props;
		const context = this;
		var s=this.state.value;
			var data = {
				"mobile": s,
			}


			if(this.state.value==""){
				$('.alertMessage').text("请输入账号");
					$('#my-alert').modal('open');
				return false
			}
			else{
				getSmsCode(data).then(function (result) {
				
					$('.alertMessage').text(result.message);
					$('#my-alert').modal('open');


				});
			}
	
	}

	render() {
		const lang = auth.getLang();
		console.log(lang)
		const { user } = this.props;
		const username = (user) => {
			return user.substr(0, 3) + '****' + user.substr(7);
		}
		return (
			<div className="wrap">
				<style>
					{`
						html,body{
							background: url(/public/images/bg.png) no-repeat !important;
							background-size:100% 100%;
							position:relative;
						}
						.wrap{
							width: 100%;
							height: 100%;
							background: url(/public/images/4s6.png) no-repeat !important;
						}
						.GR_top{
							text-align: center;
							color: #03A1BA;
							line-height: 3.3rem;
							background: #000;
							border-bottom:1px solid #03A1BA;
						}
						.GR_out{
							float: left;
							color: #03A1BA;
							margin-left: 1rem;
						}
						.GR_out link{
							color: #03A1BA;
						}
			            .XG_header{
			                width: 100%;
			                height: 2.5rem;
			                line-height: 2.5rem;
			            }
			            .XG_header span{
							display: block;
			                width: 50%;
			                color: #03A1BA;
			                background: #336BA4;
							float: left;
							text-align: center;
			            }
						.XG_content {
							margin-top:1rem; 
						}
						.XG_content{
							width: 100%;
					    	margin-bottom: 4rem;
							line-height: 2.5rem;
							float:left;
							color:#03A1BA;
						}
						.XG_content span{
							float: left;
							color: #03A1BA;
						}
						.XG_content input{
							width:100%;
							float: left;
							height:3rem;
							outline: none;
							background: #fff;
							background: url(/public/images/4s6.png) no-repeat;
							border:1px solid #177E9A;
							border-radius:5px;
							text-indent:1.5rem;
						}
						.XG_que input{
							text-align: center;
							background: #03A1BA;
							color: #fff;
							border-radius:5px;
							border:0;
							height:3.3rem;
							width:50%;
						}
						.XG_que{WWW
							width:40%;
							text-align: center;
							color: #fff;
							margin: 0 auto;
						}
						.list{
							margin:0.6rem 0;
						}
						.Obtain{
							text-align: center;
							background: #03A1BA;
							color: #fff;
							border-radius:5px;
							border:0;
							height:3.3rem;
							line-height:3.3rem;
							width:100%;
						}
					`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.editPwd01}</span>
				</div>
				<div className="XG_content">
				     {/* 请输入账号 */}
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.Directpush02}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" placeholder={lang.Directpush02} value={this.state.value} onChange={this.onChange}   ref="mobile" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.editPwd03}</Col></Row>
					<Row className="list" type="flex" align="middle">
						<Col span={11} offset={3}><input type="text" ref="verification" /></Col>
						<Col offset={2} span={5}><div className="Obtain" onClick={this.onClickYanZhengMa.bind(this)}>{lang.editPwd04}</div></Col>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.editPwd05}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="password" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.editPwd06}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="towPassword" /></Col></Row>
				</div>
				<div className="XG_que">
					<input type="button" onClick={this.editUser.bind(this)} value={lang.editPwd07} />
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

XiuGaiMiMa.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(XiuGaiMiMa)



