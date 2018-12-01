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
import * as auth from '../actions/utils/auth';

class JiYiDaTing extends Component{

	state = {
		list : [],
		gmList : [],
		pageSize:20,
		page:1,
		zongyeshu:0,
		sum:0,
		qu:1,
	}
	componentWillMount(){
		// //console.log("交易大厅")
		const { JYList } = this.props;
		const context = this;
		JYList(this.state.page, this.state.pageSize).then(function(result){
			// //console.log(result,"交易大厅")
			if(result.status){
				context.setState({list:result.resource,sum: result.sum,zongyeshu:parseInt(result.sum/20)+1});
			}
		})
	}

	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		$('#doc-my-tabs').tabs();
	}
	//交易大厅 状态码
	onClickGouMai(id,key){
		const { QueRen } = this.props;
		const context = this;
		QueRen(id).then(function(result){
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if(result.status){
				let list = context.state.list;
				list[key].status = 2; 
				context.setState({list:list})
			}
		})
	}
	//切换tab请求购买数据
	onClickTabs(){

		
		this.state.qu=2;
		// //console.log(this.state.qu);
		const {GMList} = this.props;
		const context = this;
		GMList(this.state.page, this.state.pageSize).then(function(result){
			// //console.log(result,"交易记录")
			if(result.status){
			context.setState({gmList:result.resource})
			}
		})
	}
