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
import { Select } from 'antd';
const Option = Select.Option;
import * as auth from '../actions/utils/auth';
// import styles from '../../css/code.css';
class ActivationListdetails extends Component {
	state = {
		vip: "1",
		dumiao: false,
		list: [],
		de: "",
	}
	onChange(value) {
		const { user } = this.props;
		// console.log(value);
		this.setState({ de: value, vip: value });
	}
	componentWillMount() {
		const { getType } = this.props;
		const context = this;
		getType().then(function (result) {
			// console.log(result);
			//console.log(result.resource[0].list);
			var list = result.resource[0].list
			var keyArr = Object.keys(list);
			var valueArr = Object.values(list);//1是有级别 0是没有级别
			var jibieArr = [];
			for (var i = 0; i < valueArr.length; i++) {
				if (valueArr[i] == 1) {
					jibieArr.push(keyArr[i]);
				}
			}
			//console.log(jibieArr);
			context.setState({
				list: jibieArr,
				de: jibieArr[0] == "one" ? "200" : jibieArr[0] == "two" ? "500" : jibieArr[0] == "three" ? "1000" : jibieArr[0] == "four" ? "2000" : "5000",
			});
		})

	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');

		
	}
	cl() {

	}
	onclickbtn() {
		const { jhUser, pushUser, user } = this.props;
		if (!this.refs.username.value) { $('.alertMessage').text("请输入待激活的账户!"); $('#my-alert').modal('open'); return; }
		if (!this.refs.tranpwd.value) { $('.alertMessage').text("请输入密码！"); $('#my-alert').modal('open'); return; }
		var data = {
			"username": this.refs.username.value,
			"jibie": Number(this.state.vip),
			"tranpwd": this.refs.tranpwd.value,
		}
		if(data.jibie==0){
			$('.alertMessage').text("您的操作有误，请重新操作");
			$('#my-alert').modal('open');
			return 
		}
		this.setState({ dumiao: true });
		const context = this;
		var suiji = parseInt(Math.random() * 500) + parseInt(Math.random() * 300);
		console.log(data)
		// return
		setTimeout(function () {
			jhUser(data).then(function (result) {
				console.log(result);
				context.setState({ dumiao: false });
				if (result.status) {
					context.refs.username.value = "";
					context.refs.tranpwd.value = "";
				}
				$('.alertMessage').text(result.message);
				$('#my-alert').modal('open');
			});
		}, suiji);

	}
	render() {
		const lang = auth.getLang();
		const { user } = this.props;
		const context = this;
		const { list } = this.state;
		//console.log(list);
		var num = 0;
		if (this.state.vip == 1) {
			num = user.baodanjibie.one.gold;
		} else if (this.state.vip == 2) {
			//console.log("2")
			num = user.baodanjibie.two.gold;
		} else if (this.state.vip == 3) {
			//console.log("3")
			num = user.baodanjibie.three.gold;
		} else if (this.state.vip == 4) {
			//console.log("4")
			num = user.baodanjibie.four.gold;
		} else {
			//console.log("5")
			num = user.baodanjibie.five.gold;
		}
		//console.log(context.state.de+"");
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
					top:60%;
					// margin-left:-62px;
					margin-left: 7%;
				}
				.bott{
					width:100%;
					// height:24rem;
					text-align:center;
				}
				.ant-select-selection--single .ant-select-selection__rendered{
					color#fff;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/Nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.ActivationListdetails01}</span>
				</div>
				<div className="code_imger">
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.ActivationListdetails02}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="text" ref="username" style={{ width: 160 }} /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.ActivationListdetails03}</Col></Row>
					<Row className="list" type="flex" align="middle">
						<Col span={20} offset={3}>
							<Select value={this.state.de + ""} style={{ width: 160, color: "#fff" }} onChange={this.onChange.bind(this)}>
								{
									list.map(function (v, k) {
										return (
											<Option value={v == "one" ? "1" : v == "two" ? "2" : v == "three" ? "3" : v == "four" ? "4" : "5"} key={k}>{v == "one" ? 200 : v == "two" ? 500 : v == "three" ? 1000 : v == "four" ? 2000 : 5000}</Option>
										);
									})
								}
							</Select>
						</Col>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.ActivationListdetails04}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="password" ref="tranpwd" style={{ width: 160 }} /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.ActivationListdetails05}{user.jhBili == 0 ? num : num * user.jhBili}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.ActivationListdetails06}{user.jhBili == 0 ? "0" : num - num * user.jhBili}</Col></Row>
				</div>

				<div className="bott"><button type="button" onClick={this.state.dumiao == true ? this.cl.bind(this) : this.onclickbtn.bind(this)}>{lang.ActivationListdetails07}</button></div>
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

ActivationListdetails.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivationListdetails)



