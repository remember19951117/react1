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
//import { Select } from 'antdSelect';
import Radio from 'antd/lib/radio';
import * as auth from '../actions/utils/auth';
const RadioGroup = Radio.Group;
//const Option = Select.Option;
// import styles from '../../css/code.css';
class integralconversion extends Component {
	state = {
		value: 0,
		value2: 0,
		value3: 0,
		input1_vvlue:"",

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
	onChange2 = (e) => {
		// //console.log('radio checked', e.target.value);
		this.setState({
			value2: e.target.value,
		});
	}
	onclickvalue(e) {
		// //console.log("123123")
		const { exchange, pushUser, user } = this.props;
		if (this.state.value == 0) { $('.alertMessage').text("请选择转出的积分"); $('#my-alert').modal('open'); return; }
		if (this.state.value2 == 0) { $('.alertMessage').text("请选择转入的积分"); $('#my-alert').modal('open'); return; }
		if(this.refs.number.value<10){
			$('.alertMessage').text("积分必须大于10"); $('#my-alert').modal('open'); return;
		
		}
		if (!this.refs.number.value) { $('.alertMessage').text("请输入数量！"); $('#my-alert').modal('open'); return; }
		if (!(/^[0-9]*$/.test(this.refs.number.value))) { $('.alertMessage').text("请输入正确的数量！"); $('#my-alert').modal('open'); return; }
		// if(this.refs.number.value%100){$('.alertMessage').text("数量必须为100的倍数！");$('#my-alert').modal('open'); return;}
		if (!this.refs.tranpwd.value) { $('.alertMessage').text("请输入密码！"); $('#my-alert').modal('open'); return; }
		var data = {
			"zhuanchu": this.state.value,
			"zhuanru": this.state.value2,
			"number": this.refs.number.value,
			"tranpwd": this.refs.tranpwd.value,
		}
		const context = this;
		exchange(data).then(function (result) {
			//console.log("data", data)
			if (result.status) {
				context.state.value = 0;
				context.state.value2 = 0;
				context.refs.number.value = "";
				context.refs.tranpwd.value = "";
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
	handelChange(event){
		this.setState({
			input1_vvlue:this.refs.number.value
		})
	}

	input_blur(){
	
	}
	inputOnFocus(){
// 聚焦输入数量  暂时不需要
	}

	onclickvalue2(e) {
		// //console.log("123123")
		const { exchange2, pushUser, user } = this.props;
		if (this.state.value == 0) { $('.alertMessage').text("请选择转出的积分"); $('#my-alert').modal('open'); return; }
		if (this.state.value2 == 0) { $('.alertMessage').text("请选择转入的积分"); $('#my-alert').modal('open'); return; }
		if (!this.refs.number.value) { $('.alertMessage').text("请输入数量！"); $('#my-alert').modal('open'); return; }
		if (!(/^[0-9]*$/.test(this.refs.number.value))) { $('.alertMessage').text("请输入正确的数量！"); $('#my-alert').modal('open'); return; }
		// if(this.refs.number.value%100){$('.alertMessage').text("数量必须为100的倍数！");$('#my-alert').modal('open'); return;}
		if (!this.refs.tranpwd.value) { $('.alertMessage').text("请输入密码！"); $('#my-alert').modal('open'); return; }
		var data = {
			// "zhuanchu": this.state.value,
			// "zhuanru": this.state.value2,
			"number": this.refs.number.value,
			"tranpwd": this.refs.tranpwd.value,
		}
		const context = this;
		exchange2(data).then(function (result) {
			// //console.log("data", data)
			if (result.status) {
				context.state.value = 0;
				context.state.value2 = 0;
				context.refs.number.value = "";
				context.refs.tranpwd.value = "";
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
	render() {
		const lang = auth.getLang();
		// //console.log(this.state.value)
		// //console.log(this.state.value2)
		// //console.log(this.state.value3)
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
					// color: #ff0000;
					background: url(/public/images/bg.png) no-repeat;
					background-size:100% 100%;
					position:relative;
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
					text-indent:1.5rem;
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
					position:absolute;
					top:65%;
					margin-left:-62px;
				}
				.bott{
					width:100%;
					height:24rem;
					text-align:center;
				}
				.ant-select-selection--single .ant-select-selection__rendered{
					color#fff;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.integralconversion01}</span>
				</div>
				<div className="code_imger">
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.integralconversion02}</Col></Row>
					<Row className="list" type="flex" align="middle">
						<Col span={20} offset={3}>
							<RadioGroup onChange={this.onChange} value={this.state.value}>
								<Radio value={1}>{lang.integralconversion03}</Radio>
								<Radio value={2}>{lang.integralconversion04}</Radio>
								<Radio value={3}>{lang.integralconversion05}</Radio>
							</RadioGroup>
						</Col>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.integralconversion06}</Col></Row>
					<Row className="list" type="flex" align="middle">
						<Col span={23} offset={1}>

							{this.state.value == 1 ? (<RadioGroup onChange={this.onChange2} value2={this.state.value}>
								<Radio value={2}>{lang.integralconversion07}</Radio>
								{/* <Radio value={3}>激活积分</Radio> */}
								<Radio value={4}>{lang.integralconversion08}</Radio>
							</RadioGroup>) : ("")}

							{this.state.value == 2 ? (<RadioGroup onChange={this.onChange2} value2={this.state.value}>
								<Radio value={1}>{lang.integralconversion03}</Radio>
								<Radio value={2}>{lang.integralconversion07}</Radio>
								{/* <Radio value={3}>激活积分</Radio> */}
								<Radio value={4}>{lang.integralconversion08}</Radio>
							</RadioGroup>) : ("")}

							{this.state.value == 3 ? (<RadioGroup onChange={this.onChange2} value2={this.state.value}>
								<Radio value={5}>{lang.integralconversion03}</Radio>
							</RadioGroup>) : ("")}
						</Col>
					</Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.integralconversion09}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="text" onBlur={this.input_blur.bind(this)} 	onChange={this.handelChange.bind(this)}  value={this.state.input1_vvlue} onFocus={this.inputOnFocus.bind(this) } ref="number" style={{ width: 160 }} /></Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}>{lang.integralconversion10}</Col></Row>
					<Row className="list" type="flex" align="middle"><Col span={20} offset={3}><input type="password" ref="tranpwd" style={{ width: 160 }} /></Col></Row>
				</div>
				{this.state.value == 3 ? (<div className="bott"><button type="button" onClick={this.onclickvalue2.bind(this)}>{lang.integralconversion11}</button></div>) : (<div className="bott"><button type="button" onClick={this.onclickvalue.bind(this)}>{lang.integralconversion11}</button></div>)}

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

integralconversion.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(integralconversion)



