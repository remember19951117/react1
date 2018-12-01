/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import * as auth from '../actions/utils/auth';
// import styles from '../../css/code.css';
class baodanmingxi extends Component {
	state = {
		list: [],
		pageSize: 20,
		page: 1,
		number: [],
		sum: 0,
		zongyeshu: 0,
		today: 0,
	}
	componentDidMount() {
		const { baodanmingxi } = this.props;
		const context = this;
		baodanmingxi(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, sum: result.sum, zongyeshu: parseInt(result.sum / 20) + 1 })
				context.setState({today:result.number[0]?result.number[0].sum:"0"})
			}
		})
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	// 上一页
	Last() {
		//console.log(0);
		if (this.state.page > 1) { this.state.page--; } else { this.state.page = 1 };
		const { baodanmingxi } = this.props;
		const context = this;
		baodanmingxi(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource, number: result.number });
			}
		})
	}
	// 下一页
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
		const { baodanmingxi } = this.props;
		const context = this;
		baodanmingxi(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
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
		const { user, refresh } = this.props;
		// console.log(user.lJifenSum)
		const context = this;
		return (
			<div className="wrap" style={{ backgroundColor: "#000" }}>
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
					// line-height:3rem;
					font-size:12px;
					width: 19.666667%;
					// white-space:nowrap;
					
				}
				.listHeader{
					margin:1rem 0;
				}
				ul, ol {
					padding-left: 0em;
				}
				.content_main{
					height:50%;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.nav221}</span>
				</div>
				<Row className="listHeader" type="flex" align="middle">
												<Col className="listHD" span={4}>{lang.baodan01}</Col>
												<Col className="listHD" span={4}>{lang.baodan02}</Col>
												<Col className="listHD" span={6}>{lang.baodan04}</Col>
												<Col className="listHD" span={4} style={{ textAlign: "center" }}>{lang.baodan03}</Col>
												<Col className="listHD" span={6} style={{ textAlign: "center" }}>时间</Col>
											</Row>
			
				<div className="content_main">
					{
						list.map(function (v, k) {

							return (
								<div className="GR_context" key={k}>
									<ul>
										<li>
											<Row className="listHeader" type="flex" align="middle">
												<Col className="listHD" span={4}> {v.fwLjifen}</Col>
												<Col className="listHD" span={4}>{v.fwGouWu}</Col>
												<Col className="listHD" span={6}>{v.dengji}</Col>
												<Col className="listHD" span={4} style={{ textAlign: "center" }}>{v.jhUser}</Col>
												<Col className="listHD" span={6} style={{ textAlign: "center" }}>{formtTime(v.createTime)}</Col>
											</Row>
										</li>
									</ul>
								</div>
							);
						})
					}
				</div>
				{/*分页*/}
				<div style={{ backgroundColor: "#000", color: "#0e90d2", width: "100%", height: "30px", lineHeight: "30px", fontSize: "16px" }}>
					<div style={{ width: "20%", float: "left", marginLeft: "30%" }} onClick={this.Last.bind(this)}>上一页 </div><div style={{ width: "20%", float: "right", marginRight: "30%" }} onClick={this.Next.bind(this)}>下一页 </div>
				</div>
			</div>
		)
	}
}

baodanmingxi.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(baodanmingxi)



