/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsAct from '../actions/newsAct';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import * as auth from '../actions/utils/auth';
class GongGaoList extends Component {
	state = {
		list: [],
		pageSize: 10000,
		page: 1,
	}
	componentWillMount() {
		const { newsListAct } = this.props;
		const context = this;
		newsListAct(this.state.page, this.state.pageSize).then(function (result) {
			//console.log(result);
			if (result.status) {
				context.setState({ list: result.resource })
			}
			//console.log(	context.state.list)
		})
	}
	componentDidUpdate() {
		$('.am-slider').flexslider();
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}
	//公告详情
	onClickList(item) {
		const { newsInfoAct } = this.props;
		this.context.router.push("/gongGao/" + item._id);
	}
	render() {
		const lang = auth.getLang();
		const { list } = this.state;
		const context = this;
		return (
			<div className="wrap">
				<style>
					{`
						a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
							margin: 0;
							padding: 0;
							border: 0;
							font: inherit;
							vertical-align: baseline;
						} 
						input{
							white-space:nowrap;
						}
						ul,li,ol{
							list-style: none;
						}
						img{
							border: none;
						}
						html,body{
							background: url(/public/images/bg.png) no-repeat !important;
							background-size:100% 100%;
							position:relative;
						}
						.wrap{
							width: 100%;
							height: 100%;
							background: url(/public/images/4s6.png) no-repeat !important;
						}
						.gr_clearfix{
							height: 0.5rem;
							background:#ebebeb ;
						}
						.xuanchuan img{
							width:100%;
						}
						.GR_top{
							text-align: center;
							color: #03A1BA;
							line-height: 3.3rem;
							background: #000;
							border:1px solid #03A1BA;
						}
						.GR_out{
							float: left;
							color: #03A1BA;
							margin-left: 1rem;
						}
						.GR_out link{
							color: #03A1BA;
						}
						.GR_context {
							width:95%;
							margin:1rem auto;
							background: #fff;
							background:url(/public/images/jifen.png) 100%;
							background-size:100% 100%;  
							color:#03A1BA;
							height:6rem;
						}
						.GR_context ul li{
							// width: 100%;
							// height: 2.5rem;
							// background: #fff;
							// border-bottom: 1px solid #ccc;
							// line-height: 2.5rem;
							// font-size: 0.8rem;
							height:7rem;
							background:url(/public/images/jifen.png) 100%;
							background-size:100% 100%;  
							color:#fff;
							margin-top:1rem;
						}
						.GR_context ul li span{
							float: left;
							line-height: 2.5rem;
							padding-left: 1rem;
							color: #666;
						}
						.GR_context ul li a{
							display: inline-block;
							float: right;
							color:#dc1804 ;
							padding-right: 1.8rem;
						}
						.sright{
							margin-left:60%;
						}
						.xt{
							line-height:1.5rem;
						}
						.tt{margin-top:1rem;}
						.null_list{
						    margin: 0 auto;
							text-align: center;
							color: #fff;
							margin-top: 10px;
						}
					`}
				</style>
				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.GongGaoList01}</span>
				</div>
			

				 {  list.length!= 0 ?
					list.map(function (v, k) {
						return (
							<div className="GR_context" key={k} onClick={context.onClickList.bind(context, v)}>
								<Row className="list" type="flex" align="middle">
									<Col className="xt" span={18} offset={2} style={{ color: "#fff" }}>{lang.GongGaoList01}</Col>
									<Col className="xt tt" offset={3} span={18}>{v.title}</Col>
									<Col className="xt" offset={12} span={12}>{v.lastTime}</Col>
								</Row>
							</div>
						);
					}):<div className="null_list">暂无信息!</div>
				}

			</div>
		)
	}
}

GongGaoList.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		// user:state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...newsAct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GongGaoList)



