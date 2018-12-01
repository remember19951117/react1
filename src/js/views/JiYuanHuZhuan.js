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
class JiYuanHuZhuan extends Component {

	state = {
		list: [],
		pageSize: 20,
		page: 1,
		qu:1,
		sum:0,
		zongyeshu:0,
	}
	//转入记录
	onClickTabs() {
		this.state.qu=1;
		const { zhuanzhang } = this.props;
		const context = this;
		// this.type = 1;
		zhuanzhang(0, 1, this.state.page, this.state.pageSize).then(function (result) {
			console.log(result)
			if (result.status) {
				context.setState({ list: result.resource,sum: result.sum,zongyeshu:parseInt(result.sum/20)+1 })
			}
		});
	}
	//转出记录
	onClickTabs2() {
		this.state.qu=2;
		const { zhuanzhang2 } = this.props;
		const context = this;
		zhuanzhang2(0, 2, this.state.page, this.state.pageSize).then(function (result) {
			console.log(result)
			if (result.status) {
				context.setState({ list: result.resource,sum: result.sum,zongyeshu:parseInt(result.sum/20)+1 });
			}
		});
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		$('#doc-my-tabs').tabs();
	}
	onClickBTN() {
		const { DingXiang, user, getUser } = this.props;
		if (!this.refs.username.value) { $('.alertMessage').text("请输入交易账号！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.sum.value) { $('.alertMessage').text("请输入交易数量！"); $('#my-alert').modal('open'); return; }
		if (this.refs.sum.value % 100) { $('.alertMessage').text("交易数量必须为100的倍数！"); $('#my-alert').modal('open'); return; }
		if (this.refs.sum.value <= 0) { $('.alertMessage').text("银元不足，转账失败"); $('#my-alert').modal('open'); return; }
		if (!this.refs.VerificationCode.value) { $('.alertMessage').text("请输入验证码！"); $('#my-alert').modal('open'); return; }
		console.log(this.refs.VerificationCode.value)
		var data = {
			"username": this.refs.username.value,
			"sum": this.refs.sum.value,
			"VerificationCode": this.refs.VerificationCode.value,
			"type":0
		}
		const context = this;
		DingXiang(data).then(function (result) {
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if (result.status) {
				context.refs.DFnumber.value = "";
				context.refs.DFuser.value = "";
				context.refs.DFpwd.value = "";
				// user.gold = user.gold - data.sum - (data.sum)*0.05;
				user.gold = result.gold;
				getUser(user);
			}
		});
	}
	//获取验证码
	onClikYZM() {
		const { getSmsCode } = this.props;
		const { user } = this.props;
		const context = this;
		console.log(user)
		var i = user.username;
		var s = i.toString();
		console.log(s)
		var data = {
			"mobile": s,
		}
		// //console.log('电话222', data)
		getSmsCode(data).then(function (result) {
			// //console.log('电话', user.mobile)
			// //console.log(result)
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
Last(){
		// //console.log(0);
		if(this.state.page>1){this.state.page--;}else{ this.state.page=1};
		
		if(this.state.qu==1){
		const { zhuanzhang } = this.props;
		const context = this;
		// this.type = 1;
		zhuanzhang( 0,1, this.state.page, this.state.pageSize).then(function (result) {
			console.log(result)
			if (result.status) {
				context.setState({ list: result.resource })
			}
		});
		}else{
			const { zhuanzhang2 } = this.props;
		const context = this;
		zhuanzhang2(0,2, this.state.page, this.state.pageSize).then(function (result) {
			console.log(result)
			if (result.status) {
				context.setState({ list: result.resource })
			}
		});
		}
	}
	Next(){
	// //console.log(1);
	if(this.state.sum<=20){
        this.state.page=1;
        }
	   else if(this.state.page>=this.state.zongyeshu){
	    this.state.page=this.state.zongyeshu;
	    }
	    else{
        this.state.page++;
        }
      if(this.state.qu==1){
		const { zhuanzhang } = this.props;
		const context = this;
		// this.type = 1;
		zhuanzhang(0, 1, this.state.page, this.state.pageSize).then(function (result) {
			// //console.log(result)
			if (result.status) {
				context.setState({ list: result.resource })
			}
		});
		}else{
		const { zhuanzhang2 } = this.props;
		const context = this;
		zhuanzhang2(0,2, this.state.page, this.state.pageSize).then(function (result) {
			// //console.log(result)
			if (result.status) {
				context.setState({ list: result.resource })
			}
		});
		}
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list } = this.state;
		const { user } = this.props;
		// //console.log(list);
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
							background:#000;	}
						div{
							border:none;	}
						.DT_top{
							text-align: center;
							color: #00C8D0;
							line-height: 2.5rem;
							background: #000;
							font-weight: bold;	
						}
						.DT_left{
							float: left;
							position: absolute;
							left: 5%;	}
						.XG_header{
							width: 100%;
							height: 3rem;
							line-height: 3rem;
						}
						.sp1{
							width: 100%;
							height: 1.5rem;
							color: #666;
							text-align:center;
						}
						.sp2{
							width: 100%;
							height: 1.5rem;
							color: #666;
							text-align:center;
						}
						.XG_content ul{
							margin-top:2rem;
							color:#00C8D0;
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
						}
						.XG_content ul li span button{
							background:#00C8D0;
							color:#fff;
							border-radius:5px;
							border:0;
						}
						.XG_content ul li input{
							float: right;
							width: 10rem;
							height:2rem;
							margin-right: 1rem;
							outline: none;
							border:1px solid #00C8D0;
							color:#00C8D0;
							background:url(/public/images/4s6.png) no-repeat;
							text-indent:1rem;
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
							border:0;
						}
						.am-tabs-bd{
							border:none;
							background:#000;
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
							border-right:1px solid #ebebeb;
							font-size:12px;
							text-align:center;
							padding:8px 2px;
							border-width: 0px;
						}
						.am-tabs-bd .am-tab-panel{
							padding:0;
						}
					`}
				</style>

				<div className="DT_top"><Link to="/nav"><span className="DT_left">《</span></Link><span className="DT_right">{lang.JiYuanHuZhuan01}</span></div>
				<div className="am-tabs" id="doc-my-tabs">
					<ul className="am-tabs-nav am-nav am-nav-tabs am-nav-justify">
						<li className="am-active"><Link>{lang.JiYuanHuZhuan02}</Link></li>
						<li><Link onClick={this.onClickTabs.bind(this)}>{lang.JiYuanHuZhuan03}</Link></li>
						<li><Link onClick={this.onClickTabs2.bind(this)}>{lang.JiYuanHuZhuan04}</Link></li>
					</ul>
					<div className="am-tabs-bd">
						<div className="am-tab-panel am-active">
							<div className="XG_header">
								{/* <p className="sp1">您当前银元数量：{(user.gold).toFixed(2)}</p> */}
								{/* <p className="sp2">此操作收取当前交易5%手续费</p> */}
							</div>
							<div className="XG_content">
								<ul>
									<li><span>{lang.JiYuanHuZhuan05}</span><input type="text" ref="username" /></li>
									<li><span>{lang.JiYuanHuZhuan06}</span><input type="text" ref="sum" placeholder="100积分起转" /></li>
									<li><span>{lang.JiYuanHuZhuan07}<button onClick={this.onClikYZM.bind(this)}>{lang.JiYuanHuZhuan015}</button></span><input type="password" ref="VerificationCode" /></li>
								</ul>
								<div className="XG_btn"><input type="button" value={lang.JiYuanHuZhuan08} onClick={this.onClickBTN.bind(this)} /></div>
							</div>
						</div>
						<div className="am-tab-panel">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan09}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan10}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan11}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan12}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan13}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan14}</Col>
							</Row>
							{
								list.map(function (v, k) {
									return (
										<div className="dhlist" key={k}>
											<ul>
												<li>
													<Row className="listCenter1" type="flex" align="middle">
														<Col className="listHD" span={4}>{formtTime(v.createTime)}</Col>
														<Col className="listHD" span={4}>{v.sellerName}</Col>
														<Col className="listHD" span={4}>{v.seller}</Col>
														<Col className="listHD" span={4}>{v.sellerMobile}</Col>
														<Col className="listHD" span={4}>{v.sum}</Col>
														<Col className="listHD" span={4}>{lang.JiYuanHuZhuan16}</Col>
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

						<div className="am-tab-panel">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan09}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan10}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan11}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan12}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan13}</Col>
								<Col className="listHD" span={4}>{lang.JiYuanHuZhuan14}</Col>
							</Row>
							{
								list.map(function (v, k) {
									return (
										<div className="dhlist" key={k}>
											<ul>
												<li>
													<Row className="listCenter1" type="flex" align="middle">
														<Col className="listHD" span={4}>{formtTime(v.createTime)}</Col>
														<Col className="listHD" span={4}>{v.buyerName}</Col>
														<Col className="listHD" span={4}>{v.buyer}</Col>
														<Col className="listHD" span={4}>{v.buyerMobile}</Col>
														<Col className="listHD" span={4}>{v.sum}</Col>
														<Col className="listHD" span={4}>交易成功</Col>
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

JiYuanHuZhuan.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(JiYuanHuZhuan)



