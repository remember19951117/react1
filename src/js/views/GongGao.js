/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsAct from '../actions/newsAct';
import Link from 'react-router/lib/Link';
import * as auth from '../actions/utils/auth';
class GongGao extends Component{
	constructor(props){
		super(props);
		this.state = {info:{}};
	}
	componentWillMount(){
		const { newsInfoAct } = this.props;
		const id = this.props.params.id;
		const context = this;
		newsInfoAct(id).then(function(result){
			//console.log(result);
			if(result.status){
			context.setState({info:result.resource})
			}
		})
	}

	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		const { GongGaoList } = this.props;
		GongGaoList().then((v) => {
			this.setState({list:v});
		})
	}
	
	componentDidUpdate(){
		$('.am-slider').flexslider();
	}

	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	


	render(){
		const lang = auth.getLang();
		const { info } = this.state;
		//console.log(info);
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  (d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		return(
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
						background:#000;
					}
					.wrap{
						width: 100%;
						height: 100%;
						border:1px solid #00C8D0;
					}
					pre{
						background:#000;
						color:#00C8D0;
					}
					.GR_top{
						text-align: center;
						color: #00C8D0;
						height: 2.5rem;
						line-height: 2.5rem;
						font-size: 1rem;
						background: #000;
						border-bottom:1px solid #00C8D0;
						font-weight: bold;
					}
					.GR_out{
						float: left;
						position: absolute;
						left: 5%;
					}
					.GR_zc{
						float: right;
					}
					.anno_context{
						background:#000 ;
						padding:0 0.6rem ;
						margin:1rem auto;
					}
					.anno_conall{
						margin:0 auto ;
					}
					.anno_title{
						line-height:2rem ;
						color:#00C8D0;
						padding-top:0.4rem ;
						font-weight: 600;
					}
					.anno_conall>span{
						font-size: 12px;
						color:#00C8D0;
					}
					.anno_text{
						margin-top:0.6rem ;
						padding-bottom:10rem ;
					}	
					.anno_text p{
						color:#00C8D0;
						font-size: 0.8rem;
						line-height:1.2rem ;
					}	
					`}
				</style>
			<div className="GR_top">
				<Link ><span   onClick={()=>{this.props.history.go(-1)}} className="GR_out">《</span></Link>
			{lang.gongGao}
			</div>
			<div className="anno_context">
				<div className="anno_conall">
					<h1 className="anno_title">{info.title}</h1>
					<span></span>
					<span>{formtTime(info.createTime)}</span>
					
					<div className="anno_text">
						<pre>
							{info.content}
						</pre>
					</div>
				</div>
				
			</div>
		</div>
		)
	}
}

GongGao.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user:state.user,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({...newsAct}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(GongGao)



