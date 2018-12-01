/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
var HmacMD5 = require("crypto-js/hmac-md5");
import Select from 'antd/lib/select';
const Option = Select.Option;

class Upgrade extends Component {

	state = {
		vip: "1"
	}

	componentDidMount() {
		const { user } = this.props;
		// //console.log(user);
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		if(user.register == 5){
			this.setState({ vip: user.register });
			return;
		}
		var money = this.jisuan(user.register, user.register + 1 + "");
		this.refs.money.value = money + "";
		this.setState({ vip: user.register + 1 + "" });
	}


	jisuan(register, value) {
		var money = 0
		var newMoney = 0
		switch (register) {
			case 1:
				money = 200;
				break;
			case 2:
				money = 500;
				break;
			case 3:
				money = 1000;
				break;
			case 4:
				money = 2000;
				break;
			case 5:
				money = 5000;
				break;
		}
		switch (value) {
			case "2":
				newMoney = 500;
				break;
			case "3":
				newMoney = 1000;
				break;
			case "4":
				newMoney = 2000;
				break;
			case "5":
				newMoney = 5000;
				break;
		}
		return newMoney - money;
	}

	onChange(value) {
		const { user } = this.props;
		var money = this.jisuan(user.register, value);
		this.refs.money.value = money + "";
		this.setState({ vip: value });
	}

	editUser() {
		const { userUpgrade, pushUser, user } = this.props;

		if (!this.refs.secondpwd.value) { $('.alertMessage').text("请输入二级密码！"); $('#my-alert').modal('open'); return; }

		var newGold = Number(this.refs.money.value);

		if (user.gold < newGold) { $('.alertMessage').text("您的余额不足，升级失败！"); $('#my-alert').modal('open'); return; }

		var data = {
			username: newGold,
			jibie: newGold,
			tranpwd: this.refs.secondpwd.value,
			// register: Number(this.state.vip)
		}
		const context = this;
		userUpgrade(data).then(function (result) {
			if (result.status) {
				context.refs.secondpwd.value = "";
				pushUser({ gold: user.gold - newGold, register: data.register })
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}

	onChengeTab(value) {
		this.setState({ onchange: value })
		this.refs.oldPwd.value = ""
		this.refs.password.value = ""
		this.refs.towPassword.value = ""
	}

	render() {
		const { user } = this.props;
		return (
			<div className="wrap">
				<style>
					{`
						html,body{
							background: #000;
						}
						.wrap{
							width: 100%;
							height: 100%;
							
						}
						.GR_top{
							text-align: center;
							color: #03A1BA;
							height: 2.5rem;
							line-height: 2.5rem;
							font-size: 1rem;
							background: #000;
							border-bottom:1px solid #00C8D0;
						}
						.GR_out{
							float: left;
							color: #03A1BA;
							margin-left: 1rem;
						}
						.GR_zc{
							width:4rem;
							position: absolute;
							left: 50%;
							margin-left:-2rem;
						}
			            .XG_header{
			                width: 100%;
			                height: 2.5rem;
			                line-height: 2.5rem;
			            }
			            .XG_header span{
							display: block;
			                width: 50%;
			                color: #ffffff;
			                background: #336BA4;
							float: left;
							text-align: center;
			            }
						.XG_content{
							background: url(/public/images/bg.png) no-repeat;
							background-size:100% 100%;
							position:relative;
						}
						.XG_content ul{
							margin-top:1rem; 
						}
						.XG_content ul li{
							width: 100%;
							height: 2.5rem;
							
					    	margin-bottom: 2rem;
							line-height: 2.5rem;
							font-size: 1rem;
						}
						.XG_content ul li span{
							float: left;
							padding-left: 1rem;
							color: #666;
					
						}
						.XG_content ul li input{
							float: right;
							width: 12rem;
							height:2rem;
							margin-right: 1rem;
							outline: none;
							// background: #000;
							border:1px solid 03A1BA;
							padding-left:0.5rem;
						}

						.select{
							float: right;
							width: 12rem;
							margin-right: 1rem;
							outline: none;
							// background: #fff;
						}

						.ant-select-selection--single {
							// background:#000;
							border-radius:0px;
							border:1px solid 03A1BA;
							// color:#03A1BA;
    					}

						.XG_btn{
							text-align: center;
							margin-top: 1rem;
						}
						.XG_btn input{
							text-align: center;
							width: 58%;
							height: 2.5rem;
							background: #3778ED;
							color: #fff;
							border:0;
						}
						body{
							background:#000;
						}
					`}
				</style>

				<div className="GR_top">
					<Link to="nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">账户升级</span>
				</div>
				<div className="XG_content">
					<ul>
						<li><span>VIP等级</span>
							<Select className="select" defaultValue={user.register + 1 + ""} onChange={this.onChange.bind(this)}>
								{/* {user.level < 2 ? (<Option value="2">VIP2</Option>) : (<Option value="2" disabled>VIP2</Option>)}
								{user.level < 3 ? (<Option value="3">VIP3</Option>) : (<Option value="3" disabled>VIP3</Option>)}
								{user.level < 4 ? (<Option value="4">VIP4</Option>) : (<Option value="4" disabled>VIP4</Option>)}
								{user.level < 5 ? (<Option value="5">VIP5</Option>) : (<Option value="5" disabled>VIP5</Option>)}
								{user.level < 6 ? (<Option value="6">VIP6</Option>) : (<Option value="6" disabled>VIP6</Option>)}
								{user.level < 7 ? (<Option value="7">VIP7</Option>) : (<Option value="7" disabled>VIP7</Option>)}
								{user.level < 8 ? (<Option value="8">VIP8</Option>) : (<Option value="8" disabled>VIP8</Option>)}
								{user.level < 9 ? (<Option value="9">VIP9</Option>) : (<Option value="9" disabled>VIP9</Option>)}
								{user.level < 10 ? (<Option value="10">VIP10</Option>) : (<Option value="10" disabled>VIP10</Option>)}
								{user.level < 11 ? (<Option value="11">VIP11</Option>) : (<Option value="11" disabled>VIP11</Option>)}
								{user.level < 12 ? (<Option value="12">VIP12</Option>) : (<Option value="12" disabled>VIP12</Option>)} */}
								{/* <Option value="1">200</Option>
								<Option value="2">500</Option>
								<Option value="3">1000</Option>
								<Option value="4">2000</Option>
								<Option value="5">5000</Option> */}
								{user.register < 2 ? (<Option value="2">500</Option>) : (<Option value="2" disabled>500</Option>)}
								{user.register < 3 ? (<Option value="3">1000</Option>) : (<Option value="3" disabled>1000</Option>)}
								{user.register < 4 ? (<Option value="4">2000</Option>) : (<Option value="4" disabled>2000</Option>)}
								{user.register < 5 ? (<Option value="5">5000</Option>) : (<Option value="5" disabled>5000</Option>)}
							</Select>
						</li>
						<li><span>升级金额：</span><input type="text" ref="money" disabled="disabled" /></li>
						<li><span>二级密码：</span><input type="password" ref="secondpwd" /></li>
					</ul>
					<div className="XG_btn" onClick={this.editUser.bind(this)}><input type="button" value="确认升级" /></div>
				</div>

				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">温馨提示</div>
						<div className="am-modal-bd alertMessage">
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn"><Link to = "/upgrade">确定</Link></span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Upgrade.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Upgrade)



