
//根据item来确定选中的底部菜单
export function refreshTabBarView(state={},action){
	switch(action.type){
		case "REFRESH_TABBAR":
			return Object.assign({},{},action.data);
		default:
			return state
	}
}