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
class WLsell extends Component {
	state = {
		list: [],
		pageSize: 20,
		page: 1,
		sum: 0,
		zongyeshu: 0,
	}
	componentDidMount() {
		const { getWLsell } = this.props;
		const context = this;
		getWLsell(this.state.page, this.state.pageSize).then(function (result) {
			console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, WLsell: result.WLsell })

			}
		})
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	Last() {
		// //console.log(0);
		if (this.state.page > 1) { this.state.page--; } else { this.state.page = 1 };
		const { getWLsell } = this.props;
		const context = this;
		getWLsell(this.state.page, this.state.pageSize, ).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, number: result.number });
			}
		})
	}
	Next() {
		// //console.log(1);
		if (this.state.sum <= 20) {
			this.state.page = 1;
		}
		else if (this.state.page >= this.state.zongyeshu) {
			this.state.page = this.state.zongyeshu;
		}
		else {
			this.state.page++;
		}
		const { getWLsell } = this.props;
		const context = this;
		getWLsell(this.state.page, this.state.pageSize, ).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, number: result.number });
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
				.ant-row-flex {font-size: 12px;text-align:center}
			`}
				</style>

				<div className="GR_top">
					<Link to="/Nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.nav181}</span>
				</div>
				<div className="GR_context" style={{ textAlign: "center" }} >

					积分总收益：{this.state.WLsell ? this.state.WLsell : "0"}
				</div>

				{
					list.map(function (v, k) {
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={4}>单价:{v.danjia.toFixed(2)}</Col>
											<Col className="listHD" span={4}>股数:{v.gufenNumber}</Col>
											<Col className="listHD" span={8}>收益W积分:{v.jifenNuber}</Col>
											<Col className="listHD" span={8} style={{ textAlign: "center" }}>{formtTime(v.createTime)}</Col>
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

WLsell.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(WLsell)