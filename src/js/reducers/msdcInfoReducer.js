export function qzzpInfoData(state = {}, action){
	switch(action.type){
		case 'get_personInfoWithID':
			return Object.assign({},action.data);
		default:
            return state;
	}
}