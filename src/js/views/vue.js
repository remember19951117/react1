const data = {
    id: {}  //你第一次拿到的数据
}
// 判断数据是否为空 不为空调用再次请求数据
if(data.id.length!=0){
    get_data_id(data)
}
function get_data_id(data) {
    if (data.id.length != 0) {
        // 请求数据  
        $.ajax("post", data, "get_data_id", back(data))
        function back(data) {
            // 如果有参数  把你的参数返回出去
            if (data != "") {
                return data.id
            }
        }
    }
}
<div>
    {id}
    <div  >
        {get_data_id(data)}
    </div>
</div>
