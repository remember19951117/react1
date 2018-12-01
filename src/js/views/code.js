/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import * as Settings from '../settings';
import * as auth from '../actions/utils/auth';
// import styles from '../../css/code.css';
class Code extends Component {

	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
	}

	render() {
		const lang = auth.getLang();
		const { user } = this.props;
		return (
			<div className="wrap">
				<style>
					{`
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
				.code_imger{
					margin: 2rem auto;
					display:flex;
					text-align:center;
					display:block;
				}
				.code_imger img{
					display:inline-block;
				}
				.code_zhushi{
					color: #03A1BA;
					text-align:center;
				}
			`}
				</style>

				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.code01}</span>
				</div>
				<div className="code_imger">
					<img src={"http://qr.liantu.com/api.php?text=http://47.92.88.214:4030/zhuce?username="+user.username} />
				</div>
				<div className="code_zhushi">
					<p className="code_four">{lang.code02}</p>
					<p className="code_three">http://qr.liantu.com/api.php?text=http://www.ztkj169.com/mobile/zhuce?username=</p>
				</div>
			</div>
		)
	}
}

Code.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Code)



