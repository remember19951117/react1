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
import { APIHost } from '../actions/utils/fetch';
import * as auth from '../actions/utils/auth';
class YiYuanGou extends Component {
	state = {
		list: [],
		list2: [],
		pageSize: 10000,
		page: 1,
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		const context = this;
		const { Shoppinglist } = this.props;
		Shoppinglist(this.state.page, this.state.pageSize).then(function (result) {
			if (result.status) {
				// //console.log(result);
				context.setState({ list2: result.resource,sum: result.sum,zongyeshu:parseInt(result.sum/20)+1 })
			}
		})
	}
	//商品详情
	Listdetails(item) {
		// //console.log(item)
		const { detailslist } = this.props;
		this.context.router.push("/yiYuan_details/" + item._id)
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const { list, list2 } = this.state;

		// //console.log(list2);
		const context = this;
		return (
			<div className="big" >
				<style>
					{`	
					html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
							margin: 0;
							padding: 0;	
						}
					body{
							background:#ebebeb;	
						}
					html{
						background:#ebebeb;	
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
					.GR_right{
						float: right;
						color: #03A1BA;
						margin-right: 1rem;
					}	
						.roll{
							width:100%;
							height:2.5rem;
							background:#ebebeb;
							border:1px solid #A0A0A0;
							border-top:0;
							line-height:2.5rem;
							position:relative;
							box-sizing: border-box;
							overflow:hidden;
						}
						.roll img{
							float: left;
							color: #fff;
							position:absolute;
							left:5%;
							width:5%;
							top:25%;
						}
						.roll p{
							display:block;
							float: left;
							height:100%;
							margin-left:6rem;
						}
						.roll_btmm{
							font-size:0.8rem;
						}
						.roll_btmm ul li{
							margin-left:4rem;
							font-size:0.8rem;
						}
						.bodyer{
							margin-top:0.5rem;
							width:100%;
							height:100%;
						}
						.bodyer ul li{
							float:left;
							margin-left:3%;
							border:1px solid #dedede;
							width:45%;
							height:18rem;
							background:#EFEFEF;
							fong-size:12px;
							position:relative;
							margin-top:0.5rem;
							{/*box-shadow:0 0 1px #000;*/}
						}
						.bodyer ul li .imgt{
							width:100%;
							height:12rem;
						}
						.bodyer ul li span{
							display:block;
							overflow:hidden;
							color:#464545;
							padding:0 0.3rem;
						}
						.zong{
							position:absolute;
							width:100%;
							bottom:0;
							// font-size:0.5rem;
							line-height:2rem;
						}
						.zong_left{
							padding-left:5px;
							width:50%;
							float:left;
							color:#707070;
						}
						.zong_right{
							width:50%;
							float:right;
						}
						.zong_right img{
							float:right;
							width:90%;
							padding-right:15px;	
							// padding-top:5px;								
						}
						.ant-row-flex{
							display:block;
						}
						.listHD{
							text-align:center;
						}
						.title{
							text-align:center;
							margin:0.8rem;
						}
					`}
				</style>
				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.YiYuanGou01}</span>
					<Link to="/buyshoplist"><span className="GR_right">{lang.YiYuanGou02}</span></Link>
				</div>
				<div className="bodyer">
					<ul>
						{
							list2.map(function (v, k) {
								const number = v.number ? v.number : 0;
								return (
									<li key={k}>
										<img src={APIHost + v.img} className="imgt" />
										<span className="title"><h4>{v.name}</h4></span>
										<div className="zong">
											<div className="zong_left">
												{/* <p>数量{v.turnout}件</p> */}
												<p>{lang.YiYuanGou03}{v.goldValue}</p>
											</div>
											<div className="zong_right">
												<span onClick={context.Listdetails.bind(context, v)}> <img src="/public/images/canyu.png" /> </span>
											</div>
										</div>
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

YiYuanGou.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(YiYuanGou)



