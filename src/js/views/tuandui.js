/**
 * 商城首页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAct from '../actions/user';
import Link from 'react-router/lib/Link';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tree from 'antd/lib/Tree';
import Icon from 'antd/lib/Icon';
import * as auth from '../actions/utils/auth';
const TreeNode = Tree.TreeNode;

function getNewTreeData(treeData, curKey, child) {
    const loop = (data) => {
        data.forEach((item) => {
            if (item.children) {
                loop(item.children);
            } else {
                if (curKey == item.key) {
                    item.children = child;
                    return;
                }
            }
        });
    };
    loop(treeData);
}

function chuliList(value) {
    var list = [];
    value.forEach((item) => {
        if (item.teamNumber != 0) {
            var name = (<span><Icon type="team" />{"  【会员账号：" + item.username + "】【会员名称：" + item.name + "】"}</span>)
            list.push({ name, key: item.username });
        } else {
            var name = (<span><Icon type="team" />{"  【会员账号：" + item.username + "】【会员名称：" + item.name + "】"}</span>)
            list.push({ name, key: item.username, isLeaf: true });
        }
    });
    return list;
}

class Tuandui extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            treeData: [],
            result: [],
            vip: 1,
            cyzh:0,
        }
    }
  
    componentWillMount() {
        const $LoadingDom = $('#my-modal-loading');
        $LoadingDom.modal('close');
	}
      //获取列表
    componentDidMount() {
        const { getAllfriend2, user } = this.props;
        var context = this;
        getAllfriend2(user.username).then(function (result) {
            if (result.status) {
                // //console.log("result", result)
                context.setState({ result: result });
            }
        });
        $("#search").change(function(){
        	context.setState({
        		cyzh:$(this).val(),
        	});
        	});
    }
    //点击搜索
     search(){
     	this.getXJ(this.state.cyzh);
     }
     
    getXJ(result) {
        const { getAllfriend2, user } = this.props;
        var context = this;
        // //console.log("result2", result)
        getAllfriend2(result).then(function (result) {
            if (result.statusCode==107) {
                // //console.log("result2", result)
                context.setState({ result: result });
            }
            if(result.statusCode==108){
            	$('.alertMessage').text("查无此用户！！");
		        $('#my-alert').modal('open');
            }
        });
    }
    logOut() {
        const { delUser, dispatch } = this.props;
        this.context.router.push('/denglu');
        delUser();
    }

    onClickp1() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        var data = { tuijian: user.username, jiedian: result.user.username, qu: 1 };
        data.state = 1;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }
    onClickp2() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        // //console.log(user);
        var data = { tuijian: user.username, jiedian: result.user.username, qu: 2 };
        data.state = 2;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }
    onClickp3() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        //console.log(user);
        var data = { tuijian: user.username, jiedian: result.user1.username, qu: 1 };
        data.state = 3;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }
    onClickp4() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        // //console.log(user);
        var data = { tuijian: user.username, jiedian: result.user1.username, qu: 2 };
        data.state = 4;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }
    onClickp5() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        // //console.log(user);
        var data = { tuijian: user.username, jiedian: result.user2.username, qu: 1 };
        data.state = 5;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }
    onClickp6() {
        const { user, zhuce6 } = this.props;
        const result = this.state.result;
        // //console.log("传参注册6", result)
        // //console.log(user);
        var data = { tuijian: user.username, jiedian: result.user2.username, qu: 2 };
        data.state = 6;
        // //console.log("data", data)
        zhuce6(data);
        this.context.router.push('/zhuce');
    }

    render() {
        const lang = auth.getLang();
        const { data } = this.state;
        const { user } = this.props;
        const { result } = this.state;
        const context = this;

        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode icon="user" title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode icon="user" title={item.name} key={item.key} isLeaf={item.isLeaf} />;
        });
        const treeNodes = loop(this.state.treeData);
        var money = 0;
        if (result.user) {
            if (result.user.register == 1) {
                money = 200;
            } else if (result.user.register == 2) {
                money = 500;
            } else if (result.user.register == 3) {
                money = 1000;
            } else if (result.user.register == 4) {
                money = 2000;
            } else if (result.user.register == 5) {
                money = 5000;
            }
        }
        if (result.user1) {
            if (result.user1.register == 1) {
                money = 200;
            } else if (result.user1.register == 2) {
                money = 500;
            } else if (result.user1.register == 3) {
                money = 1000;
            } else if (result.user1.register == 4) {
                money = 2000;
            } else if (result.user1.register == 5) {
                money = 5000;
            }
        }
        if (result.user2) {
            if (result.user2.register == 1) {
                money = 200;
            } else if (result.user2.register == 2) {
                money = 500;
            } else if (result.user2.register == 3) {
                money = 1000;
            } else if (result.user2.register == 4) {
                money = 2000;
            } else if (result.user2.register == 5) {
                money = 5000;
            }
        }
        if (result.user3) {
            if (result.user3.register == 1) {
                money = 200;
            } else if (result.user3.register == 2) {
                money = 500;
            } else if (result.user3.register == 3) {
                money = 1000;
            } else if (result.user3.register == 4) {
                money = 2000;
            } else if (result.user3.register == 5) {
                money = 5000;
            }
        }
        if (result.user4) {
            if (result.user4.register == 1) {
                money = 200;
            } else if (result.user4.register == 2) {
                money = 500;
            } else if (result.user4.register == 3) {
                money = 1000;
            } else if (result.user4.register == 4) {
                money = 2000;
            } else if (result.user4.register == 5) {
                money = 5000;
            }
        }
        if (result.user5) {
            if (result.user5.register == 1) {
                money = 200;
            } else if (result.user5.register == 2) {
                money = 500;
            } else if (result.user5.register == 3) {
                money = 1000;
            } else if (result.user5.register == 4) {
                money = 2000;
            } else if (result.user5.register == 5) {
                money = 5000;
            }
        }
        if (result.user6) {
            if (result.user6.register == 1) {
                money = 200;
            } else if (result.user6.register == 2) {
                money = 500;
            } else if (result.user6.register == 3) {
                money = 1000;
            } else if (result.user6.register == 4) {
                money = 2000;
            } else if (result.user6.register == 5) {
                money = 5000;
            }
        }

        return (
            <div className="tuan_wrap">
                <style>
                    {`
            html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td,p, select {
			    margin: 0;
			    padding: 0;
			}
            
            ul,li{
				list-style: none;
            }
            html,body{
                background:#000;
            }
			.tuan_wrap{
				width: 100%;
				height: 100%;
			}
			.DT_top{
                text-align: center;
                color: #00C8D0;
                line-height: 2.5rem;
                background: #000;
                font-weight: bold;	
                border-bottom:1px solid #03A1BA;
            }
            .DT_left{
                float: left;
                color: #00C8D0;
                position: absolute;
                left: 5%;	
            }
            .tuan_content{
                width: 100%;
            }
            .tuan_content ul li{
                width: 100%;
                height: 3rem;
                background: #FFFFFF;
				margin-top: 0.1rem;
				float: left;
            }
			 .tuan_content ul li p{
				height: 2rem;
				background: #cccccc;
			 }
            .s1{
				line-height: 2rem;
				text-align: center;
				display: block;
				width: 25%;
				height: 2rem;
				float: left;
            }
            .s2{
				line-height: 2rem;
				text-align: center;
				display: block;
				width: 25%;
				height: 2rem;
				float: left;
            }
			.s3{
				line-height: 2rem;
				text-align: center;
				display: block;
				width: 25%;
				height: 2rem;
				float: left;
			}
			.s4{
				line-height: 2rem;
				text-align: center;
				display: block;
				width: 25%;
				height: 2rem;
				float: left;
			}
            {/*第二板块*/}
            .listHeader{
                height:2.5rem;
                background:#0e77ca;
                color:#ffffff;
                margin-top:10px;
            }
            .listCenter1 {
                background:#FFFFFF;
                color:#000000;
                margin-top:10px;
            }
            .listHD {
                border-right:1px solid #ebebeb;
                font-size:12px;
                text-align:center;
                border-width: 0px;
            }
            .am-tabs-bd .am-tab-panel{
                padding:0;
                height:40rem;
            }
            .baifen{
                width:100%;
                overflow :scroll;
                // white-space: nowrap;
                // width: 100%;
                border: 1px solid #000;
            }
            .public{
                width:39%;
                height:10rem;
                text-align:center;
                color:#00C8D0;
                border:1px solid #00C8D0;
                border-radius:8px;
                margin:1rem 0;
               
            }
            .public2{
                width:2.5rem;
                height:10rem;
                text-align:center;
                color:#00C8D0;
                border:1px solid #00C8D0;
                border-radius:8px;
                margin:1rem 0;
            }
            .one{
                margin:0 auto;
                top:50px;
                overflow :scroll;
            }
            .two{
                position:fixed;
                left:15px;
                top:13rem;
                overflow :scroll;
            }
            .three{
                position:fixed;
                right:15px;
                top:13rem;
                overflow :scroll;
            }
            .four{
                position:fixed;
                left:0;
                top:27rem;
                width:25%;
                overflow :scroll;
            }
            .five{
                position:fixed;
                left:25%;
                top:27rem;
                width:25%;
                overflow :scroll;
            }
            .six{
                position:fixed;
                right:25%;
                top:27rem;
                width:25%;
                overflow :scroll;
            }
            .seven{
                position:fixed;
                right:0;
                top:27rem;
                width:25%;
                overflow :scroll;
            }
            .am-tabs-nav{
                margin:0 0 1rem 0;
                
            }
            .topimg1{
                margin:20px auto;
                display:block;
            }
            .topimg2{
                position:fixed;
                left:2rem;
                top:25.5rem;
                width:35%;
            }
            .topimg3{
                position:fixed;
                right:2rem;
                top:25.5rem;
                width:35%;
            }
        `}
                </style>
                <div className="DT_top"><Link to="/nav"><span className="DT_left">《</span></Link><span className="DT_right">{lang.tuandui01}</span></div>
                <div className="am-tabs" id="doc-my-tabs">
                    <ul style={{marginTop:"5px",marginBottom:"10px"}}>
                    <li style={{paddingLeft:"20px",color: "#00C8D0"}}><input id="search" type="username" placeholder="输入团队成员账号查询" style={{padding:"3px 0px 3px 5px", borderRadius:"5px", border:"1px solid #00C8D0", background:"black",width:"77%"}}  /><div style={{height:"100%" ,lineHeight:"30px",paddingLeft:"10px",marginRight:"6%,",display:"inline-block"}} onClick={context.search.bind(context)}>搜索</div></li>                                                       
                    </ul>
                    <div className="am-tabs-bd">
                        {/* 列表图 */}
                        <div className="am-tab-panel ">
                            <Row className="listHeWader" type="flex" align="middle">
                                <Col className="listHD" span={6}>账号</Col>
                                <Col className="listHD" span={6}>姓名</Col>
                                <Col className="listHD" span={6}>级别</Col>
                                <Col className="listHD" span={6}>查看</Col>
                            </Row>
                            <div className="tuan_content">
                                <ul>
                                    {
                                        data.map(function (v, k) {
                                            return (
                                                <li key={k}>
                                                    <Row className="listHeader" type="flex" align="middle">
                                                        <Col className="listHD" span={6}>{v.username}</Col>
                                                        <Col className="listHD" span={6}>{v.name}</Col>
                                                        <Col className="listHD" span={6}>{v.level}</Col>
                                                        {v.teamNumber == 0 ? "" : (
                                                            <Col className="listHD" span={6} onClick={context.getXJ.bind(context, v.username)}>查看下级</Col>
                                                        )}
                                                    </Row>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="am-tab-panel am-active">
                            <div className="baifen">
                                {result.user ? (<div className="public one" onClick={context.getXJ.bind(context, result.user.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                     <p style={{fontSize:"12px"}}>{result.user.leftYeji+result.user.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user.rightDuipeng}</p>
                                    
                                </div>) : (<div className="public one">
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }
                                <img src="/public/images/line_2.png" className="topimg1" />
                                {result.user1 ? (<div className="public two" onClick={context.getXJ.bind(context, result.user1.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user1.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user1.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                    <p style={{fontSize:"12px"}}>{result.user1.leftYeji+result.user1.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user1.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user1.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user1.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user1.rightDuipeng}</p>
                                </div>) : (<div className="public two" onClick={context.onClickp1.bind(this)}>
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }
                                <img src="/public/images/line_2.png" className="topimg2" />
                                {result.user2 ? (<div className="public three" onClick={context.getXJ.bind(context, result.user2.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user2.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user2.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                     <p style={{fontSize:"12px"}}>{result.user2.leftYeji+result.user2.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user2.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user2.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user2.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user2.rightDuipeng}</p>
                                </div>) : (<div className="public three" onClick={context.onClickp2.bind(this)}>
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }
                                <img src="/public/images/line_2.png" className="topimg3" />
                                {result.user3 ? (<div className="public four" onClick={context.getXJ.bind(context, result.user3.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user3.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user3.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                   <p style={{fontSize:"12px"}}>{result.user3.leftYeji+result.user3.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user3.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user3.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user3.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user3.rightDuipeng}</p>
                                </div>) : (<div className="public four" onClick={context.onClickp3.bind(this)}>
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }

                                {result.user4 ? (<div className="public five" onClick={context.getXJ.bind(context, result.user4.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user4.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user4.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                   <p style={{fontSize:"12px"}}>{result.user4.leftYeji+result.user4.rightYeji}</p>
                                     
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user4.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user4.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user4.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user4.rightDuipeng}</p>
                                </div>) : (<div className="public five" onClick={context.onClickp4.bind(this)}>
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }

                                {result.user5 ? (<div className="public six" onClick={context.getXJ.bind(context, result.user5.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user5.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user5.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                   <p style={{fontSize:"12px"}}>{result.user5.leftYeji+result.user5.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user5.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user5.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user5.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user5.rightDuipeng}</p>
                                </div>) : (<div className="public six" onClick={context.onClickp5.bind(this)}>
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }

                                {result.user6 ? (<div className="public seven" onClick={context.getXJ.bind(context, result.user6.username)}>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui02}</p>
                                    <p style={{fontSize:"12px"}}>{result.user6.username}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui03}</p>
                                    <p style={{fontSize:"12px"}}>{result.user6.register}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui031}</p>
                                    <p style={{fontSize:"12px"}}>{result.user6.leftYeji+result.user6.rightYeji}</p>
                                     
                                    <p style={{fontSize:"12px"}}>{lang.tuandui04}</p>
                                    <p style={{fontSize:"12px"}}>{result.user6.leftYeji}</p>
                                    <p style={{fontSize:"12px"}}>{lang.tuandui05}</p>
                                    <p style={{fontSize:"12px"}}>{result.user6.rightYeji}</p>
                                    
                                    <p style={{fontSize:"12px"}}>{lang.tuandui051}</p>
                                     <p style={{fontSize:"12px"}}>{result.user6.leftDuipeng}</p>
                                     <p style={{fontSize:"12px"}}>{lang.tuandui052}</p>
                                     <p style={{fontSize:"12px"}}>{result.user6.rightDuipeng}</p>
                                </div>) : (<div className="public seven" onClick={context.onClickp6.bind(this)} >
                                    <p>{lang.tuandui06}</p>
                                    <p>{lang.tuandui07}</p>
                                </div>)
                                }

                            </div>
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
                
                
            </div >
        )
    }
}

Tuandui.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Tuandui)



