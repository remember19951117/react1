/**
 * 订单信息
 * Created by shichenda on 2016/7/2.
 */
import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';

export function getOrder(data){
    return{
        type: "GET_ORDER",
        data:data
    }
}

export function delOrder(){
    return{
        type: "DELETE_ORDER"
    }
}

//获取微信jssdk配置信息
export function getOrderPayJsConfig(){
    const url = fetchs.APIHost+"/wechat/js/config";
    const token = auth.getAuth("/wechat/js/config","user");
    return dispatch => {
        return fetchs.read_Token(url,token)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 401){
                    alert("无权限");
                }else if(json.statusCode == 403){
                    alert("权限拒绝");
                }else if(json.statusCode == 108){
                    alert(json.message);
                }else{
                    //console.log(json);
                    dispatch({
                        type:"GET_JS_CONFIG",
                        data:json.resource
                    });
                }
            });
    }
}
//获取微信支付配置信息
export function getOrderPayEncy(data){
    const url = fetchs.APIHost+"/wechat/payment/config";
    const token = auth.getAuth("/wechat/payment/config","user");
    return dispatch => {
        return fetchs.creat_Token(url,token,JSON.stringify(data))
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 401){
                    return json;
                }else if(json.statusCode == 403){
                    return json;
                }else if(json.statusCode == 102){
                    return json;
                }else{
                    return json;
                }
            });
    }
}
