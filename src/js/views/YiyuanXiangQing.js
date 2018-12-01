/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class YiyuanXiangQing extends Component{

	state = {
		list : [],
		WinningList : [],
		pageSize:10000,
		page:1,
	}
	componentWillMount(){
		const { Numlist } = this.props;
		const context = this;
		Numlist().then(function(result){
			// //console.log(result)
			if(result.status){
				context.setState({list:result.resource})
			}
		})
	}

	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		$('#doc-my-tabs').tabs();
	}
	
	//切换tab请求购买数据
	onClickTabs(){
		const {WinningList} = this.props;
		const context = this;
		WinningList().then(function(result){
			// //console.log(result)
			if(result.status){
				context.setState({WinningList:result.resource})
			}
		})
	}

	render(){
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list,WinningList } = this.state;
		const context = this;
		return(
			
			<div className="wrap">
				<style>
					{`
					html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
					margin: 0;padding: 0;border: 0;font: inherit;}
					ul,li{list-style: none;}
					div{border:none;}
					img{border: none;}
					a{text-decoration: none;}
					html,body{background: #EBEBEB;}
					.wrap{width: 100%;height: 100%;}
					.DT_top{text-align: center;color: #ffffff;height: 2.5rem;line-height: 2.5rem;font-size: 1rem;background: #3778EC;font-weight: bold;}
					.DT_left{float: left;color: #fff;position: absolute;left: 5%;}
					.DT_top2{text-align: left;color: #666;height: 1.5rem;line-height: 1.5rem;font-size: 0.7rem;background: #EBEBEB;padding-left: 1rem;}
					.DT_content ul{background: #fff;}
					.DT_content ul li{width: 100%;background: #fff;border-bottom: 1px solid #ccc;font-size: 0.7rem;color: #666;line-height:2rem;margin-top:0.3rem;}
					.s1{display: block;width: 20%;text-align: center;float: left;}
					.s2{display: block;width: 20%;text-align: center;float: left;}
					.s3{display: block;width: 20%;text-align: center;float: left;}
					.s4{display: block;margin-top: 0.25rem;width: 20%;text-align: center;line-height: 2rem;border-radius: 5px;float: left;vertical-align:middle;}
					{/*.s5{display: block;width: 20%;text-align: center;float: left;}*/}
					.listHeader{
							margin-top:25px;
							background:#FFFFFF;
							color:#000;
						}
						.listCenter1 {
							background:#5fb5f3;
							color:#ffffff;
						}
						.listHD {
							height:100%;
							font-size:12px;
							text-align:center;
							{/*padding:1px 2px;*/}
						}
						.am-tabs-bd .am-tab-panel{
							padding:0;
						}
						.rad{
							border-radius:5px;
						}
						.listHD input{
							width:80%;
							height:1.5rem;
							display:block;
						}
						.listHD img{
							width:50px;
							height:30px;
						}
						.ss{
							background:#fff;
							color:#000;
						}
					`}
				</style>
				<div className="DT_top"><Link to="/YiYuanGou"><span className="DT_left">返回</span></Link><span className="DT_right">我的夺宝</span></div>
				<div className="am-tabs" id="doc-my-tabs">
					<ul className="am-tabs-nav am-nav am-nav-tabs am-nav-justify">
						<li className="am-active"><Link>我参与的</Link></li>
						<li><Link onClick={this.onClickTabs.bind(this)}>中奖记录</Link></li>
					</ul>
					<div className="am-tabs-bd">
						<div className="am-tab-panel am-active">
							{
								list.map(function(v,k){
									return(
										<div className="DT_content" key={k}>
											<ul>
												<li>
													<Row className="listHeader ss" type="flex" align="middle" >
														<Col className="listHD" span={4}><img src="/public/images/gol.png" /></Col>
														<Col className="listHD" span={8}>{formtTime(v.createTime)}</Col>
														<Col className="listHD" span={8}>{v.goodsname}</Col>
														<Col className="listHD" span={4}>
															{v.state==1?"等待开奖":""} 
															{v.state==2?"已开奖":""}
														</Col>
													</Row>
												</li>
											</ul>
										</div>
									);
								})
							}
						</div>
						<div className="am-tab-panel">
							{
								WinningList.map(function(v,k){
									return(
										<div className="DT_content" key={k}>
											<ul>
												<li>
													<Row className="listHeader" type="flex" align="middle">
														<Col className="listHD" span={6}><img src="/public/images/gol.png" /></Col>
														<Col className="listHD" span={8}>{formtTime(v.createTime)}</Col>
														<Col className="listHD" span={6}>{v.goodsname}</Col>
														<Col className="listHD" span={4}>
															{v.winState?"已中奖":"未中奖"} 
														</Col>
													</Row>
												</li>
											</ul>
										</div>
									);
								})
							}
						</div>
						
					</div>
				</div>
				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
				  	<div className="am-modal-dialog">
						  
				    	<div className="am-modal-hd">温馨提示</div>
				    	<div className="am-modal-bd alertMessage">
				      		
				    	</div>
				    	<div className="am-modal-footer">
				      		<span className="am-modal-btn">确定</span>
				    	</div>
				  	</div>
				</div>
			</div>
			
		)
	}
}




YiyuanXiangQing.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		// user:state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...userAct}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(YiyuanXiangQing)



