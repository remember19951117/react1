jQuery(document).ready(function($){
    $('#jia').click(function(){
	    var a = $('#shu').text(); 
	    var reg = /[1-9][0-9]*/g;  
        var str = a.match(reg); 

	  var jia =parseInt($(this).prev().val());
	   jia++;
	  if(jia<=str){
	   $(this).prev().val(jia);
	  } 
	})
	
	$('#jian').click(function(){
	  var jian =parseInt($(this).next().val());
	   jian--;
	  if(jian > 0){
	    $(this).next().val(jian);
	   }
	})
	
	$('#val').keyup(function(){
	  var val = $('#val').val();
	  var a = $('#shu').text(); 
	        var reg = /[1-9][0-9]*/g;  
        var str = a.match(reg); 
	  if(val>str){
	    alert("不能超过限购数量");
		$('#val').val(str);
	  }
	})
	$('#val').blur(function(){
	  var val = $('#val').val();
	  if(val==0){
	    alert("购买数量不能为空");
		$('#val').val(1);
	  }
	})
});