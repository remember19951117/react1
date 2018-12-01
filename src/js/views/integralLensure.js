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
// import styles from '../../css/code.css';
class integralLensure extends Component {

	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	render() {
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
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
					border:1px solid #03A1BA;
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
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">保证金明细</span>
				</div>

				<div className="GR_context">
					<ul>
						<li>
							<Row className="listCenter1" type="flex" align="middle">
								<Col className="listHD" offset={1} span={8}>W积分收益</Col>
								<Col className="listHD" span={7}>+11111</Col>
								<Col className="listHD" span={8} style={{ textAlign: "center" }}>2017-12-12  18:19:20</Col>
							</Row>
						</li>
						<li>
							<Row className="listCenter1" type="flex" align="middle">
								<Col className="listHD" offset={1} span={8}>W积分收益</Col>
								<Col className="listHD" span={7}>+11111</Col>
								<Col className="listHD" span={8} style={{ textAlign: "center" }}>2017-12-12  18:19:20</Col>
							</Row>
						</li>
						<li>
							<Row className="listCenter1" type="flex" align="middle">
								<Col className="listHD" offset={1} span={8}>W积分收益</Col>
								<Col className="listHD" span={7}>+11111</Col>
								<Col className="listHD" span={8} style={{ textAlign: "center" }}>2017-12-12  18:19:20</Col>
							</Row>
						</li>
					</ul>
				</div>

			</div>
		)
	}
}

integralLensure.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(integralLensure)



