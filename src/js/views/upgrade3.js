/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import * as Settings from '../settings';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
const Option = Select.Option;
import * as auth from '../actions/utils/auth';
// import styles from '../../css/code.css';
class upgrade3 extends Component {

	state = {
		vip: "1",
		info: []
	}
	onChange(value) {
		const { user } = this.props;
		// //console.log(value)
		this.setState({ vip: value });
	}

	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	//提交升级
	onclickbtn() {
		const { jhUser, pushUser, user, userUpgrade3 } = this.props;
		if (this.state.vip == 0) { $('.alertMessage').text("请先完成以上操作!"); $('#my-alert').modal('open'); return; }
		if (!this.refs.username.value) { $('.alertMessage').text("请输入需要升级的账户!"); $('#my-alert').modal('open'); return; }
		if (!this.refs.tranpwd.value) { $('.alertMessage').text("请输入密码！"); $('#my-alert').modal('open'); return; }
		var data = {
			"username": this.refs.username.value,
			"jibie": Number(this.state.vip),
			"tranpwd": this.refs.tranpwd.value,
		}
		const context = this;
		// console.log(data)
		if(data.jibie==0){
			$('.alertMessage').text("您的操作有误，请重新操作");
			$('#my-alert').modal('open');
			return 
		}
		userUpgrade3(data).then(function (result) {
			// //console.log("传参", data)
			if (result.status) {
				context.refs.username.value = "";
				context.refs.tranpwd.value = "";
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
	//查询账户
	querybtn() {
		if (!this.refs.username.value) { $('.alertMessage').text("请输入需要升级的账户!"); $('#my-alert').modal('open'); return; }
		const { user, querybtns } = this.props;
		const username = this.refs.username.value;
		const context = this;
		querybtns(username).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ info: result.resource })
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		})
	}
	render() {
		const lang = auth.getLang();
		const { info = [] } = this.state;
		// //console.log(info)
		// //console.log(info.registerJibie)
		const { user } = this.props;
		const context = this;
		var num = 0;
		if (this.state.vip == 1) {
			num = user.baodanjibie.one.gold;
		} else if (this.state.vip == 2) {
			num = user.baodanjibie.two.gold;
		} else if (this.state.vip == 3) {
			num = user.baodanjibie.three.gold;
		} else if (this.state.vip == 4) {
			num = user.baodanjibie.four.gold;
		} else {
			num = user.baodanjibie.five.gold;
		}

		return (
			<div className="wrap">
				<style>
					{`
				html,body{
					background-size:100% 100%;
					background: url(/public/images/bg.png) no-repeat;
					height:100%
				}
				.wrap{
					width:100%;
					background: url(/public/images/bg.png) no-repeat;
					background-size:100% 100%;
					position:relative;
					height: 100vh;
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
				.code_imger{
					display:block;
					color:#03A1BA;
					text-align:center;
				}
				.code_imger input{
					text-indent:1.5rem;
				}
				.ant-select-selection{
					background:none;
					border:1px solid #03A1BA;
				}
				.list{
					margin:1rem auto;
				}
				.list input{
					background:url(/public/images/4s6.png);
					border:1px solid #03A1BA;
					border-radius:5px;
					color:#03A1BA;
					outline:none;
				}
				button{
					background:url(/public/images/4s6.png);
					color:#fff;
					outline:none;
					border:0;
					background:#03A1BA;
					border-radius:7px;
					width:150px;
					height:3rem;
					// position:absolute;
					// top:60%;
					// margin-left:-62px;
					margin-left: 10%;
				
				}
				.bott{
					width:100%;
					// height:24rem;
					text-align:center;
					
				}
				.ant-select-selection--single .ant-select-selection__rendered{
					color#fff;
				}
				.query{
					display:block;
					width:6rem;
					height:2rem;
					line-height:2rem;
					background:#03A1BA;
					margin:0 auto;
					color:#ffffff;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/Nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.Upgrade301}</span>
				</div>
				<div className="code_imger">
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.Upgrade302}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="text" ref="username" style={{ width: 160 }} /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><span type="button" className="query" onClick={this.querybtn.bind(this)}>{lang.Upgrade303}</span></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.Upgrade304}</Col></Row>
					<Row className="list" type="flex" align="middle">
						<Col span={20} offset={3}>
							{info.registerJibie ?
								<Select defaultValue="点击选择" style={{ width: 160, color: "#fff" }} onChange={this.onChange.bind(this)}>
									{info.registerJibie <= 200 ? (<Option value="1" >{user.baodanjibie.one.gold}</Option>) : (<Option value="1" disabled="disabled" >{user.baodanjibie.one.gold}</Option>)}
									{info.registerJibie <= 500 ? (<Option value="2" >{user.baodanjibie.two.gold}</Option>) : (<Option value="2" disabled="disabled" >{user.baodanjibie.two.gold}</Option>)}
									{info.registerJibie <= 1000 ? (<Option value="3" >{user.baodanjibie.three.gold}</Option>) : (<Option value="3" disabled="disabled" >{user.baodanjibie.three.gold}</Option>)}
									{info.registerJibie <= 2000 ? (<Option value="4" >{user.baodanjibie.four.gold}</Option>) : (<Option value="4" disabled="disabled" >{user.baodanjibie.four.gold}</Option>)}
									{info.registerJibie <= 5000 ? (<Option value="5" >{user.baodanjibie.five.gold}</Option>) : (<Option value="5" disabled="disabled" >{user.baodanjibie.five.gold}</Option>)}


									{/* <Option value="1">{info.registerJibie ? info.registerJibie <= 200 ? user.baodanjibie.one.gold : "" : ""}</Option>
									<Option value="2">{info.registerJibie ? info.registerJibie <= 500 ? user.baodanjibie.two.gold : "" : ""}</Option>
									<Option value="3">{info.registerJibie ? info.registerJibie <= 1000 ? user.baodanjibie.three.gold : "" : ""}</Option>
									<Option value="4">{info.registerJibie ? info.registerJibie <= 2000 ? user.baodanjibie.four.gold : "" : ""}</Option>
									<Option value="5">{info.registerJibie ? info.registerJibie <= 5000 ? user.baodanjibie.five.gold : "" : ""}</Option> */}
								</Select> : ""
							}
						</Col>
					</Row>

					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.Upgrade305}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="password" ref="tranpwd" style={{ width: 160 }} /></Col></Row>


					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.Upgrade306}
						{info.registerJibie ? user.jhBili == 0 ?  (num).toFixed(0) : (num * user.jhBili).toFixed(0) : ""}
						{/* {info.registerJibie ? user.jhBili == 0 ? (num).toFixed(0) : (num * user.jhBili - info.registerJibie * user.jhBili).toFixed(0) : ""} */}
					</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.Upgrade307}
						{/* {info.registerJibie ? user.jhBili == 0 ? "0" : (num - num * user.jhBili - info.registerJibie * (1 - user.jhBili)).toFixed(0) : ""} */}
						{info.registerJibie ? user.jhBili == 0 ? "0" : (num * (1 - user.jhBili)).toFixed(0) : ""}
					</Col></Row>
				</div>

				<div className="bott"><button type="button" className="but" onClick={this.onclickbtn.bind(this)}>{lang.Upgrade308}</button></div>
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

upgrade3.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
		userAct: state.userAct,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userAct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(upgrade3)



