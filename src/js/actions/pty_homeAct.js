import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';


//翻页
export function updateViewInfo(page,size,status){
    return{
        type:"pty_home_update_page",
        page:page,
        size:size,
        status:status
    }
}

export function storeNextData(data){
    return{
        type:"set_NextView_DATA",
        data:data
    }
}