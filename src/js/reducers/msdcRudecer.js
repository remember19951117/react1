/**
 * 名师大厨
 * Created by shichenda on 2016/9/9.
 */

export function msdcList(state = {}, action){
    switch(action.type){
        case 'MSDC_LIST_DATA':
            return Object.assign({},action.data);
        case 'MSDC_UPDATA_LIST':
            var datas = [];
            Object.keys(state).map(function(key){
                datas.push(state[key]);
            });
            action.data.map(function(obj){
                datas.push(obj);
            });
            return Object.assign({},datas);
        default:
            return state
    }
}

export function msdcInfo(state = {}, action){
    switch(action.type){
        case 'MSDC_INFO':
            return Object.assign({},action.data);
        default:
            return state
    }
}
