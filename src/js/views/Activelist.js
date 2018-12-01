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
class Activelist extends Component {
	state = {
		list: [],
		pageSize: 10000,
		page: 1,
	}
	componentDidMount() {
		const { getActivelist } = this.props;
		const context = this;
		getActivelist(this.state.page, this.state.pageSize).then(function (result) {
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
chexiao(v){
	//console.log(v);
	const { deleteUser } = this.props;
	const context = this;
	deleteUser(v._id).then(function (result) {
	//console.log(result);
	if(result.statusCode==103){
		$('.alertMessage').text(result.message);
		$('#my-alert').modal('open');
		context.componentDidMount();
	}
	});
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
				.listHD{font-size:12px}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.nav191}</span>
				</div>

				{
					list.map(function (v, k) {
						return (
							<div className="GR_context" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={4}>账号:{v.username}</Col>
											<Col className="listHD" span={4}>姓名:{v.name}</Col>
											<Col className="listHD" span={10} style={{ textAlign: "center" }}>注册时间:{formtTime(v.createTime)}</Col>
											<Col className="listHD" span={6} style={{textAlign:"center"}} onClick={context.chexiao.bind(context,v)}>{lang.nav192}</Col>
										</Row>
									</li>
								</ul>
							</div>
						);
					})
				}
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

Activelist.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Activelist)



