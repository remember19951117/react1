/**
 * 用户 子账号 管理
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
class Gerenziliao_list_list extends Component {
	constructor(props) {
		super(props);
		/*关键就是这里，把要使用this的函数  在构造函数中用bind方法传入this*/
		this.chilid_login = this.chilid_login.bind(this)
		this.password_change = this.password_change.bind(this)
		this.userLogin = this.userLogin.bind(this)

	}
	state = {
		loading: false,
		page: 1,
		size: 10000,
		user_list: [],
		password_change: '',
		username: '',
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
		const { user, get_user_child } = this.props;
		//console.log(this.state.page)
		const content = this

		get_user_child(this.state.page, this.state.size).then(function (result) {
			//console.log(result)
			content.setState({
				user_list: result.resource,
			})
			//console.log(content.state.user_list)
		})


	}

	chilid_login(e) {
		// let username = $(".amdin").value;
		// //console.log(username)
		// let password = this.refs.password.value;

		const { login } = this.props


		//console.log(this.state.password_change)
		// //console.log(userAct.login)
		//console.log(this.state.username)
		$(".modal_user").hide()

		const context = this;
		login(this.state.username, this.state.password_change).then(function (message) {
			//console.log(message)
		
			if (message) {
				//console.log(message)
				$('.alertMessage').text(message);
				$('#my-alert').modal('open');
				return message;
			} else {
				context.context.router.push('/');
			}
		});



	}
	chilid_login_out(e) {
		$(".modal_user").hide()
	}

	userLogin( a) {
		$(".modal_user").show()
		// var user=a.username
		//console.log(this)
		//console.log(a)
		this.setState({
			username:a.username
		})

	


	}
	componentDidUpdate() {
		const { user } = this.props;

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
	password_change(e) {
		//console.log(e.target.value)

		this.setState({
			password_change: e.target.value
		})

	}

	render() {
		const lang = auth.getLang();
		const formtTime = (time) => {
			var d = new Date(Number(time));
			return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分";
		}
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const imageUrl = this.state.imageUrl;
		const { user } = this.props;


		var list = this.state.user_list
		const context = this;

		return (
			<div className="wrap">
				<style>
					{`
					#root{
						height: 100%;
					}
					#root> div{
						height: 100%;
					}

					.wrap{
						height: 100%;
					}
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
							// text-align: center;
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
						.GR_context ul li span{
							display: inline-block;
							position: relative;
							top: -16px;
							color: #01a1a8;
						}
						.GR_context ul li img{
						
							display: inline-block;
							width: 3rem;
							border-radius: 50%;
							height: 100%;
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
						.GR_context   .user_chlid_list{
							width: 80%;
							margin: 0 auto;
							border: 1px solid #00F1FA;
							border-radius: 7px;
							margin-bottom: 1rem;
							padding-left: 1rem;
						  }
						  .user_list{
							text-align: center;
							color: #ffffff;
							padding: 10px;

							border-bottom: 1px solid #2abada;
						  }
						  .GR_zc{
							margin-left: -2.5rem;
						  }
						  .modal_user{
							width: 100%;
							height: 100%;
							position: fixed;
							top: 0;
							left: 0;
							right: 0;
							text-align: center;
							background: rgba(0,0,0 ,0.5);
							display: none;
						  }
						  .modal_user_content{
							position: relative;
							top: 37%;
						  }
						  .error{
							color: #ffff;
							padding-top: 21px;
						  }
					`}
				</style>
				<div className="GR_top">
					<Link to="nav"><span className="GR_out">《</span></Link>
					<span className="GR_zc">{lang.nav0666}</span>
				</div>

				<div className="GR_context">
					<div className="user_list">
						账号列表
				</div>
				

					{list ?
						list.map(function (v, k) {
							return (
								<div className="GR_context" key={k}>
									<ul key={k}>
										<li key={k} className="user_chlid_list" onClick={() => context.userLogin(v)} ><img src={v.imgUrl} alt="" /> <span className="use_name">{v.username}</span>   </li>
									</ul>
								</div>
							);
						}) : <div className="error">暂无数据</div>
					}
				</div>

				<div className="modal_user" tabIndex="-1" >
					<div className="am-modal-dialog  modal_user_content">
						<div className="am-modal-bd " id="my_user_list_login">
							<label>请输入密码</label>
							<input type="text" ref="username" className="amdin" value={this.state.password_change} onChange={this.password_change} style={{ opacity: '0.5', border: '1px solid #068297' }} placeholder="账号" />
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn" onClick={context.chilid_login}>登陆</span>
							<span className="am-modal-btn" onClick={context.chilid_login_out}>取消</span>
						</div>
					</div>
				</div>



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
Gerenziliao_list_list.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Gerenziliao_list_list)



