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

class ActivationList extends Component {
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
		})
	}

	componentDidUpdate() {
		$('.am-slider').flexslider();
	}

	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	//传ID 激活页面
	onClickActi(item){
		const { user } = this.props;
		this.context.router.push("/ActivationListdetails/"+item._id)
	}
	render() {
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
							background: url(/public/images/bg.png) no-repeat !important;
						}
						.GR_context ul li{
							background: url(/public/images/bg.png) no-repeat !important;
							width: 100%;
							height: 2.5rem;
							border-bottom: 1px solid #03A1BA;
							line-height: 2.5rem;
							font-size: 0.8rem;
							color:#03A1BA;
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
						
					`}
				</style>
				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">待激活列表</span>
				</div>
				<div className="GR_context">
					<ul>
						<li>
							<Row className="listCenter1" type="flex" align="middle">
								<Col className="listHD" offset={2} span={5}>账号</Col>
								<Col className="listHD" span={12}>123123123</Col>
								<Col className="listHD" span={4}><Link to="/ActivationListdetails" onClick={this.onClickActi.bind(this)}>激活</Link></Col>
							</Row>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

ActivationList.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivationList)



