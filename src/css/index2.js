
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true: false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true: false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true: false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

var turnWheel = {
    rewardNames:[],				
    colors:[],					
    outsideRadius:192,			
    textRadius:155,			
    insideRadius:68,			
    startAngle:0,				

    bRotate:false				
};

var imgQb = new Image();
imgQb.src = "/public/images/qb.png";
var imgSorry = new Image();
imgSorry.src = "/public/images/2.png";

$(document).ready(function(){

   

    turnWheel.rewardNames = [
        "50M流量包","10Q币",
        "谢谢参与","5Q币",
        "10M流量包","20M流量包",
        "10M流量包","20M流量包",
        "20Q币 ","30M流量包",
        "100M流量包","2Q币"];
    turnWheel.colors = [
        "#FFF4D7","#FFFFFF",
        "#F0F4D8","#FFFFFF",
        "#FFF4D0","#FFFFFF",
        "#FFF4D0","#FFFFFF",
        "#FFF4D6","#FFFFFF",
        "#FFF4D6","#FFFFFF"];


    var rotateFunc = function (item, tip,count){

        var baseAngle = 360 / count;
        angles = 360 * 3 / 4 - ( item * baseAngle) - baseAngle / 2; 
        $('#wheelCanvas').stopRotate();
        $('#wheelCanvas').rotate({
            angle:0,
            animateTo:angles + 360 * 5, 
            duration:8000,
            callback:function (){ 
                $("#tip").text(tip);
                turnWheel.bRotate = !turnWheel.bRotate;
                if(isMobile.any()) 
                {
                    window.location.href = "turntable://test.com?"+ "index=" + item +"&tip=" + tip ;
                }
            }
        });
    };

    $('.pointer').click(function (){
        if(turnWheel.bRotate) return;
        //console.log(123)
        turnWheel.bRotate = !turnWheel.bRotate;
        var count = turnWheel.rewardNames.length;
        var item = randomNum(0,count - 1);
        rotateFunc(item, turnWheel.rewardNames[item],count);
       
    });

});

function randomNum(n, m){
    var random = Math.floor(Math.random()*(m-n)) + n;
    return random;

}

window.onload=function(){
    drawWheelCanvas();
};

function drawWheelCanvas(){

    var canvas = document.getElementById("wheelCanvas");

    var baseAngle = Math.PI * 2 / (turnWheel.rewardNames.length);
    var ctx=canvas.getContext("2d");

    var canvasW = canvas.width; 
    var canvasH = canvas.height; 
    ctx.clearRect(0,0,canvasW,canvasH);

    ctx.strokeStyle = "#FFBE04"; 
    ctx.font = '16px Microsoft YaHei';

    for(var index = 0 ; index < turnWheel.rewardNames.length ; index++)
    {
        var angle = turnWheel.startAngle + index * baseAngle;
        ctx.fillStyle = turnWheel.colors[index];

        ctx.beginPath();
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();

        ctx.fillStyle = "#E5302F";
        var rewardName = turnWheel.rewardNames[index];
        var line_height = 17;
        var translateX =  canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * turnWheel.textRadius;
        var translateY =  canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * turnWheel.textRadius;
        ctx.translate(translateX,translateY);

        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

        if(rewardName.indexOf("M")>0){
            var rewardNames = rewardName.split("M");
            for(var j = 0; j<rewardNames.length; j++){
                ctx.font = (j == 0)?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                if(j == 0){
                    ctx.fillText(rewardNames[j]+"M", -ctx.measureText(rewardNames[j]+"M").width / 2, j * line_height);
                }else{
                    ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
                }
            }
        }else if(rewardName.indexOf("M") == -1 && rewardName.length>6){
            rewardName = rewardName.substring(0,6)+"||"+rewardName.substring(6);
            var rewardNames = rewardName.split("||");
            for(var j = 0; j<rewardNames.length; j++){
                ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
            }
        }else{
            ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
        }




        if(rewardName.indexOf("Q币")>0){
            imgQb.onload=function(){
                ctx.drawImage(imgQb,-15,10);
            };
            ctx.drawImage(imgQb,-15,10);

        }else if(rewardName.indexOf("谢谢参与")>=0){
            imgSorry.onload=function(){
                ctx.drawImage(imgSorry,-15,10);
            };
            ctx.drawImage(imgSorry,-15,10);
        }




        ctx.restore();


    }
}
