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
import * as auth from '../actions/utils/auth';
// import styles from '../../css/code.css';
class integralopen extends Component {
	state = {
		list: [],
		pageSize: 20,
		page: 1,
		sum: 0,
		zongyeshu: 0,
	}
	componentDidMount() {
		const { gouwulist } = this.props;
		const context = this;
		gouwulist(this.state.page, this.state.pageSize).then(function (result) {
			// console.log(result);
			if (result.status) {
				for (var i = 0; i < result.resource.length; i++) {//商城消费
					result.resource[i].ssss = 1;
				}
				for (var j = 0; j < result.data1.length; j++) {//L积分
					result.data1[j].ssss = 2;
				}
				context.setState({ list: result.resource.concat(result.data1), sum: result.sum1, zongyeshu: parseInt(result.sum1 / 20) + 1 })
			}
		})
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	Last() {
		// console.log(0);

		if (this.state.page > 1) { this.state.page--; } else { this.state.page = 1 };
		const { gouwulist } = this.props;
		const context = this;
		gouwulist(this.state.page, this.state.pageSize, ).then(function (result) {
			// console.log(result);
			if (result.status) {
				context.setState({ list: result.data1, number: result.number });
			}
		})
	}
	// 下一页
	Next() {
		// console.log(1);
		if (this.state.sum <= 20) {
			this.state.page = 1;
			// console.log(this.state.sum,	this.state.page,"shsihsshi")
		}
		else if (this.state.page >= this.state.zongyeshu) {
			this.state.page = this.state.zongyeshu;
		}
		else {
			this.state.page++;
			// console.log("jinlai")
		}
		// console.log( this.state.zongyeshu,"zongyeshi")
		const { gouwulist } = this.props;
		const context = this;
		// console.log(this.state.page, this.state.pageSize,"chuanqudecanshu")
		gouwulist(this.state.page, this.state.pageSize, ).then(function (result) {
			// console.log(result);
			if (result.status) {
				context.setState({ list: result.data1, number: result.number });
			}
		})
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return (d.getMonth() + 1) + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分";
		}
		const { list = [] } = this.state;
		// //// console.log(list);
		const context = this;
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
				.GR_context{
					color:#03A1BA;
				}
				.GR_context ul li{
					border-bottom:1px solid #03A1BA;
					line-height:2rem;
					padding:10px;
				}
				ul{
					padding-left:0;
				}
				.ant-col-6 {font-size: 12px;}
				.listHD{
						font-size:12px;
					}
			`}

				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.integralopen01}</span>
				</div>

				{
					list.map(function (v, k) {
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={8}>类型:{v.ssss == 1 ? "商城消费" : "转换L积分"}</Col>
											<Col className="listHD" span={8}>消费积分:{v.ssss == 1 ? " -" + v.sum : "+" + v.gw}</Col>
											<Col className="listHD" span={8}>{formtTime(v.createTime)}</Col>
										</Row>
									</li>
								</ul>
							</div>
						);
					})
				}
				{/*分页*/}
				<div style={{ color: "#0e90d2", width: "100%", height: "30px", lineHeight: "30px", marginTop: "10px", marginBottom: "20px", fontSize: "16px" }}>
					<div style={{ width: "20%", float: "left", marginLeft: "30%" }} onClick={this.Last.bind(this)}>上一页 </div><div style={{ width: "20%", float: "right", marginRight: "30%" }} onClick={this.Next.bind(this)}>下一页 </div>
				</div>
			</div>
		)
	}
}

integralopen.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(integralopen)