onClickTabs0(){
		
		this.state.qu=1	;
	
		// //console.log(this.state.qu);
		const {JYList} = this.props;
		const context = this;
		JYList(this.state.page, this.state.pageSize).then(function(result){
			// //console.log(result)
			if(result.status){
			context.setState({gmList:result.resource})
			}
		})
	}
	//确认支付按钮
	onClickZhiFu(id,key){
		const { GMpay } = this.props;
		const context = this;
		GMpay(id).then(function(result){
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			if(result.status){
				let list = context.state.gmList;
				list[key].status = 3;
				context.setState({gmList:list})
			}
		})
	}
	Last(){

		// //console.log(0);
		if(this.state.page>1){this.state.page--;}else{ this.state.page=1};
		
		if(this.state.qu==1){
		const { JYList } = this.props;
		const context = this;
		JYList(this.state.page, this.state.pageSize, ).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource,number: result.number});
			}
		})
		}else if(this.state.qu==2){
			const {GMList} = this.props;
		const context = this;
		GMList(this.state.page, this.state.pageSize).then(function(result){
			// //console.log(result)
			if(result.status){
				context.setState({gmList:result.resource})
			}
		})
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
		const { JYList } = this.props;
		const context = this;
		JYList(this.state.page, this.state.pageSize, ).then(function (result) {
			// //console.log(result);
			if (result.status) {
				context.setState({ list: result.resource,number: result.number});
			}
		})
		}else{
		const {GMList} = this.props;
		const context = this;
		GMList(this.state.page, this.state.pageSize).then(function(result){
			// //console.log(result);
			if(result.status){
				context.setState({gmList:result.resource})
			}
		})
		}
	}
	render(){
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list,gmList } = this.state;
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
					html,body{background: #000;}
					.wrap{width: 100%;height: 100%;}
					.DT_top{text-align: center;color: #00C8D0;height: 2.5rem;line-height: 2.5rem;font-size: 1rem;background: #000;font-weight: bold;}
					.DT_left{float: left;position: absolute;left: 5%;}
					.DT_top2{text-align: left;color: #666;height: 1.5rem;line-height: 1.5rem;font-size: 0.7rem;background: #000;padding-left: 1rem;}
					.DT_content ul{background: #fff;}
					.DT_content ul li{width: 100%;background: #fff;border-bottom: 1px solid #ccc;font-size: 0.7rem;color: #666;}
					.s1{display: block;width: 20%;text-align: center;float: left;}
					.s2{display: block;width: 20%;text-align: center;float: left;}
					.s3{display: block;width: 20%;text-align: center;float: left;}
					.s4{display: block;margin-top: 0.25rem;width: 20%;text-align: center;line-height: 2rem;border-radius: 5px;float: left;vertical-align:middle;}
					{/*.s5{display: block;width: 20%;text-align: center;float: left;}*/}
					.listHeader{
							margin-top:15px;
							background:#FFFFFF;
							color:#000;
							border:1px soild #00C8D0;
						}
						.listCenter1 {
							background:#5fb5f3;
							color:#ffffff;
						}
						.listHD {
							height:100%;
							font-size:12px;
							text-align:center;
							padding:8px 2px;
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
						.ss{
							background:#fff;
							color:#000;
						}
					`}
				</style>
				<div className="DT_top"><Link to="/nav"><span className="DT_left">《</span></Link><span className="DT_right">{lang.JiYiDaTing01}</span></div>
				<div className="am-tabs" id="doc-my-tabs">
					<ul className="am-tabs-nav am-nav am-nav-tabs am-nav-justify">
						<li className="am-active"><Link onClick={this.onClickTabs0.bind(this)}>{lang.JiYiDaTing02}</Link></li>
						<li><Link onClick={this.onClickTabs.bind(this)}>{lang.JiYiDaTing03}</Link></li>
					</ul>
					<div className="am-tabs-bd">
						<div className="am-tab-panel am-active">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={5}>{lang.JiYiDaTing04}</Col>
								<Col className="listHD" span={5}>{lang.JiYiDaTing05}</Col>
								<Col className="listHD" span={5}>{lang.JiYiDaTing06}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing07}</Col>
								<Col className="listHD" span={5}>{lang.JiYiDaTing08}</Col>
							</Row>
							{
								list.map(function(v,k){
									return(
										<div className="DT_content" key={k}>
											<ul>
												<li>

													<Row className="listHeader ss" type="flex" align="middle" >
														<Col className="listHD" span={5}>{v.seller}</Col>
														<Col className="listHD" span={5}>{v.sellerName}</Col>
														<Col className="listHD" span={5}>{v.sellerMobile}</Col>
														<Col className="listHD" span={4}>{v.sum}</Col>
														<Col className="listHD" span={5}>{v.status==1?(<input type="button" value={lang.JiYiDaTing10} className="rad" onClick={context.onClickGouMai.bind(context,v._id,k)} />):(<input type="button" value={lang.JiYiDaTing11} className="s4" />)}</Col>
														
													</Row>
												</li>
											</ul>
										</div>
									);
								})
							}
						</div>
						<div className="am-tab-panel">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={4}>{lang.JiYiDaTing04}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing05}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing06}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing07}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing08}</Col>
								<Col className="listHD" span={4}>{lang.JiYiDaTing09}</Col>
							</Row>
							{
								gmList.map(function(v,k){
									return(
										<div className="DT_content" key={k}>
											<ul>
												<li>
													<Row className="listHeader" type="flex" align="middle">
														<Col className="listHD" span={4}>{v.seller}</Col>
														<Col className="listHD" span={4}>{v.sellerName}</Col>
														<Col className="listHD" span={4}>{v.sellerMobile}</Col>
														<Col className="listHD" span={4}>{v.sum}</Col>
														<Col className="listHD" span={4}>
															{v.status==2?(<input type="button" value={lang.JiYiDaTing12} onClick={context.onClickZhiFu.bind(context,v._id,k)}  />):""}
															{v.status==3?(<span>{lang.JiYiDaTing13}</span>):""}
															{v.status==4?(<span>{lang.JiYiDaTing14}</span>):""}
														</Col>
														<Col className="listHD" span={4}><Link to={"/jiluXiangqing/" + v._id}>{lang.JiYiDaTing09}</Link></Col>
													</Row>
												</li>
											</ul>
										</div>
									);
								})
							}
						</div>
						
					</div>
					<div style={{color:"#0e90d2",width:"100%",height:"30px",lineHeight:"30px",marginTop:"10px",marginBottom:"20px",fontSize:"16px"}}>
					<div style={{width:"20%",float:"left",marginLeft:"30%"}} onClick={this.Last.bind(this)}>上一页 </div><div style={{width:"20%",float:"right",marginRight:"30%"}} onClick={this.Next.bind(this)}>下一页 </div>
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




JiYiDaTing.contextTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(JiYiDaTing)



