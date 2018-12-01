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
class integralL extends Component {
	state = {
		list: [],
		pageSize: 20,
		page: 1,
		number: [],
		sum: 0,
		zongyeshu: 0,
		zongshouyi: [],
		today: "",
	}
	componentDidMount() {
		const { integralList } = this.props;
		const { user, refresh } = this.props;
		// console.log(user,"user")
		// //// console.log(user.lJifenSum[0])

		const context = this;
		integralList(this.state.page, this.state.pageSize, ).then(function (result) {
			console.log(result);
			// // console.log(result.resource);
			if (result.status) {
				context.setState({ zongshouyi: result.resource, zongyeshu: parseInt(result.sum / 20) + 1 });
				context.setState({ today: result.number[0] ? result.number[0].sum : 0 })
			}
		})
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	Last() {
		console.log(0);
		if (this.state.page > 1) { this.state.page--; } else { this.state.page = 1 };
		const { integralList } = this.props;
		const context = this;
		integralList(this.state.page, this.state.pageSize, ).then(function (result) {
			// // console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, number: result.number });
			}
		})
	}
	Next() {
		console.log(this.state.sum);

		if (this.state.sum <= 20) {
			this.state.page = 1;
		}
		else if (this.state.page >= this.state.zongyeshu) {
			this.state.page = this.state.zongyeshu;
		}
		else {
			this.state.page++;

		}
		const { integralList } = this.props;
		const context = this;
		integralList(this.state.page, this.state.pageSize, ).then(function (result) {
			// //// console.log(result);
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
		// // console.log(list,"list")
		const { number = [] } = this.state;
		// // console.log(number,"number")
		const { zongshouyi = [] } = this.state;
		const { user, refresh } = this.props;
		console.log(user.lJifenSum)
		// // console.log(zongshouyi,"zongshouyi")



		const context = this;
		// //// console.log(number)
		// //// console.log(number[0].sum)
		return (
			<div className="wrap">
				<style>
					{`
					ul, ol{
						paading-left:0;
					}
				html,body{
					background: url(/public/images/bg.png) no-repeat !important;
					background-size:100% 100%;
					position:relative;
				}
				ul{
					padding-left:0;
				}
				.wrap{
					width: 100%;
					height: 100%;
					
					    background-color: black;
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
				}
				.listHD{
					text-align:center;
					color:#03A1BA;
					white-space:nowrap;
					// line-height:3rem;
				}
				.listHeader{
					margin:1rem 0;
					font-size: 12px;
				}
				.ant-col-6{
					font-size:12px;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.integralL01}</span>
				</div>
				<div style={{ width: "100%", textAlign: "center", color: "#03A1BA" }}>今日收益总数:{this.state.today} <span style={{ marginLeft: "15px" }}> 历史总收益:{user.lJifenSum}</span> </div>
				<Row className="listHeader" type="flex" align="middle">
					<Col className="listHD" span={6} style={{ textAlign: "center" }}>
						{lang.integralL02}
					</Col>
					<Col className="listHD" span={6}>{lang.integralL03}</Col>
					<Col className="listHD" span={6} style={{ textAlign: "center" }}>时间</Col>
					<Col className="listHD" span={6} style={{ textAlign: "center" }}>产生人</Col>
				</Row>



				{
					zongshouyi ? zongshouyi.map(function (v, k) {
						var inde;
						if (v.type == 1) {
							inde = "推荐奖"
						} else if (v.type == 2) {
							inde = "对碰奖"
						} else if (v.type == 3) {
							inde = "管理奖"
						} else if (v.type == 4) {
							inde = "见点奖 "
						} else if (v.type == 5) {
							inde = "互助奖"
						} else if (v.type == 6) {
							inde = "服务中心奖"
						} else if (v.type == 7) {
							inde = "转为W积分"
						} else if (v.type == 8) {
							inde = "转为开户积分"
						} else if (v.type == 9) {
							inde = "转为激活积分"
						} else if (v.type == 10) {
							inde = "转为购物积分"
						}
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={6} style={{ textAlign: "center" }}>
												{lang.integralL02}{inde}
											</Col>
											<Col className="listHD" span={6}>{v.ljifen}</Col>
											<Col className="listHD" span={6} style={{ textAlign: "center" }}>{formtTime(v.createTime)}</Col>
											<Col className="listHD" span={6} style={{ textAlign: "center" }}>{v.type < 7 ? "账号" + v.downUser + "产生" : "转出"}</Col>
										</Row>
									</li>
								</ul>
							</div>
						);
					}) : ""
				}
				<div style={{ color: "#0e90d2", width: "100%", height: "30px", lineHeight: "30px", marginTop: "10px", marginBottom: "20px", fontSize: "16px" }}>
					<div style={{ width: "20%", float: "left", marginLeft: "30%" }} onClick={this.Last.bind(this)}>上一页 </div><div style={{ width: "20%", float: "right", marginRight: "30%" }} onClick={this.Next.bind(this)}>下一页 </div>
				</div>
			</div>
		)
	}
}

integralL.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(integralL)



