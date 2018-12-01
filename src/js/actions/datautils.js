
//时间格式化
export function  format(fmt,data) { //author: meizz
        var o = {
            "Y+":data.getFullYear(),
            "M+": data.getMonth() + 1, //月份 
            "d+": data.getDate(), //日 
            "h+": data.getHours(), //小时 
            "m+": data.getMinutes(), //分 
            "s+": data.getSeconds(), //秒 
            "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
            "S": data.getMilliseconds(),//毫秒 ,
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
//年月日
export function datePaseNYR(text){
        var d = new Date(text);
        return d.getFullYear() +"-"+ (d.getMonth() + 1)+"-"+d.getDate();
    }
//时分秒
//export function datePaseSS(text){
//          var d = new Date(text);
//         return  d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
//}    
//   export function floot(num: any): string {
//      return DataUtils.div(Math.floor(DataUtils.mul(Number(num), 100)), 100) + "";
//  }
//}


//用法：
//import * as dataUtails from '../actions/utils/dataUtails';
//let xxx= dataUtils.format("MM-dd hh:mm",new Date(this.data.dynamic_time)) 









