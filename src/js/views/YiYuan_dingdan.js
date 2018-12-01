/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import { storeNumber } from '../actions/yiyuan';
import Link from 'react-router/lib/Link';
import * as Settings from '../settings';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class YiYuan_dingdan extends Component{
	state = {
		list : [],
		pageSize:20,
		page:1,
		initl:0,
	}
	componentDidMount(){
		const { storeNumber } = this.props;
		const constext = this;
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		const { ZJJLList } = this.props;
		const context = this;
		ZJJLList(this.state.page,this.state.pageSize).then(function(result){
			if(result.status){
				context.setState({list:result.resource})
				constext.refs.price.value = 0;
				storeNumber(2*20);
			}
		})

	}

	cut(){
		const { storeNumber } = this.props;
		var price = parseInt(this.refs.price.value);
		if(price > 0){
			//storeNumber((price-1)*20);
			this.refs.price.value = price-1;
			 this.setState({ initl:(price-1)*20  })
		}
	}
	add(){
		const { storeNumber } = this.props;
		var price = parseInt(this.refs.price.value);
		price++;
		this.refs.price.value = price;
		this.setState({ initl:(price)*20  })
		//storeNumber(price*20);
		
	}
	
	inputOnBlur(){
		this.setState({ focus: false });
	}
	render(){
		const { yiyuanNumber } = this.props;
		// //console.log(this.props.price)
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list = [] } = this.state;
		// //console.log(list);
		const context = this;
		return(
			<div className="big" >
				<style>
					{`	
					html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
							margin: 0;
							padding: 0;	
						}
					body{
							height:auto;
							background:#ebebeb;	
							position:relative;
						}
					 .JY_top{
							width:100%;
							text-align: center;
							color: #ffffff;
							height: 2.5rem;
							line-height: 2.5rem;
							font-size: 1rem;
							background: #3778EC;
							font-weight: bold;
							border:1px solid #ccc;
							overflow:hidden;
						}
						.JY_left{
							float: left;
							color: #fff;
							position:absolute;
							left:5%;
						}
						.top_img{
							width:100%;
							height:10rem;
							overflow:hidden;
							background:#ffffff;
							padding:0.5rem 1rem;
							color:#000;
						}
						.frequency{
							width:100%;
							height:3rem;
							line-height:3rem;
						}
						.frequency_left{
							float:left;
							width:50%;
							height:3rem;
						}
						.frequency_right{
							float:right;
							width:50%;
							height:3rem;
						}
						.frequency_right input{
							text-align:center;
							font-size:1rem;
							background-color:#f0f0f0;
							border:0;
						}
						.right_1{
							width:2rem;
							height:2rem;
						}
						.right_2{
							width:4rem;
							height:2rem;
							text-align:center;
						}
						.right_3{
							width:2rem;
							height:2rem;
						}
						.tit{
							marigin-top:1rem;
							width:100%;
							background:#ffffff;
							padding:0.5rem 1rem;
							margin:1rem 0;
						}
						.bottom{
							position:absolute;
							width:100%;
							height:3rem;
							background:#ffffff;
							bottom:0;
						}
						.bottom_left{
							width:70%;
							height:3rem;
							float:left;
							border:1px solid #ccc;
							line-height:3rem;
							background:#ffffff;
							padding-left:1rem;
						}
						.bottom_right{
							wdith:30%;
							height:3rem;
							float:right:
							background:#3778EC;
							line-height:3rem;
							text-align:center;
							fong-size:2rem;
							color:#000;
						}
						
					`}
				</style>
				<div className="JY_top"><Link to = "/YiYuan_details"><span className="JY_left">返回</span></Link><span>提交订单</span></div>
				<div className="top_img">
					<p>杀手多久爱上课了点击撒打算是否手多久爱上课了点击撒打算是否</p>
					<div className="frequency">
						<div className="frequency_left">参与次数</div>
						<input className="right_1" id="cut" type="button"  value="-" onClick={context.cut.bind(context)} />
						<input className="right_2" id="num" type="number" defaultValue="0" ref="price"/>
						<input className="right_3" id="add" type="button"  value="+" onClick={context.add.bind(context)} />
					</div>
				</div>  
				<div className="tit"><p>联系电话：15893045688</p></div>
				<div className="bottom">
					<div className="bottom_left">订单金额：{ context.state.initl } 金元</div>
					<div className="bottom_right">提交订单</div>
				</div>
			<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
				  	<div className="am-modal-dialog">
				    	<div className="am-modal-hd">温馨提示</div>
				    	<div className="am-modal-bd alertMessage"></div>
				    	<div className="am-modal-footer">
				      		<span className="am-modal-btn">确定</span>
				    	</div>
				  	</div>
			</div>		
		</div>
		)
	}
}

YiYuan_dingdan.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user:state.user,
		yiyuanNumber: state.yiyuanNumber
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...userAct, storeNumber}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(YiYuan_dingdan)



