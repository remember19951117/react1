/**
 * 单页入口页面
 */

import 'antd/dist/antd.less';
import 'font-awesome/less/font-awesome.less';
import 'amazeui/dist/css/amazeui.css';
import '../../css/icons/iconfont.css';
import "amazeui/dist/js/amazeui.js";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/user';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

class Index extends Component {

	componentWillMount() {
		const { user, refresh } = this.props;
		// //console.log(user);
//		const contt = this;
//		if (user._id) {
//			refresh().then(function (message) {
//				//console.log(message);
//				if (message) {
//					contt.context.router.push("/denglu");
//				}
//			})
//		}
	}
	componentDidMount() {
		const $modal = $('#my-modal-loading');
		$modal.modal("open");
	}
	render() {
		return (
			<LocaleProvider locale={enUS}>
				<div>
					{this.props.children}
					<div className="am-modal am-modal-loading am-modal-no-btn" tabIndex="-1" id="my-modal-loading">
						<div className="am-modal-dialog">
							<div className="am-modal-hd">正在载入...</div>
							<div className="am-modal-bd">
							<span className="am-icon-spinner am-icon-spin"></span>
							</div>
						</div>
					</div>
				</div>
			</LocaleProvider>
		)
	}
}
Index.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...userAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

