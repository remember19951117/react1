/**
 * 新闻action
 * Created by chenda on 2016/10/23.
 */


import * as fetchs from './utils/fetch';
import * as auth from './utils/auth';
import { getMessage } from './utils/utils';

//获取详情
export function newsInfoAct(id){
    const url = fetchs.APIHost+('/systemSmg/'+id);
    const token = auth.getAuth('/systemSmg/'+id);
    return dispatch => {
        return fetchs.read_Token(url,token)
        .then(response => response.json())
        .then(json => {
                return json
        });
    }
}

//获取数据列表GET {page}/{size}
export function newsListAct(page,size){
    const url = fetchs.APIHost+'/systemSmg/list/'+page+'/'+size;
    const token = auth.getAuth('/systemSmg/list/'+page+'/'+size);
    return dispatch => {
        return fetchs.read_Token(url,token)
            .then(response => response.json())
            .then(json => {
                return json;
            });
    }
}

//获取府区中心公告列表
export function getFuwunotice(page, size) {
	const url = fetchs.APIHost + '/systemSmg/fuwuList/' + page + '/' + size;
	const token = auth.getAuth('/systemSmg/fuwuList/' + page + '/' + size);
	return dispatch => {
		return fetchs.read_Token(url, token)
			.then(response => response.json())
			.then(json => {
			return json;
			});
	}
}