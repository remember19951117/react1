import React , { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore, combineReducers, applyMiddleware , compose  } from 'redux';
import { Provider } from 'react-redux';
import  * as reducers  from './reducers';
import thunk from 'redux-thunk';

import Index from 'react-router-proxy?name=index!./views/index';
import Home from 'react-router-proxy?name=home!./views/home';
import Me from 'react-router-proxy?name=me!./views/me';
import Gerenziliao from 'react-router-proxy?name=gerenziliao!./views/gerenziliao';
import geren_child from 'react-router-proxy?name=geren_child!./views/geren_child';
import Code from 'react-router-proxy?name=code!./views/code';
import Denglu from 'react-router-proxy?name=denglu!./views/denglu';
import Zhuce from 'react-router-proxy?name=zhuce!./views/zhuce';
import Duihuan from 'react-router-proxy?name=duihuan!./views/duihuan';
import EditPwd from 'react-router-proxy?name=editPwd!./views/editPwd';
import EditPwd2 from 'react-router-proxy?name=editPwd2!./views/editPwd2';
import Upgrade from 'react-router-proxy?name=upgrade!./views/upgrade';
import Upgrade2 from 'react-router-proxy?name=upgrade2!./views/upgrade2';
import Upgrade3 from 'react-router-proxy?name=upgrade3!./views/upgrade3';
import JiYiDaTing from 'react-router-proxy?name=jiYiDaTing!./views/jiYiDaTing';
import JiYuanHuZhuan from 'react-router-proxy?name=jiYuanHuZhuan!./views/jiYuanHuZhuan';
import JiYuanHuZhuanhuo from 'react-router-proxy?name=JiYuanHuZhuanhuo!./views/JiYuanHuZhuanhuo';
import JinYuanGuaMai from 'react-router-proxy?name=jinYuanGuaMai!./views/JinYuanGuaMai';
import GongGaoList from 'react-router-proxy?name=gongGaoList!./views/gongGaoList';
import GongGao from 'react-router-proxy?name=gongGao!./views/gongGao';
import JiluXiangqing from 'react-router-proxy?name=jiluXiangqing!./views/jiluXiangqing';
import Tuandui from 'react-router-proxy?name=tuandui!./views/tuandui';
import YiYuanGou from 'react-router-proxy?name=YiYuanGou!./views/yiYuanGou';
import YiYuan_details from 'react-router-proxy?name=YiYuan_details!./views/yiYuan_details';
import YiYuan_dingdan from 'react-router-proxy?name=YiYuan_dingdan!./views/YiYuan_dingdan';
import YiyuanXiangQing from 'react-router-proxy?name=YiyuanXiangQing!./views/YiyuanXiangQing';
import feedback from 'react-router-proxy?name=feedback!./views/feedback';
import nav from 'react-router-proxy?name=nav!./views/nav';
import Directpush from 'react-router-proxy?name=Directpush!./views/Directpush';
import integralconversion from 'react-router-proxy?name=integralconversion!./views/integralconversion';
import integralW from 'react-router-proxy?name=integralW!./views/integralW';
import baodanmingxi from 'react-router-proxy?name=baodanmingxi!./views/baodanmingxi';
import integralL from 'react-router-proxy?name=integralL!./views/integralL';
import integralopen from 'react-router-proxy?name=integralopen!./views/integralopen';
import integralactivation from 'react-router-proxy?name=integralactivation!./views/integralactivation';
import integralLensure from 'react-router-proxy?name=integralLensure!./views/integralLensure';
import integralLgameshop from 'react-router-proxy?name=integralLgameshop!./views/integralLgameshop';
import ActivationList from 'react-router-proxy?name=ActivationList!./views/ActivationList';
import ActivationListdetails from 'react-router-proxy?name=ActivationListdetails!./views/ActivationListdetails';
import buyshoplist from 'react-router-proxy?name=buyshoplist!./views/buyshoplist';
import childUser from 'react-router-proxy?name=childUser!./views/childUser';
import WLsell from 'react-router-proxy?name=WLsell!./views/WLsell';
import Activelist from 'react-router-proxy?name=Activelist!./views/Activelist';
import Fn from 'react-router-proxy?name=Fn!./views/Fn';
import Fuwufeedb from 'react-router-proxy?name=Fuwufeedb!./views/Fuwufeedb';
import * as auth from './actions/utils/auth';
import * as userAction from './actions/user';

 
const reducer = combineReducers(reducers);
const store = applyMiddleware(thunk)(createStore)(reducer);

/**ActivationList
 * 主文件，路由文件
 */
window.Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
window.Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export default class Root extends Component{
  //进入index前执行的函数
  redirectToLogin() {
    if (auth.loggedIn()) {
      store.dispatch(userAction.getUser(auth.loggedIn()))
    }else{
      window.location.href = "/mobile/denglu";
    }
  }
    //还原数据
    resetData(){
        // const $modal = $('#my-modal-loading');
        // if(((typeof $modal.modal)=="function")){
        //     $modal.modal("open");
        // }
        // window.onscroll = null;
        // store.dispatch({type:"pty_home_update_page",page:0,size:10,status:true});
        // store.dispatch({type: "GET_SLIDER", slider:[]});
    }
  render() {
    const { history } = this.props;
    return(
      <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Index}>
                <IndexRoute component={Home} onEnter={this.redirectToLogin.bind(this)} />
                <Route path='/me' component={Me} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/gerenziliao' component={Gerenziliao} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/geren_child' component={geren_child} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/code' component={Code} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/denglu' component={Denglu}/>
                <Route path='/zhuce' component={Zhuce} />
                <Route path='/duihuan' component={Duihuan} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/editPwd' component={EditPwd} />
                <Route path='/editPwd2' component={EditPwd2} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/upgrade' component={Upgrade} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/upgrade2' component={Upgrade2} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/upgrade3' component={Upgrade3} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/jiYiDaTing' component={JiYiDaTing} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/jiYuanHuZhuan' component={JiYuanHuZhuan} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/JiYuanHuZhuanhuo' component={JiYuanHuZhuanhuo} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/jinYuanGuaMai' component={JinYuanGuaMai} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/gongGaoList' component={GongGaoList} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/gongGao/:id' component={GongGao} onEnter={this.redirectToLogin.bind(this)}/> 
                <Route path='/jiluXiangqing/:id' component={JiluXiangqing} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/tuandui' component={Tuandui} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/yiYuanGou' component={YiYuanGou} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/feedback' component={feedback} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/yiYuan_details/:id' component={YiYuan_details} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/yiYuan_dingdan' component={YiYuan_dingdan} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/yiyuanXiangQing' component={YiyuanXiangQing} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/baodanmingxi' component={baodanmingxi} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/nav' component={nav} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/Directpush' component={Directpush} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralconversion' component={integralconversion} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralW' component={integralW} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralL' component={integralL} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralopen' component={integralopen} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralactivation' component={integralactivation} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralLensure' component={integralLensure} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/integralLgameshop' component={integralLgameshop} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/ActivationList' component={ActivationList} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/ActivationListdetails' component={ActivationListdetails} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/buyshoplist' component={buyshoplist} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/childuser' component={childUser} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/WLsell' component={WLsell} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/Activelist' component={Activelist} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/Fn' component={Fn} onEnter={this.redirectToLogin.bind(this)}/>
                <Route path='/Fuwufeedb' component={Fuwufeedb} onEnter={this.redirectToLogin.bind(this)}/>
            </Route>
        </Router>
      </Provider>
    );
  }
}

