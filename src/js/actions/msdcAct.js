/**
 * 名师名厨 action
 * Created by shichenda on 2016/9/9.
 */

import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';

export function msdcBDInfoAct(data){
    return {
        type:"MSDC_INFO",
        data:data
    }
}

//获取详情
export function msdcInfoAct(id){
    const url = fetchs.APIHost+'/cook/'+id;
    return dispatch => {
        return fetchs.read(url)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    dispatch(msdcBDInfoAct(json.resource));
                    return json
                }else{
                    dispatch(msdcBDInfoAct({}));
                    return json
                }
            });
    }
}

export function msdcBDListAct(data){
    return {
        type:"MSDC_LIST_DATA",
        data:data
    }
}

//获取数据列表
export function msdcListAct(page,size){
    const url = fetchs.APIHost+'/cook/list/'+page+'/'+size;
    return dispatch => {
        return fetchs.read(url)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    if(page==1){
                        dispatch(msdcBDListAct(json.resource));
                    }else{
                        dispatch({
                            type:"MSDC_UPDATA_LIST",
                            data:json.resource
                        });
                    }
                    return json;
                }else{
                   //console.log(json.message);
                }
            });
    }
}

//搜索厂家商家数据列表
export function searchMsdcListAct(data,page,size){
    const url = fetchs.APIHost+'/cook/search/'+page+'/'+size;
    return dispatch => {
        return fetchs.create(url,data)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    if(page==1){
                        dispatch(msdcBDListAct(json.resource));
                    }else{
                        dispatch({
                            type:"MSDC_UPDATA_LIST",
                            data:json.resource
                        });
                    }
                    return json;
                }else{
                    //console.log(json.message);
                }
            });
    }
}
