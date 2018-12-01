/**
 * Created by shichenda on 2016/10/16.
 */

/**
 * 实用小工具
 * Created by shichenda on 2016/7/9.
 */

import message from "antd/lib/message";

//全局提示配置
message.config({
    top: 60,
    duration: 2,
});

//获取全局提示
export function getMessage(){
    return message;
}

//获取对象的值返回数组
export function getValues(obj){
    let values = [];
    Object.keys(obj).map(function(key){
        values.push(obj[key]);
    });
    return values;
}