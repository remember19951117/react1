/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
//import Select from 'antd/lib/select';
//const Option = Select.Option;
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import styles from '../../css/zhuce.css';
import Radio from 'antd/lib/radio';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import * as auth from '../actions/utils/auth';

class Zhuce extends Component {
	state = {
		money: 0,
		useranme: 0,
		// jiedian:0,
		// value:0,

	}

	constructor() {
		super();
		this.state = {
			vip: "1",
		};
	}
	componentWillMount() {
        const $LoadingDom = $('#my-modal-loading');
        $LoadingDom.modal('close');
	}
	componentDidMount() {
		this.state.value = 0;
		const { users } = this.props;
		const { sendData } = this.props;
		this.refs.parentUsername.value = sendData.state ? sendData.tuijian : "";
		this.refs.jiedian.value = sendData.state ? sendData.jiedian : "";
		this.state.value = sendData.state ? sendData.qu : "";
	}
	//选择区
	onChange = (e) => {
		const { order } = this.props;
		if (e.value == 1) {
			this.setState({
				value: e.target.value,
			})
		} else {
			this.setState({
				value: e.target.value,
			})
		}
	}
	onChange2 = (e) => {
		// //console.log('radio checked', e.target.value);
		this.setState({
			value2: e.target.value,
		});
	}
	//强制复投
	onChange3 = (e) => {
		// //console.log('强制复投', e.target.value);

		this.setState({
			value3: e.target.value,
			
		});

	}
	onClickZhuce(e) {
		// //console.log(this.state.value)
		const { createUser, pushUser, user } = this.props;


		if (!this.refs.parentUsername.value) { $('.alertMessage').text("请输入推荐人！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.jiedian.value) { $('.alertMessage').text("请输入节点人！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.username.value) { $('.alertMessage').text("请输入账号！"); $('#my-alert').modal('open'); return; }
		if (!(/^[A-Za-z0-9]+$/.test(this.refs.username.value))) { $('.alertMessage').text("账号必须为数字和字母组合！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.name.value) { $('.alertMessage').text("请输入姓名！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.mobile.value) { $('.alertMessage').text("请输入手机号！"); $('#my-alert').modal('open'); return; }
		// if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.refs.mobile.value))){$('.alertMessage').text("请输入正确的手机号！");$('#my-alert').modal('open'); return;}
		// if (!this.refs.parentId.value) { $('.alertMessage').text("请输入推广人！"); $('#my-alert').modal('open'); return; }
		// if (!this.refs.contact.value) { $('.alertMessage').text("请输入安置人！"); $('#my-alert').modal('open'); return; }
		// if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.refs.mobile.value))) { $('.alertMessage').text("请输入正确的手机号！"); $('#my-alert').modal('open'); return; }
		// if (!this.refs.verification.value) { $('.alertMessage').text("请输入验证码！"); $('#my-alert').modal('open'); return; }
		// if (!this.refs.wechat.value) { $('.alertMessage').text("请输入微信号！"); $('#my-alert').modal('open'); return; }
		// if (!this.refs.alipay.value) { $('.alertMessage').text("请输入支付宝账户！"); $('#my-alert').modal('open'); return; }
		if (!this.state.value3) { $('.alertMessage').text("请选择类型！"); $('#my-alert').modal('open'); return; }
		if (!this.state.value2) { $('.alertMessage').text("请选择证件类型！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.Certificates.value) { $('.alertMessage').text("请输入证件号码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.password.value) { $('.alertMessage').text("请输入登录密码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.password2.value) { $('.alertMessage').text("请再次输入登录密码！"); $('#my-alert').modal('open'); return; }
		if (!(this.refs.password.value == this.refs.password2.value)) { $('.alertMessage').text("两次登录密码不符合"); $('#my-alert').modal('open'); return; }
		if (!this.refs.tranpwd.value) { $('.alertMessage').text("请输入交易密码！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.tranpwd2.value) { $('.alertMessage').text("请再次输入交易密码！"); $('#my-alert').modal('open'); return; }
		if (!(this.refs.tranpwd.value == this.refs.tranpwd2.value)) { $('.alertMessage').text("两次交易密码不符合"); $('#my-alert').modal('open'); return; }
		if (!this.state.value) { $('.alertMessage').text("请选择放置左区或右区！"); $('#my-alert').modal('open'); return; }
		// var contetx.alipay.value=="0";
		var parentUsername = this.refs.parentUsername.value;
		var username = this.refs.username.value;
		var name = this.refs.name.value;
		var mobile = this.refs.mobile.value;
		var shenfen = this.state.value2;

		var qiangzhi = this.state.value3;

		var shenfenCard = this.refs.Certificates.value;
		var password = this.refs.password.value;
		var tranpwd = this.refs.tranpwd.value;
		var jiedian = this.refs.jiedian.value;
		var wechat = this.refs.wechat.value;
		var alipay = this.refs.alipay.value;
		var qu = this.state.value;
		if (this.refs.wechat.value && this.refs.alipay.value) {
			var data = {
				parentUsername,
				username,
				name,
				mobile,
				shenfen,
				shenfenCard,
				password,
				tranpwd,
				jiedian,
				wechat,
				alipay,
				qu,
				qiangzhi
			}
		} else if (this.refs.wechat.value) {
			var data = {
				parentUsername,
				username,
				name,
				mobile,
				shenfen,
				shenfenCard,
				password,
				tranpwd,
				jiedian,
				wechat,
				qu,
				qiangzhi
			}
		} else if (this.refs.alipay.value) {
			var data = {
				parentUsername,
				username,
				name,
				mobile,
				shenfen,
				shenfenCard,
				password,
				tranpwd,
				jiedian,
				alipay,
				qu,
				qiangzhi
			}
		} else {
			var data = {
				parentUsername,
				username,
				name,
				mobile,
				shenfen,
				shenfenCard,
				password,
				tranpwd,
				jiedian,
				qu,
				qiangzhi
			}
		}

		const context = this;
		// //console.log("注册传参", data)
		createUser(data).then(function (result) {
			if (result.status) {
				context.refs.parentUsername.value = "";
				context.refs.username.value = "";
				context.refs.name.value = "";
				context.refs.mobile.value = "";
				context.refs.Certificates.value = "";
				// context.refs.verification.value = "";
				context.refs.password.value = "";
				context.refs.password2.value = "";
				context.refs.tranpwd.value = "";
				context.refs.tranpwd2.value = "";
				context.refs.jiedian.value = "";
				context.refs.wechat.value = "";
				context.refs.alipay.value = "";
			}
			pushUser({ gold: result.gold });
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
		changevolume(data) {
			this.setState({ username: data });
		}

	render() {
		const lang = auth.getLang();
		//接收参数
		const { location, sendData, user } = this.props;
		// //console.log(user, sendData);
		const { username = '' } = this.props.location.query;
		const disabled = username !== ''
		return (
			<div className="wrap">
				<style>{`
						html,body{
							background: url(/public/images/bg.png) no-repeat !important;
							background-size:100% 100%;
							position:relative;
							background-color:black;
						}
						.wrap{
							width: 100%;
							height: 100%;
							background: url(/public/images/4s6.png) no-repeat !important;
							background-color:black;
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
				
						.XG_content{
							margin-top:1rem; 
							width: 100%;
					    	// margin-bottom: 4rem;
							line-height: 2.5rem;
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
							padding-left: 1.5rem;
						}
						.XG_que input{
							text-align: center;
							background: #03A1BA;
							color: #fff;
							border-radius:5px;
							border:0;
							height:3.3rem;
							width:50%;
							margin:2rem 0;
						}
						.XG_que{
							text-align: center;
							color: #fff;
							margin: 0 auto;
							background:#000;
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
						.rader{
							// position:absolute;
							// left:50%;
							// margin-left:-58px;
							margin-top:2rem;
							text-align: center;
						}
						.rader input{
							background:none;
							margin:0 auto;
						}
						.int{
							line-height:1rem;
							margin:20px auto;
							display:table;
						}
						.cent{
							text-align:center;
							margin:1rem 0;
						}
					`}</style>	
				<div className="GR_top">
					<Link to="/tuandui"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.zhuce01}</span>
				</div>
				<div className="XG_content">
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3} defaultValue={username} disabled={disabled}>{lang.zhuce02}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="parentUsername" /></Col></Row>
					<Row className="list int" type="flex" align="middle" offset={3}>
						<RadioGroup onChange={this.onChange3} value={this.state.value3}>
							<Radio value={1}>{lang.zhuce04}</Radio>
							<Radio value={2}>{lang.zhuce05}</Radio>
						</RadioGroup>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce03}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="jiedian" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce06}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="username" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce07}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="name" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce08}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="mobile" /></Col></Row>
					<Row className="list int" type="flex" align="middle" offset={3}>
						<RadioGroup onChange={this.onChange2} value={this.state.value2}>
							<Radio value={1}>{lang.zhuce09}</Radio>
							<Radio value={2}>{lang.zhuce10}</Radio>
						</RadioGroup>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce11}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="Certificates" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce12}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="wechat" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce13}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="alipay" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce14}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="password" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce15}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="password2" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce16}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="tranpwd" /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}>{lang.zhuce17}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={18} offset={3}><input type="text" ref="tranpwd2" /></Col></Row>
					{/* <Row className="list cent" type="flex" align="middle"><Col span={24}>注册用户将扣除300开户积分</Col></Row> */}
					<div className="rader">
						<RadioGroup onChange={this.onChange} defaultValue="a">
							<RadioButton value="1">{lang.zhuce18}</RadioButton>
							<RadioButton value="2">{lang.zhuce19}</RadioButton>
						</RadioGroup>
					</div>
				</div>

				<div className="XG_que" onClick={this.onClickZhuce.bind(this)} >
					<input type="button" value={lang.zhuce20} />
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

Zhuce.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
		sendData: state.zhuce6
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userAct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Zhuce)



