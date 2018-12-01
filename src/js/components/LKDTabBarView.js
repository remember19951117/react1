
import '../../css/common.css';
import React,{Component} from 'react';
import Link from 'react-router/lib/Link';

function storeNextViewUrl(){
	this.nextUrl = 1;
}
export default class LKDTabBarComponent extends Component{
	componentDidMount(){
		const { number } = this.props;
		storeNextViewUrl.nextUrl = number;
		$('.am-text-muted').removeClass('MTC_green');
		switch(storeNextViewUrl.nextUrl){
			case 1:
				$('.menu1').addClass('MTC_green');
				return;
			case 2:
				$('.menu2').addClass('MTC_green');
				return;
			case 3:
				$('.menu3').addClass('MTC_green');
				return;
			case 4:
				$('.menu4').addClass('MTC_green');
				return;
			default:
				$('.menu1').addClass('MTC_green');
				return;
		}
	}
	componentWillReceiveProps(){
		const { number } = this.props;
		storeNextViewUrl.nextUrl = number;
		$('.am-text-muted').removeClass('MTC_green');
		switch(storeNextViewUrl.nextUrl){
			case 1:
				$('.menu1').addClass('MTC_green');
				return;
			case 2:
				$('.menu2').addClass('MTC_green');
				return;
			case 3:
				$('.menu3').addClass('MTC_green');
				return;
			case 4:
				$('.menu4').addClass('MTC_green');
				return;
			default:
				return;
		}
	}
	popNextViewAct(url,number){
		const { history, refreshTabBarOfNumber } = this.props;
		storeNextViewUrl.nextUrl = number;
		refreshTabBarOfNumber({'item':number});
		history.push(url);
	}
	render(){
		const { number } = this.props;
		return(
			<div className="common_overflow am-text-center common_positionBottomStyle home_bottom MBC_white" style={{opacity: 1}}>
				<div className="am-g">
				    <div className="am-u-sm-3 am-padding-0">
				      <a className={number==1?"am-text-muted MTC_green menu1":"am-text-muted menu1"}>
				        <h4 onClick={this.popNextViewAct.bind(this,'/',1)} className="am-margin-vertical-sm"><span className="am-icon-home am-icon-md"></span></h4>
				      </a>
				    </div>
				    <div className="am-u-sm-3 am-padding-0">
				      <a className={number==2?"am-text-muted MTC_green menu2":"am-text-muted menu2"}>
				        <h4 onClick={this.popNextViewAct.bind(this,'/class',2)} className="am-margin-vertical-sm"><span className="am-icon-list-ul am-icon-md"></span></h4>
				      </a>
				    </div>
				    <div className="am-u-sm-3 am-padding-0">
				      <a className={number==3?"am-text-muted MTC_green menu3":"am-text-muted menu3"}>
				        <h4 onClick={this.popNextViewAct.bind(this,'/car',3)} className="am-margin-vertical-sm"><span className="am-icon-shopping-cart am-icon-md"></span></h4>
				      </a>
				    </div>
				    <div className="am-u-sm-3 am-padding-0">
				      <a className={number==4?"am-text-muted MTC_green menu4":"am-text-muted menu4"}>
				        <h4 onClick={this.popNextViewAct.bind(this,'/center',4)} className="am-margin-vertical-sm"><span className="am-icon-user am-icon-md"></span></h4>
				      </a>
				    </div>
				</div>
			</div>
		)
	}
}