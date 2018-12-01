/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
//import Select from 'antd/lib/select';
//const Option = Select.Option;
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import styles from '../../css/zhuce.css';
//import Radio from 'antd/lib/radio';
//const RadioButton = Radio.Button;
//const RadioGroup = Radio.Group;
import * as auth from '../actions/utils/auth';

class Directpush extends Component {
	state = {
		number: [],
		list: [],
		sum:0,
		zongyeshu:0,
		pageSize: 20,
		page: 1,
	}

	componentDidMount() {
		const { ZTlist } = this.props;
		const context = this;
		ZTlist(this.state.page,this.state.pageSize).then(function(result){
			//console.log(result)
			if(result.status){
			context.setState({list:result.resource,sum: result.sum,zongyeshu:parseInt(result.sum/20)+1});
			}
		})
	}
	componentWillMount() {
        const $LoadingDom = $('#my-modal-loading');
        $LoadingDom.modal('close');
	}
	//选择货币
	onChange = (e) => {
		const { order } = this.props;
		if (e.value == 1) {
			this.setState({
				value: e.target.value,
			})
		} else {
			this.setState({
				value: e.target.value,
			})
		}
	}
	onClicksearch() {
		// if (!this.search.value) { $('.alertMessage').text("请输入查找账户！"); $('#my-alert').modal('open'); return; }
		// var data = {
		// 	"username": this.refs.search.value,
		// }
		// const context = this;
		// search(data).then(function(result){
		// 	//console.log(result);
		// 	if(result.status){
		// 		context.setState({searchlist:result.resource})
		// 	}
		// 	$('.alertMessage').text(result.message);
		// 	$('#my-alert').modal('open');
		// })
	}
	Last(){
		//console.log(0);
		if(this.state.page>1){this.state.page--;}else{ this.state.page=1};
		const { ZTlist } = this.props;
		const context = this;
		ZTlist(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource,number: result.number});
			}
		})
	}
	Next(){
	//console.log(1);
	if(this.state.sum<=20){
        this.state.page=1;
        }
	   else if(this.state.page>=this.state.zongyeshu){
	    this.state.page=this.state.zongyeshu;
	    }
	    else{
        this.state.page++;
        }
	    //console.log(this.state.page);
        const { ZTlist } = this.props;
		const context = this;
		ZTlist(this.state.page, this.state.pageSize, ).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource,number: result.number});
			}
		})
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list } = this.state;
		const { searchlist = [] } = this.state;
		const context = this;
		
		return (

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
						.DT_top{text-align: center;color: #ffffff;height: 2.5rem;line-height: 2.5rem;font-size: 1rem;background: #3778EC;font-weight: bold;}
						.DT_left{float: left;color: #fff;position: absolute;left: 5%;}
						.DT_top2{text-align: left;color: #666;height: 1.5rem;line-height: 1.5rem;font-size: 0.7rem;background: #EBEBEB;padding-left: 1rem;}
						.DT_content ul{background: #fff;}
						.DT_content ul li{width: 100%;background: #fff;font-size: 0.7rem;color: #666;}
						.s1{display: block;width: 20%;text-align: center;float: left;}
						.s2{display: block;width: 20%;text-align: center;float: left;}
						.s3{display: block;width: 20%;text-align: center;float: left;}
						.s4{display: block;margin-top: 0.25rem;width: 20%;text-align: center;line-height: 2rem;border-radius: 5px;float: left;vertical-align:middle;}
						{/*.s5{display: block;width: 20%;text-align: center;float: left;}*/}
						.listHeader{
								margin-top:15px;
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
								padding:8px 2px;
								background:#000;
								border-bottom:1px solid #03A1BA;
								color: #03A1BA;
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
						`}
				</style>
				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.Directpush01}</span>
				</div>
				<div className="am-tabs" id="doc-my-tabs">
					<div className="am-tabs-bd">
						<div className="am-tab-panel am-active">
							<Row className="listHeader" type="flex" align="middle">
								<Col className="listHD" span={4}>{lang.Directpush02}</Col>
								<Col className="listHD" span={4}>{lang.gerenziliao03}</Col>
								<Col className="listHD" span={4}>{lang.tuandui04}</Col>
								<Col className="listHD" span={4}>{lang.tuandui05}</Col>
								<Col className="listHD" span={4}>{lang.tuandui08}</Col>
								<Col className="listHD" span={4}>{lang.tuandui09}</Col>
							</Row>
						</div>
					</div>
				</div>
				{
					list.map(function (v, k) {
						return (
							<div className="DT_content" key={k}>
								<ul>
									<li>
										<Row className="listHeader" type="flex" align="middle">
											<Col className="listHD" span={4}>{v.username}</Col>
											<Col className="listHD" span={4}>{v.registerJibie}</Col>
											<Col className="listHD" span={4}>{v.leftYeji}</Col>
											<Col className="listHD" span={4}>{v.rightYeji}</Col>
											<Col className="listHD" span={4}>{v.tuijianNumber}</Col>
											<Col className="listHD" span={4}>{v.leftTeamNumber+v.rightTeamNumber}</Col>
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
          
		)
	}
}

Directpush.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Directpush)



