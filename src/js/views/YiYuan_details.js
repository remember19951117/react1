import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
//import * as Settings from '../settings';
//import Row from 'antd/lib/row';
//import Col from 'antd/lib/col';
import { APIHost } from '../actions/utils/fetch';
import Modal from 'antd/lib/modal';
//import Button from 'antd/lib/button';
import * as auth from '../actions/utils/auth';

class YiYuan_details extends Component {
	state = { visible: false }
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	constructor(props) {
		super(props);
		this.state = { info: {} };
	}

	handleOk = (e) => {
		// //console.log(e);
		this.setState({
			visible: false,
		});
	}
	handleCancel = (e) => {
		// //console.log(e);
		this.setState({
			visible: false,
		});
	}
	componentWillMount() {
		const { detailslist } = this.props;
		const id = this.props.params.id;
		const context = this;
		detailslist(id).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ info: result.resource })
			}
		})
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');

	}

	addGoodsNumber(context) {
		var number = parseInt(this.refs.goodsNumber.value);
		number = number + 1;
		// //console.log(number)
		this.refs.goodsNumber.value = (number);
		// // //console.log(this.refs.goodsNumber.value);
	}
	//减法
	subGoodsNumber(context) {
		var number = parseInt(this.refs.goodsNumber.value);
		if (number - 1 <= 1) {
			number = 1;
		} else {
			number = number - 1;
		}
		this.refs.goodsNumber.value = number;
		// // //console.log(this.refs.goodsNumber.value);
	}
	//点击购买
	SuccessList() {
		const { SuccessList } = this.props;
		const { user } = this.props;
		const id = this.props.params.id;
		const context = this;
		if (this.refs.goodsNumber.value == 0) { $('.alertMessage').text("请选择购买数量！"); $('#my-alert').modal('open'); return; }
		var data = {
			"productId": id,
			"number": parseInt(this.refs.goodsNumber.value),
		}
		// //console.log(data);
		SuccessList(data).then(function (result) {
			// //console.log(result);
			if (result.status) {
				// pushUser(data);
			}
			context.refs.goodsNumber.value = 0;
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		})
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list = [] } = this.state;
		const { info = [] } = this.state;

		const context = this;
		// const number = info.number ? info.number : 0;
		return (
			<div className="big" >
				<style>
					{`	
					html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
							margin: 0;
							padding: 0;	
						}
					body{
							height:auto;
							background:#ebebeb;	
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
						.top_img{
							{/*position:absolute;*/}
							width:100%;
							height:25rem;
							overflow:hidden;
						}
						.top_img img{
							width:100%;
							height:100%;
						}
						.tit{
							width:100%;
							padding:0.5rem 1rem;
							color:#464545;
						}
						.tit p{
							display:block;
							font-size:1rem;
							font-weight:bold;
						}
						.progress{
							width:100%;
							padding:0.3rem 1rem;
						}
						.total{
							width:50%;
							height:7rem;
							margin:0.5rem 0;
							padding:0 0.5rem;
							line-height:1.5rem;
							font-size:0.8rem;
							color:#5F5F5F;
							float:left;
						}
						.total_left{
							height:1.5rem;
							padding:0 0.5rem;
						}
						.total_right{
							width:50%;
							height:1.5rem;
							float:right;
						}
						.cannum{
							width:100%;
							height:1rem;
							margin:0.3rem 0;
							padding:0 0.5rem;
							font-size:0.8rem;
							color:#5F5F5F;
						}
						.cannum p{
							font-size:0.8rem;
						}
						.number{
							width:100%;
							height:2rem;
							margin:0.3rem 0;
							padding:0 0.5rem;
							font-size:0.8rem;	
							color:#5F5F5F;
							line-height:2rem;
						}
						.btn{
							width:90%;
							margin:0 auto;
							height:3rem;
							background:#104EBB;
							text-align:center;
							font-size:1.5rem;
							line-height:3rem;
							{/*position:absolute;*/}
							bottom:0;
							color:#fff;
						}
						.totalright{
							float:right;
							height:7rem;
							float:40%;
							padding:3rem 0;
							margin-right:2rem;
						}
						.clear{ clear:both}
						.sub{
							float:left;
							width:2rem;
							font-size:2rem;
							line-height:1rem;
						}
						.num{
							float:left;
							width:3rem;
							text-align:center;
						}
						.add{
							float:left;
							font-size:2rem;
							line-height:1rem;
						}
						
					`}
				</style>

				<div className="GR_top">
					<Link to="/YiYuanGou"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.yiYuan_details01}</span>
				</div>
				<div className="top_img"><img src={APIHost + info.img} /></div>
				<div className="tit"><p>{info.describe}</p></div>
				<div className="total">
					<div className="total_left"><p><span style={{ color: 'red' }}>{info.name}</span></p></div>
					<div className="cannum"><p>{info.outline}{lang.yiYuan_details02}</p></div>
					<div className="number"><p>{lang.yiYuan_details03}<span style={{ color: 'red' }}>{info.goldValue}</span></p></div>
				</div>
				<div className="totalright">
					<span onClick={this.subGoodsNumber.bind(this, context)} className="sub" style={{ padding: '0 5px' }}>-</span>
					<input type="text" className="num" style={{ padding: 0 }} ref="goodsNumber" defaultValue={0} disabled="disabled" />
					<span onClick={this.addGoodsNumber.bind(this, context)} className="add" style={{ padding: '0 5px' }}>+</span>
				</div>
				<div className="clear"></div>
				{/* <div className="btn" onClick={this.showModal}>立即购买</div> */}
				<div className="btn" onClick={this.SuccessList.bind(this)}>{lang.yiYuan_details04}</div>

				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">{lang.home09}</div>
						<div className="am-modal-bd alertMessage"></div>
						<div className="am-modal-footer">
							<span className="am-modal-btn">{lang.home10}</span>
						</div>
					</div>
				</div>
				{/* <Button type="primary" onClick={this.showModal}>Open</Button> */}
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
			</div>
		)
	}
}

YiYuan_details.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(YiYuan_details)



