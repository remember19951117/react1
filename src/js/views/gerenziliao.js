/**
 * 修改个人资料
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
//import Row from 'antd/lib/row';
//import Col from 'antd/lib/col';
//import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
//import message from 'antd/lib/message';


import { APIHost } from '../actions/utils/fetch';
import * as auth from '../actions/utils/auth';
// function getBase64(img, callback) {
// 	const reader = new FileReader();
// 	reader.addEventListener('load', () => callback(reader.result));
// 	reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
// 	const isJPG = file.type === 'image/jpeg';
// 	if (!isJPG) {
// 		message.error('You can only upload JPG file!');
// 	}
// 	const isLt2M = file.size / 1024 / 1024 < 2;
// 	if (!isLt2M) {
// 		message.error('Image must smaller than 2MB!');
// 	}
// 	return isJPG && isLt2M;
// }
class Gerenziliao extends Component {
	state = {
		loading: false,
	};
	handleChange = (info) => {
		//console.log('info', info)
		//console.log('info', info.file.name)
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => this.setState({
				imageUrl,
				loading: false,
			}));
		}
	}
	componentDidMount() {
		const $LoadingDom = $('#my-modal-loading');
		$LoadingDom.modal('close');
		const { user } = this.props;
		//console.log("user", user)
		this.refs.cover.value = user.imgUrl;
		this.refs.cover.src = user.imgUrl;

		
	}
	componentDidUpdate() {
		const { user } = this.props;
		if (user.cover != "") {
			this.refs.cover.src = user.imgUrl;

		}
	}
	editUser() {
		const { submitEditUser, pushUser, user } = this.props;
		if (!this.refs.bank.value) { $('.alertMessage').text("请输入银行名称！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.bankUser.value) { $('.alertMessage').text("请输入银行开户名！"); $('#my-alert').modal('open'); return; }
		if (!this.refs.bankCard.value) { $('.alertMessage').text("请输入银行卡号！"); $('#my-alert').modal('open'); return; }
		// if (!this.refs.address.value) { $('.alertMessage').text("请输入收货地址！"); $('#my-alert').modal('open'); return; }
		var cover = this.refs.cover.src;
		//console.log(this.refs.cover.src)
		var data = {
			"imgUrl": cover,
		}
		if (this.refs.bank.value) { data.bank = this.refs.bank.value }
		if (this.refs.bankCard.value) { data.bankCard = this.refs.bankCard.value }
		if (this.refs.bankUser.value) { data.bankUser = this.refs.bankUser.value }
		if (this.refs.alipay.value) { data.alipay = this.refs.alipay.value }
		if (this.refs.wechat.value) { data.wechat = this.refs.wechat.value }
		
		// var data = {
		// 	"mobile" : this.refs.mobile.value,
		// 	"bankCard" : this.refs.bankCard.value,
		// 	"bank" : this.refs.bank.value,
		// 	"alipay":this.refs.alipay.value,
		// }
		const context = this;
		//console.log(data)
		submitEditUser(data).then(function (result) {
			//console.log(result);
			if (result.status) {
				pushUser(data);
			}
			$('.alertMessage').text(result.message);
			$('#my-alert').modal('open');
		});
	}
	//上传头像
	getLocalImg(e) {
		const { uploadImageAct } = this.props;
		var formData = new FormData();
		formData.append("Filename", e.target.files[0].name);
		formData.append("imgFile", e.target.files[0]);
		const context = this;
		uploadImageAct(formData).then(function (result) {
			//console.log("222", result);
			if (result.error == 0) {
				context.refs.cover.src = APIHost + result.url;
			}
		});
	}
	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return  d.getFullYear()+"年"+(d.getMonth() + 1)+"月"+d.getDate()+"日"+d.getHours()+"时"+d.getMinutes()+"分";
		}
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const imageUrl = this.state.imageUrl;
		const { user } = this.props;
		// //console.log(this.props)
		// //console.log(user)
		return (
			<div className="wrap">
				<style>
					{`
						.body{
							background-size:100% 100%;
							background: url(/public/images/bg.png) no-repeat;
						}
						a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
							margin: 0;
							padding: 0;
							border: 0;
							font: inherit;
							vertical-align: baseline;
						}
						ul,li,ol{
							list-style: none;
						}
						img{
							border: none;
						}
						
						.wrap{
							width: 100%;
							height: 100%;
							background: url(/public/images/bg.png) no-repeat;
						}
						.GR_top{
							text-align: center;
							color: #03A1BA;
							height: 2.5rem;
							line-height: 2.5rem;
							font-size: 1rem;
							background: #000;
							border-bottom:1px solid #00C8D0;
						}
						.GR_out{
							float: left;
							color: #03A1BA;
							margin-left: 1rem;
						}
						.GR_zc{
							position: absolute;
							left: 50%;
							margin-left:-2rem;
						}
						.GR_out link{
							color: #03A1BA;
						}
						.GR_context{
							background: url(/public/images/bg.png) no-repeat;
							background-size:100% 100%;
							position:relative;
						}
						
						.GR_context ul{
							background: url(/public/images/4s6.png) !important;
							margin-top: 0.7rem;
						}
						.GR_context ul li{
							background: url(/public/images/4s6.png) !important;
							width: 100%;
							height: 3.2rem;
							border-bottom: 1px solid #00F1FA;
							line-height: 3.2rem;
							font-size: 0.8rem;
						}
						.GR_context ul li span{
							float: left;
							padding-left: 2rem;
							color: #03A1BA;
						}
						.GR_context ul li input{
							display: block;
							float: right;
							width: 60%;
							margin-top: 1rem;
							margin-right: 2rem;
							text-align:right;
							background: url(/public/images/4s6.png) !important;
								white-space:nowrap;
								border:none;
								outline:none;
							color:#03A1BA;
						
						}
						.GR_context ul li img{
							float:right;
							margin-top: 1rem;
							margin-right:2rem;
							width:3%;
						}
						.GR_btn input{
							width: 90%;
							height: 3.2rem;
							background: #08B5D0;
							line-height: 3.2rem;
							font-size: 0.8rem;
							text-align:center;
							margin:2rem 5% 2rem 5%;
							color:#fff;
							font-size:1rem;
						}
						.TX{
							width:100%;
							text-align:center;
						}
						.TX_rad{
							width: 8rem;
							height: 8rem;
							margin: auto;
							border-radius: 50%;
							margin-bottom: 1rem;
							overflow:hidden;
							margin-top:1rem;
						}
						.TX_rad img{
							width:100%;
							height:8rem;
						}
						.TX_rad input{
							// display:none;
						}
						.byn{
							background:none;
							white-space:nowrap;
							border:none;
							outline:none;
							color:#03A1BA;
						}
						.avatar-uploader > .ant-upload {
							width: 128px;
							height: 128px;
						  }
						  .rc-upload img{
							  width:100%;
						  }
						  .ant-upload.ant-upload-select-picture-card{
							  padding:0 0;
							  border:0;
						  }
						  .anticon{
							  padding:20px;
							  font-size:32px;
							  color:#999;
						  }
					`}
				</style>
				<div className="GR_top">
					<Link to="/nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.gerenziliao01}</span>
				</div>
				<div className="TX">
					<div className="TX_rad">
						<form id="uploadForm">
							<h4 className="clearMargin">
								<style>
									{`
				            		.fengmianDiv{
			            			// width: 246px;
			            			// height: 130px;
				            		}
				            		.fengmianDiv input{ display:none;}
				            		// .fengmianDiv img{ width: 110px; height: 130px;}
						            `}
								</style>                                                                                  
								<label className="fengmianDiv">
									<input type="file" onChange={this.getLocalImg.bind(this)} />
									<img className="id_card" ref="cover" name="enter_imgsPath" src="/public/img/jia.jpg" />
								</label>
							</h4>
						</form>
					</div>
				</div>
				<div className="GR_context">
					<ul>
						<li><span>{lang.gerenziliao02}</span><input type="text" value={user.username} ref="username" /></li>
						<li><span>{lang.gerenziliao16}</span><input type="text" value={formtTime(user.createTime)} ref="username" /></li>
						<li><span>{lang.gerenziliao17}</span><input type="text" value={user.jihuoTime?formtTime(user.jihuoTime):"暂无法展示"} ref="username" /></li>
						<li><span>{lang.gerenziliao03}</span><input type="text" value={user.registerJibie} ref="username" /></li>
						<li><span>{lang.gerenziliao04}</span><input type="text" value={user.name} ref="name" /></li>
						<li><span>{lang.gerenziliao05}</span><input type="text" value={user.mobile} ref="mobile" /></li>
						<li><span>{lang.gerenziliao06}</span><input type="text" value={user.shenfenCard} ref="shenfenCard" /></li>
						<li><span>{lang.gerenziliao07}</span><input type="text" defaultValue={user.bank} ref="bank" placeholder="请完善银行名称" /></li>
						<li><span>{lang.gerenziliao08}</span><input type="text" defaultValue={user.bankUser} ref="bankUser" placeholder="请完善开户名" /></li>
						<li><span>{lang.gerenziliao09}</span><input type="text" defaultValue={user.bankCard} ref="bankCard" placeholder="请完善银行卡号" /></li>
						<li><span>{lang.gerenziliao10}</span><input type="text" defaultValue={user.alipay} ref="alipay" placeholder="请完善支付宝账号" /></li>
						<li><span>{lang.gerenziliao11}</span><input type="text" defaultValue={user.wechat} ref="wechat" placeholder="请完善微信账号" /></li>
						<li><span>{lang.gerenziliao12}</span><input type="text" defaultValue={user.address} ref="address" placeholder="请完善收获地址" /></li>
						<li><Link to="/editPwd"><span>{lang.gerenziliao13}</span><img src="/public/images/you.png" /></Link></li>
						<li><Link to="/editPwd2"><span>{lang.gerenziliao14}</span><img src="/public/images/you.png" /></Link></li>
					</ul>
				</div>
				<div className="GR_btn" onClick={this.editUser.bind(this)} ><input type="button" value={lang.gerenziliao15} className="byn" /></div>
				<div className="am-modal am-modal-alert" tabIndex="-1" id="my-alert">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">{lang.home09}</div>
						<div className="am-modal-bd alertMessage"></div>
						<div className="am-modal-footer">
							<span className="am-modal-btn">{lang.home10}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
Gerenziliao.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Gerenziliao)



