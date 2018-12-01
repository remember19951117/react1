/**
 * 新闻
 * Created by chenda on 2016/10/23.
 */

export function newsList(state = {}, action){
    switch(action.type){
        case 'NEWS_LIST_DATA':
            return Object.assign({},action.data);
        case 'NEWS_UPDATA_LIST':
            var datas = [];
            Object.keys(state).map(function(key){
                datas.push(state[key]);
            });
            action.data.map(function(obj){
                datas.push(obj);
            });
            return Object.assign({},datas);
        case 'NEWS_DELETE':
            delete state[action.key]
            return Object.assign({},state);
        default:
            return state
    }
}

export function newsInfo(state = {}, action){
    switch(action.type){
        case 'NEWS_INFO':
            return Object.assign({},action.data);
        default:
            return state
    }
}