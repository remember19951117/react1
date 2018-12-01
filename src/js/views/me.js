/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';

class Me extends Component{

	//用户刷新
	componentWillMount(){
		// //console.log('componentWillMount')
		const { refresh } = this.props;
		refresh();
	}
	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	logOut(){
		const {delUser,dispatch} = this.props;
		this.context.router.push('/denglu');
		delUser();
	}
	render(){
		const { user } = this.props;
		// //console.log(user);
		// //console.log(user.gold)
		//我的
		return(
			<div className="me_wrap">
			<style>
                {`
					html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
					    margin: 0;
					    padding: 0;
					}
					html,body{
						background-image:none!important;
					}
					ul,li{
						list-style:none;
					}
					html,body{
						font-size: 14px;
					}
					a{
						text-decoration: none;
						color: #000000;
					}
					.me_wrap{
						width:100%;
						height:100%;
					}
					.me_top{
						text-align:center;
						color:#ffffff;
						height: 2.5rem;
						line-height: 2.5rem;
						background: #328FEE;
						border-bottom:1px solid #ccc;
						font-size:1.2rem;
						font-weight: bold;
					}
					.me_left{float: left;
						color:#fff;
						position:absolute;
						left:5%;
					}
					.me_title_left{
						display:inline-block;
						margin-left: 45%;
						text-align: center;
						color: #FFFFFF;
						font-size: 1.5rem;
					}
					.me_title_right{
						display: block;
						float: right;
						width: 25px;
						height: 25px;
						margin-right: 1.5rem;
					}
					.me_title{
						width: 100%;
						height: 14rem;
						background: #328FEE;
						margin:0 auto;
					}
					.me_tx{
						width: 20%;
						margin-top: 3rem;
						margin-left:40%;
						margin-right:2rem;
					}
					.me_name{
						margin-bottom: 0.2rem;
						text-align: center;
						font-size: 1rem;
						color: #FFFFFF;
						margin-top:0.8rem;
					}
					.me_content{
						width: 100%;
						height: 59%;
						background: #CCCCCC;
					}
					.me_content ul li{
						width: 100%;
						height: 3.5rem;
						line-height:3.5rem;
						background: #FFFFFF;
						border-bottom:1px solid #cccccc;
						font-size: 1rem;
					}
					.me_log{
		                display: block;
						float: left;
						width: 15px;
						height: 15px;
		                margin: 1rem 0 0 1.5rem;
					}
		            .me_titleer{
		               width: 70px;
						height: 35px;
		                display: block;
		                float: left;
		                margin-left: 1.5rem;
		                line-height:1.5rem;
						color: #000000;
						line-height:3.5rem;
		            }
		            .me_cishan{
		               width: 80px;
						height: 35px;
		                display: block;
		                float: left;
		                 line-height:35px;
		                 margin-left: 5rem;
						 color: #000000;
		            }
		            .me_log2{
		                margin-top: 0.2rem;
		            }
					.me_you{
						display: block;
						float: right;
						width: 12px;
						height: 12px;
						margin-right: 2rem;
						margin-top: 1.2rem;
					}
					.me_content ul li span{
						display: inline-block;
					}
					.me_log2{
						margin-top: 0.2rem;
					}
					.me_cishan{
						font-size: 1rem;
					}
					.me_footer{
						width: 100%;
						position: fixed;
						bottom: 0;
						left: 0;
						font-size: 1rem;
					}
					.me_footer ul li{
						width: 25%;
						display: block;
						float:left;
						text-align: center;
					}
					.me_footer ul li img{
						display: inline-block;
						width: 20px;
						height: 20px;
					}
					.me_footer ul li span{
						display: block;
						text-align: center;
						color: #666;
					}
					.me_log3{
						margin-left: 4rem;
						line-height: 35px;
						font-size: 1.2rem;
						background: #00A0E8;
					}
					.GG{
						width:100%;
					}
				`}
            </style>
            <div className="me_top">个人中心<Link to="/"><span className="me_left">返回</span></Link></div>
			<div className="me_title">
				<img src="/public/images/lg.png" className="me_tx"/>
				<p className="me_name">ID号：{user.username}</p>
				<p className="me_name"><span>VIP：{user.level} </span>  |  银元：{Math.floor(user.gold* 100) / 100  }  |  金元：{Math.floor(user.goldCoin* 100) / 100  }</p>
			</div>
			<div className="me_content">
				<ul>
					<Link to='/gerenziliao'>
						<li>
							<span className="me_titleer">个人资料</span>
							<img src="/public/images/46.png" className="me_you" />
						</li>
					</Link>
					<Link to="/tuandui">
						<li>
							<span className="me_titleer" >我的团队</span>
							<img src="/public/images/46.png" className="me_you" />
						</li>
					</Link>
					<Link to={{pathname:'/editPwd'}}>
						<li>
							<span className="me_titleer">修改密码</span>
							<img src="/public/images/46.png" className="me_you" />
						</li>
					</Link>
					<Link to="/upgrade">
						<li>
							<span className="me_titleer" >原点升级</span>
							<img src="/public/images/46.png" className="me_you" />
						</li>
					</Link>
					<Link to="/tixian">
						<li>
							<span className="me_titleer" >提现</span>
							<img src="/public/images/46.png" className="me_you" />
						</li>
					</Link>
					<li onClick={this.logOut.bind(this)}>
						<span className="me_titleer" >切换账号</span>
						<img src="/public/images/46.png" className="me_you" />
					</li>
					<li>
						<img src="/public/images/x5.png" className="GG" />
					</li>
				</ul>
			</div>
		</div>
		)
	}
}

Me.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user:state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...userAct}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Me)