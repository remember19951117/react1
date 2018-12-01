/**
 * 商城首页
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import styles from '../../css/duihuan.css';
class Duihuan extends Component{


	componentDidUpdate(){
		$('.am-slider').flexslider();
	}
 
	componentDidMount(){
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	onClickDui(){
        var password = this.refs.psw.value;
        var number = this.refs.number.value;
		const { exce } = this.props;
        let context = this;
		exce(number, password).then(function(json){
            if(json.statusCode == 101){
                context.refs.psw.value = "";
                context.refs.number.value = "";
				$('.alertMessage').text(json.message);
				$('#my-alert').modal('open');
            }else{
                $('.alertMessage').text(json.message);
				$('#my-alert').modal('open');
            }
    	});
	}

	render(){
		return(
			<div className="wrap">
			<div className="top"><Link to="/"><img src="/public/images/arr.png" className="im" /><span className="left">返回</span></Link><span className="right">我要兑换</span></div>
			
			<div className="yongyou">
				<p>您现在可兑换{user.zhangtongbao}分</p>
			</div>
			<div className="shezhi">
				<p>设置数量</p>
			</div>
			<div className="chushou">
				<span className="chushou_left">兑换数量：</span>
				<input ref="number" type="text" name="" id="" />
				
			</div>
                <div className="chushou">
                <span className="chushou_left">交易密码：</span>
				<input ref="psw" type="text" name="" id="" />
				
				<p>
					<input type="button" onClick={this.onClickDui.bind(this)} name="" id="" placeholder="确定" className="bottom" value="确定"/>
				</p>
			</div>
            <div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
				  	<div className="am-modal-dialog">
				    	<div className="am-modal-hd">温馨提示</div>
				    	<div className="am-modal-bd alertMessage">
				      		
				    	</div>
				    	<div className="am-modal-footer">
				      		<span className="am-modal-btn">确定</span>
				    	</div>
				  	</div>
			</div>
		</div>
		)
	}
}

Duihuan.contextTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(Duihuan)



