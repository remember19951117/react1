import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';
import { getMessage } from './utils/utils';

export function getGoodsInfoWithIdAct(data){
	return{
		type:"GET_GOODS_INFO",
		data:data
	}
}

export function getGoodsInfoWithID(id){
	const url = fetchs.APIHost+'/goods/'+id
    return dispatch => {
        return fetchs.read(url)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    dispatch(getGoodsInfoWithIdAct(json.resource));
                    return json;
                }
            });
    }
}

export function getGoodsDBList(data){
    return{
        type:"Sjhy_List_Data",
        data:data
    }
}

export function searchSjhyList(data,page,size){
    const url = fetchs.APIHost+'/goods/search/'+(page)+"/"+size;
    return dispatch => {
        return fetchs.create(url,data)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    if(page>1){
                        dispatch(getGoodsDBList(json.resource));
                        return json;
                    }else{
                        dispatch({
                            type: "Sjhy_List_Data",
                            data:json.resource
                        });
                        return json;
                    }
                }else{
                    //console.log('返回的结果',json);
                }
            });
    }
}

//获取数据列表
export function sjhyMyListAct(page,size){
    const url = fetchs.APIHost+'/goods/my/list/'+page+'/'+size;
    const token = auth.getAuth('/goods/my/list/'+page+'/'+size,'user');
    return dispatch => {
        return fetchs.read_Token(url,token)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 107){
                    if(page==1){
                        dispatch(getGoodsDBList(json.resource));
                    }else{
                        dispatch({
                            type: "Sjhy_List_Data",
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


export function delSjhy(key,id){
    const url = fetchs.APIHost+'/goods/'+id;
    const token = auth.getAuth('/goods/'+id);
    return dispatch => {
        return fetchs.delete_Token(url,token)
            .then(response => response.json())
            .then(json => {
                if(json.statusCode == 103){
                    dispatch({
                        type : "SJHY_DELETE",
                        key: key
                    });
                    getMessage().success(json.message);
                }else{
                    getMessage().error(json.message);
                }
            });
    }
}