import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';

export function getInfoWithID(data){
	return{
        type:"get_personInfoWithID",
        data:data
    }
}

export function getInfoWithIDAct(id){
	const url = fetchs.APIHost+'/recruit/'+id;
	return dispatch => {
		return fetchs.read(url)
			.then(response => response.json())
			.then(json => {
				//console.log('获取某个招聘详情',json);
				if(json.statusCode == 107){
					dispatch(getInfoWithID(json.resource));
					return {message:json}
				}else{
					return {message:json}
				}
			});
	}
}