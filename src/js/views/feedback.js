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
class feedback extends Component {
	state = {
		title: "",
		content: "",
		pageSize: 10000,
		page: 1,
		list: []
	}
	componentDidMount() {
		const { user, refresh } = this.props;
	 //挂载函数到this中
		const context = this;
	
	}
	componentWillMount() {
		const $LoadingDom = $('#my-modal-loading');
	

		$LoadingDom.modal('close');
		const context = this;
		const { get_user_block } = this.props;   
		const type=1;
		get_user_block(this.state.page,this.state.pageSize,type).then(function (result) {
			// //console.log(result)
		
			context.setState({ list: result.resource });
		})
	}
	shuaxin() {
		const { get_user_block } = this.props;   
		const context = this;
		// location.reload()
	
		const type=1;
		get_user_block(this.state.page,this.state.pageSize,type).then(function (result) {
			console.log(result)
			
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			context.setState({ list: result.resource });
		})
	}
	// 提交
	tijiao() {
		const { user, feedback } = this.props;
		if (!this.refs.title.value) { $('.alertMessage').text("请输入标题！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.content.value) { $('.alertMessage').text("请输入内容！"); $('#my-alert').modal('open'); return; }
		//请求成功
		const context = this;
		var data = {
			title: this.refs.title.value,
			content: this.refs.content.value,
			type:1
		}
		// //console.log(data);
		feedback(data).then(function (result) {
			// //console.log(result);
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
			$("#title").val("");
			$("#content").val("");
		});
	}
	render() {
		const { user } = this.props;
		const lang = auth.getLang();
		const list = this.state.list;
		// //console.log(list)
		return (<div className="wrap">
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
				.GR_context{
					background: url(/public/images/bg.png) no-repeat;
					background-size:100% 100%;
					position:relative;
				}
				
				.GR_context ul{
					background: url(/public/images/4s6.png) !important;
					margin-top: 0.7rem;
				}
				.GR_context ul li{
				background: url(/public/images/4s6.png) !important;
				width: 100%;
				height: 3.2rem;
				border-bottom: 1px solid #00F1FA;
				line-height: 3.2rem;
				font-size: 1rem;
				}
				.GR_context ul li span{
				float: left;
				padding-left: 2rem;
				color: #03A1BA;
				}
				.GR_context ul li input{
				display: block;
				float: right;
				width: 60%;
				margin-top: 0rem;
				margin-right: 2rem;
				text-align:right;
				background: url(/public/images/4s6.png) !important;
				white-space:nowrap;
				border:none;
				outline:none;
				color:#03A1BA;
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
				.listHeader{
				margin:1rem 0;
				}
				.byn{
				background:none;
				white-space:nowrap;
				border:none;
				outline:none;
				color:#03A1BA;
				}
				.GR_btn input{
				width: 90%;
				height: 3.2rem;
				background: #08B5D0;
				line-height: 3.2rem;
				font-size: 0.8rem;
				text-align:center;
				margin:0 5% 2rem 5%;
				color:#fff;
				font-size:1rem;
				border-radius:5px;			
				}
				.fbli{
				
					background-size: 100% 100%;
					color: #fff;
					margin-top: 1rem;
					margin-top: 20px;
					overflow: hidden;
					background-color: #031925;
					border: 1px solid #06758d;
					border-radius: 7px;

				}
			
				.title{
					height:30px;
					line-height:30px;
					font-size:20px;
					text-indent:1em;
					background-color: #063748;
					border: 1px solid #0d96b8;
				
				}
				.content{
					height: 30px;
					line-height: 30px;
					font-size: 20px;
					text-indent: 1em;
					background-color: #063748;
					border: 1px solid #0d96b8;
					
				}
				.feedback{
					color: #fff;
				
					border-radius: 6px;
					width: 90%;
					margin: 0 auto;
					}
				.feedback_list{
					padding-left: 5%;
					padding-right: 5%;
					height: 25rem;
					overflow: scroll;
					padding-bottom: 26px;
				}
				.content1{

				}
				.fbli .cont{
					height: 100%;
 				   overflow: scroll;
				}
			`}</style>

			<div className="GR_top">
				<Link to="/nav"><span className="GR_out">《</span></Link>
				<span className="GR_zc">{lang.nav222}</span>
			</div>
			<div className="GR_context">
				<ul>
					<li><span style={{ fontSize: "16px" }}>{lang.nav2221}</span><input id="title" type="text" style={{ fontSize: "16px" }} value={user.title} ref="title" /></li>

				</ul>
			</div>


			<div style={{ padding: "5%" }}>
				<textarea id="content" value={user.content} ref="content" placeholder="请输入您的问题反馈" style={{ background: "black", borderColor: '#03A1BA', width: "100%", height: "100px", color: "#03A1BA", paddingLeft: "5px" }}></textarea>
			</div>



			<div className="GR_btn" onClick={this.tijiao.bind(this)}  ><input type="button" value={lang.Upgrade308} className="byn" /></div>

			<div className="feedback">
					问题列表
						<input style={{ float: "right" }} onClick={this.shuaxin.bind(this)} type="button" value={"刷新问题列表"} className="byn" />

				</div>
			<div className="feedback_list" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
			

				{list.map((item, index) => {
					return (

						<div className="fbli" key={index}>
							<div className="title"> {item.title}</div>
							<div className="cont">
								<div className="content1"> {item.content}</div>
								<div className="content1" style={{borderTop:"1px solid #098ba6"}}> {item.feedback?"客服："+item.feedback:"暂无反馈信息"}</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
				<div className="am-modal-dialog">
					<div className="am-modal-hd">{lang.home09}</div>
					<div className="am-modal-bd alertMessage"></div>
					<div className="am-modal-footer">
						<span className="am-modal-btn">{lang.home10}</span>
					</div>
				</div>
			</div>
		</div>)
	}
}

feedback.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(feedback)



