/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';

class JiluXiangqing extends Component{

	state = {
		info:{}
	}

	componentWillMount(){
		const { getTansInfo } = this.props;
		const context = this;
		getTansInfo(this.props.params.id).then(function(result){
			if(result.status){
				context.setState({info:result.resource})
			}
		})
	}

	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	formtTime(time){
		var d = new Date(Number(time));
		return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
	}	

		
	render(){
		// //console.log(this.state.info);
		return(
			<div className="ge_wrap">
				<style>
				{`
				ul,li{
					list-style: none;
				}
				html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
					margin: 0;
					padding: 0;
				}
				html,body{
					background-size:100% 100%;
					background: url(/public/images/bg.png) no-repeat;
					height:100%
					
				}
				.ge_wrap{
					width:100%;
					// color: #ff0000;
					background: url(/public/images/bg.png) no-repeat;
					background-size:100% 100%;
					position:relative;
					color: #00C8D0;
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
					border-bottom:1px solid #00C8D0;
				}
				.J_left{
					float: left;
					color: #00C8D0;
					position:absolute;
					left:5%;
				}
				.number{
					width: 100%;
					height: 4rem;
					color: #00C8D0;
					text-align: center;
					border-bottom: 1px solid #00C8D0;
				}
				.number p{
					display: inline-block;
					margin-top: 1rem;
					font-size: 1rem;
					color: #00C8D0;
				}
				
				.xiangqing{
					width: 100%;
					padding: 0.8rem;
					margin-top: 1rem;
					font-size: 0.8rem;
					color: #00C8D0;
					border-bottom: 1px solid #00C8D0;
				}
				.xiangqing ul li{
					margin-top:0.5rem; 
				}
				.xiangqing ul li p{
					width: 100%;
					height: 1.5rem;
				}
				.xq_left{
					float: left;
				}
				.xq_right{
					float: right;
				}
				.xiangqing2{
					width: 100%;
					height: 17rem;
					padding: 0.8rem;
					margin-top: 1rem;
					font-size: 0.8rem;
					color: #00C8D0;
					border-bottom: 1px solid #00C8D0;
				}
				.xiangqing2 ul li{
					margin-top:0.5rem; 
				}
				.xiangqing2 ul li p{
					width: 100%;
					height: 1.5rem;
				}
					`}
			</style>
			<div className="J_top"><Link  ><span onClick={()=>{this.props.history.go(-1)}} className="J_left">《</span></Link><span>W积分挂卖</span></div>
			<div className="number">
				<p>交易积分数量：{this.state.info.sum}</p>
				<p></p>
			</div>
			<div className="xiangqing">
				<ul>
					<li><p><span className="xq_left">卖方账号</span><span className="xq_right">{this.state.info.seller}</span></p></li>
					<li><p><span className="xq_left">卖方姓名</span><span className="xq_right">{this.state.info.sellerName}</span></p></li>
					<li><p><span className="xq_left">卖方电话</span><span className="xq_right">{this.state.info.sellerMobile}</span></p></li>
					<li><p><span className="xq_left">卖方开户名</span><span className="xq_right">{this.state.info.bankUser}</span></p></li>
					<li><p><span className="xq_left">卖方开户行</span><span className="xq_right">{this.state.info.bank}</span></p></li>
					<li><p><span className="xq_left">卖方银行卡</span><span className="xq_right">{this.state.info.bankCard}</span></p></li>
				</ul>
			</div>
			<div className="xiangqing2">
				<ul>
					<li><p><span className="xq_left">买方账号</span><span className="xq_right">{this.state.backStage==1||this.state.buyer=="admin"?"公司回购":this.state.info.buyer}</span></p></li>
					<li><p><span className="xq_left">买方姓名</span><span className="xq_right">{this.state.info.buyerName}</span></p></li>
					<li><p><span className="xq_left">买方电话</span><span className="xq_right">{this.state.info.buyerMobile}</span></p></li>
					<li><p><span className="xq_left">创建时间</span><span className="xq_right">{this.formtTime(this.state.info.createTime)}</span></p></li>
					<li><p><span className="xq_left">订单号</span><span className="xq_right">{this.state.info._id}</span></p></li>
				</ul>
			</div>

		</div>
		)
	}
}

JiluXiangqing.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user:state.user,
		jiaoyiXQ:state.jiaoyiXQ
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...userAct}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(JiluXiangqing)



