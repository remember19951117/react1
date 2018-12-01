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
class integralW extends Component {
	state = {
		list: [],
		pageSize: 20,
		page: 1,
		sum: 0,
		zongyeshu: 1,
	}
	componentDidMount() {
		const { integralWList } = this.props;
		const context = this;
		integralWList(this.state.page, this.state.pageSize).then(function (result) {
			// console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, sum: result.sum, zongyeshu: parseInt(result.sum / 20) + 1 })
			}
		})
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	Last() {
		//console.log(0);
		if (this.state.page > 1) { this.state.page--; } else { this.state.page = 1 };
		const { integralWList } = this.props;
		const context = this;
		integralWList(this.state.page, this.state.pageSize, ).then(function (result) {
			console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, number: result.number });
			}
		})
	}
	Next() {
		//console.log(1);
		if (this.state.sum <= 20) {
			this.state.page = 1;
		}
		else if (this.state.page >= this.state.zongyeshu) {
			this.state.page = this.state.zongyeshu;
		}
		else {
			this.state.page++;
		}
		const { integralWList } = this.props;
		const context = this;
		integralWList(this.state.page, this.state.pageSize, ).then(function (result) {
			console.log(result);
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
				}
				.listHD{
					text-align:center;
					color:#03A1BA;
					line-height:3rem;
				}
				ul{
					padding-left:0;
				}
				.listHD {font-size: 12px;}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.integralW01}</span>
				</div>

				{
					list.map(function (v, k) {
						var inde;
						if (v.type == 1) {
							inde = "转入"
						} else if (v.type == 2) {
							inde = "转出"
						}
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={4}>{lang.integralW02}{inde}</Col>
											<Col className="listHD" span={4}>{lang.integralW03}{v.number}</Col>
											<Col className="listHD" span={8} style={{ textAlign: "center" }}>{formtTime(v.createTime)}</Col>
											<Col className="listHD" span={8} style={{ textAlign: "center" }}>{v.note}</Col>
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

integralW.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(integralW)



