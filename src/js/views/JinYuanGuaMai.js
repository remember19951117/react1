/*
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import * as auth from '../actions/utils/auth';
const Option = Select.Option;
class JinYuanGuaMai extends Component {
	state = {
		list: [],
		vip: 100,
		sum:0,
		zongyeshu:0,
		pageSize: 20,
		page: 2,
	}

	onClickTabs() {
		const { JYGMList } = this.props;
		const context = this;
		JYGMList(context.state.page,context.state.pageSize).then(function (result) {
			// //console.log(result)
			if (result.status) {
				context.setState({ 
					list: result.resource,
					sum:result.sum,
					zongyeshu:Number(parseInt(result.sum/20)+1)
				});
			}
		})
	}
	onChange(value) {
		const { user } = this.props;
		// //console.log(value)
		this.setState({ vip: value });
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		$('#doc-my-tabs').tabs();
	}
	onClickBTN() {
		const { GuaMai, user, getUser } = this.props;
		// if (!this.refs.GMnumber.value) { $('.alertMessage').text("请输入挂卖数量！"); $('#my-alert').modal('open'); return; }
		// if(this.refs.GMnumber.value%100){$('.alertMessage').text("挂卖数量必须为100的倍数！");$('#my-alert').modal('open'); return;}
		// if (this.refs.GMnumber.value <= 0) { $('.alertMessage').text("银元不足，挂卖失败"); $('#my-alert').modal('open'); return; }
		if (!this.refs.GMpwd.value) { $('.alertMessage').text("请输入交易密码！"); $('#my-alert').modal('open'); return; }
		var data = {
			"sum":this.state.vip,
			"tranpwd": this.refs.GMpwd.value,
		}
		const context = this;
		GuaMai(data).then(function (result) {
			// //console.log(result);
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if (result.status) {
				// context.refs.GMnumber.value = "";
				context.refs.GMpwd.value = "";
				// user.gold = user.gold - data.sum - (data.sum)*0.1;
				user.gold = result.gold;
				getUser(user);
			}
		});
	}

	QRjy(id, key) {
		const { QueRenJY } = this.props;
		const context = this;
		QueRenJY(id).then(function (result) {
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if (result.status) {
				let list = context.state.list;
				list[key].status = 4;
				context.setState({ list: list })
			}
		})
	}

	onClickOUT(id, key) {
		const { QuXiaoJY } = this.props;
		const context = this;
		QuXiaoJY(id).then(function (result) {
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if (result.status) {
				let list = context.state.list;
				list.splice(key, 1);
				context.setState({ list: list })
			}
		})
	}
Last(){
		// //console.log(0);
		if(this.state.page>1){this.state.page--;}else{ this.state.page=1};
		const { JYGMList } = this.props;
		const context = this;
		JYGMList(context.state.page,context.state.pageSize).then(function (result) {
			// //console.log(result)
			if (result.status) {
				context.setState({ list: result.resource })
			}
		})
	}
	Next(){
	// //console.log(1);
	if(this.state.sum<=20){this.state.page=1;}
	else if(this.state.page>=this.state.zongyeshu){this.state.page=this.state.zongyeshu;}
	else{this.state.page++;}
       const { JYGMList } = this.props;
		const context = this;
		JYGMList(this.state.page,this.state.pageSize).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource })
			}
		})
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { user } = this.props;
		const { list } = this.state;
		const context = this;
		return (
			<div style={{ background: '#f3f1f2' }}>
				<style>
					{`	
						html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
							margin: 0;
							padding: 0;
						}
						body{
							background:#000;
						}
						div{
							border:none;
						}
						.J_top{
							text-align: center;
							color: #00C8D0;
							height: 2.5rem;
							line-height: 2.5rem;
							background: #000;
							font-weight: bold;
						}
						.J_left{
							float: left;
							position:absolute;
							left:5%;
						}
						.XG_header{
							width: 100%;
							height: 3rem;
							line-height: 3rem;
							background:#000;
						}
						.am-tab-panel{
							background:#000;
						}
						.sp1{
							width: 100%;
							height: 1.5rem;
							color: #666;
						}
						.sp2{
							width: 100%;
							height: 1.5rem;
							color: #666;
						}
						.XG_content{
							background:#000;
							
						}
						.XG_content ul{
							margin-top:2rem; 
						}
						.XG_content ul li{
							width: 100%;
							height: 2.5rem;
							margin-bottom: 2rem;
							line-height: 2.5rem;
						}
						.XG_content ul li span{
							float: left;
							padding-left: 1rem;
							color: #00C8D0;
						}
						.XG_content ul li input{
							float: right;
							width: 160px;
							height:2rem;
							margin-right: 19%;
							outline: none;
							background:url(/public/images/4s6.png) no-repeat;
							border:1px solid #00C8D0;
							color:#00C8D0;
							text-indent:1rem;
							border-radius:5px;
						}
						.XG_btn{
							text-align: center;
							margin-top: 1rem;
						}
						.XG_btn input{
							text-align: center;
							width: 90%;
							height: 2.5rem;
							background: #00C8D0;
							color: #fff;
						}
						.am-tabs-bd{
							border:none;
						}
						{/*第二板块*/}
						.listHeader{
							margin-top:15px;
							background:#0e77ca;
							color:#ffffff;
						}

						.listCenter1 {
							background:#FFFFFF;
							color:#000000;
							margin-top:10px;
						}

						.listHD {
							height:100%;
							font-size:12px;
							text-align:center;
							padding:8px 2px;
						}
						input{
							color:#000;
						}
						.am-tabs-bd .am-tab-panel{
							padding:0;
							text-align:center;
						}
						.ant-select-selection{
							background-color:#000;
							border:1px solid #00C8D0;
						}
						.sp2{
							color:#00C8D0;
						}
					`}
				</style>
				<div className="J_top"><Link to="/nav"><span className="J_left">《</span></Link><span>{lang.JinYuanGuaMai01}</span></div>
				<div className="am-tabs" id="doc-my-tabs">
					<ul className="am-tabs-nav am-nav am-nav-tabs am-nav-justify">
						<li className="am-active"><Link>{lang.JinYuanGuaMai01}</Link></li>
						<li><Link onClick={this.onClickTabs.bind(this)}>{lang.JinYuanGuaMai02}</Link></li>
					</ul>
					<div className="am-tabs-bd">
						<div className="am-tab-panel am-active">
							<div className="XG_header">
								{/* <p className="sp1">您当前银元数量：{(user.gold).toFixed(2)}</p> */}
							<p className="sp2">{lang.JinYuanGuaMai03}{this.state.vip / 10} {lang.JinYuanGuaMai04} </p>
							</div>
							<div className="XG_content">
								<ul>
									{/* <li><span>挂卖数量：</span><input type="text" ref="GMnumber" placeholder="起售"  /></li> */}
									<li><span>{lang.JinYuanGuaMai05}</span>
										<Select defaultValue="100" style={{ width: 160, color: "#fff" }} onChange={this.onChange.bind(this)}>
											<Option value="100">{100}</Option>
											<Option value="200">{200}</Option>
											<Option value="500">{500}</Option>
											<Option value="1000">{1000}</Option>
											<Option value="2000">{2000}</Option>
											<Option value="5000">{5000}</Option>
										</Select>
									</li>
									<li><span>{lang.JinYuanGuaMai06}</span><input type="password" ref="GMpwd" /></li>
								</ul>
								<div className="XG_btn"><input type="button" value={lang.JinYuanGuaMai07} onClick={this.onClickBTN.bind(this)} /></div>
							</div>
						</div>
						<div className="am-tab-panel">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai08}</Col>
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai09}</Col>
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai10}</Col>
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai11}</Col>
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai12}</Col>
								<Col className="listHD" span={4}>{lang.JinYuanGuaMai13}</Col>
							</Row>
							{
								list.map(function (v, k) {
									return (
										<div className="dhlist" key={k}>
											<ul>
												<li> 
													<Row className="listCenter1" type="flex" align="middle">
														<Col className="listHD" span={4}>{formtTime(v.createTime)}</Col>
														<Col className="listHD" span={4}>{v.seller}</Col>
														<Col className="listHD" span={4}>{v.sum}</Col>
														<Col className="listHD" span={4}>
															{v.status == 1 ? (<input type="button" value={lang.JinYuanGuaMai14} onClick={context.onClickOUT.bind(context, v._id, k)} className="s4" />) : "无法撤销"}
														</Col>
														<Col className="listHD" span={4}>
															{v.status == 0 ? "交易失败" : ""}
															{v.status == 1 ? "等待购买" : ""}
															{v.status == 2 ? "等待支付" : ""}
															{v.status == 3 ? (<input type="button" onClick={context.QRjy.bind(context, v._id, k)} value="确认完成" />) : ""}
															{v.status == 4 ? "交易完成" : ""}
														</Col>
														<Col className="listHD" span={4}><Link to={"/jiluXiangqing/" + v._id}>{lang.JinYuanGuaMai13}</Link></Col>
													</Row>
												</li>
											</ul>
										</div>
									);
								})
							}
							{/*分页*/}
						<div style={{color:"#0e90d2",width:"100%",height:"30px",lineHeight:"30px",marginTop:"10px",marginBottom:"20px",fontSize:"16px"}}>
					<div style={{width:"20%",float:"left",marginLeft:"30%"}} onClick={this.Last.bind(this)}>上一页 </div><div style={{width:"20%",float:"right",marginRight:"30%"}} onClick={this.Next.bind(this)}>下一页 </div>
					</div>
						</div>
						
					
					</div>
				</div>

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

JinYuanGuaMai.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(JinYuanGuaMai)



