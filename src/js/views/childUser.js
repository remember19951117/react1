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
class childUser extends Component {
	state = {
		list: [],
		pageSize: 10000,
		page: 1,
	}
	componentDidMount() {
		const { getchildUser } = this.props;
		const context = this;
		getchildUser(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource })
			}
		})
	}
	componentWillMount() {
        const $LoadingDom = $('#my-modal-loading');
        $LoadingDom.modal('close');
	}
	render() {
		const lang = auth.getLang();
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
				ul{
					padding-left:0;
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
					font-size:12px;
				}
				.listHeader{
					margin:1rem 0;
				}
				.ant-col-6{
					font-size:12px;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.nav091}</span>
				</div>
				{
					list.map(function (v, k) {
					
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={6} style={{ textAlign: "center",fontSize:"12px" }}>子账号:{v.username}</Col>
											<Col className="listHD" span={8}>节点人:{v.jiedian}</Col>
											<Col className="listHD" span={10} style={{ textAlign: "center",fontSize:"12px" }}>注册时间:{formtTime(v.createTime)}</Col>
										</Row>
									</li>
								</ul>
							</div>  
						);
					})
				}
			</div>
		)
	}
}

childUser.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(childUser)



