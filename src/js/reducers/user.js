/**
 * 用户reducer
 */
export function user(state = {}, action){
	switch(action.type){
		case 'GET_USER':
			return Object.assign({},state,action.user);
		case 'PUSH_USER':
			const user = Object.assign({},state,action.user);
			return user;
		case 'UPDATE_USER_HEDAIMG':
			return Object.assign({},state,{'headImg':action.imgPath});
		case 'DESELECT_ADDRESS_KEY':
			const currentUser = state;
			const keys = Object.keys(currentUser.address);
			keys.map(function(key){
				if(action.data == key){
					currentUser.address[key].isDefault = true;
				}else{
					currentUser.address[key].isDefault = false;
				}
			});
			return currentUser;
		case 'DELETE_USER':
			return {};
		default:
			return state
	}
}

export function messages(state={},action){
	switch(action.type){
		case 'MESSAGE_LIST':
			return action.data;
		default:
			return state
	}
}


//滚动图片
export function slider(state = {}, action){
	switch(action.type){
		case 'GET_SLIDER':
			return Object.assign({},action.slider);
		default:
			return state
	}
}

//yiyuan number
export function yiyuanNumber(state=0, action){
	switch(action.type){
		case "YIYUAN_number":
		return action.data
		default:
			return state
	}
}

//注册传参
	export function zhuce6(state = {},action){
		// //console.log(555555);
		switch(action.type){
			case "zhuce_sendData":
			// //console.log(6666,action);
			return Object.assign({},action.user);
			default:
				return state
		}		
	}
