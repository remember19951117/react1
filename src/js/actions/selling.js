import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';

export function addGoodsToShopCar(data){
	const url = fetchs.APIHost+'/demand';
	const token = auth.getAuth("/demand");
	return dispatch => {
		return fetchs.creat_Token(url,token,JSON.stringify(data))
			.then(response => response.json())
			.then(json => {
				if(json.statusCode == 401){
					//console.log("无权限",json)
				}else if(json.statusCode == 403){
					//console.log("权限拒绝",json)
				}else if(json.statusCode == 102){
					//console.log("插入数据出错",json)
				}else{
					return json;
				}
			});
	}
}

export function getCurrentViewData(){
	return{
		type:'get_NextView_DATA'
	}
}