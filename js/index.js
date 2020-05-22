var danmuContent = document.getElementsByClassName("barrage-content")[0];

var danmuRoad = document.getElementsByClassName("barrage-road");

var rangeValue = 20;

//滑块设计
var sliderHandle = document.getElementsByClassName('range-slider-handle');
var slider;
var sliderRect;
var sliderFill;


var content = document.getElementsByClassName("barrage-input");
var speedNum = document.getElementsByClassName("");
var speed_default = 20;
var color;
var color_default = "white";

var transitionEvent = whichTransitionEvent();
var index = 1;

var deviceType = getPAGE();



var danmuData = [
    {
        "danmuId": 1,
        "content" : " 系统发送：第一条弹幕",
        "color": "white",
        "speed" : 16,
        "textSize" : 20,
        "road": 0,
        "starNum" : 0,
        "sendTime": "2008-4-2 15:23:28"
    }
]

(function(){
    for(var i =0;i<danmuData.length;i++){
        danmuData[i]["road"] = i % danmuRoad.length;
    }
    console.log("screen-size",screen.width,screen.height);
    var that = this;
    console.log("that:", this);
    var timer = setInterval(function(args){
        if(danmuData.length <=0){
            var result = pullDanmuku();
            console.log("拉取结果",result);
            return;
        }

        sendDamu(danmuData[0]["danmuId"],
                danmuData[0]["content"],
                danmuData[0]["color"],
                danmuData[0]["speed"],
                danmuData[0]["textSize"],
                danmuData[0]["road"]);
        danmuData.splice(0,1);
         
    },1000);

})();


function sendDamu(danmuId,content,color,speed,textSize,road){
    console.log("发送弹幕");

    var newDanmu = document.createElement("span");
    var newDanmuInfo = document.createElement("div"); 

    if(content === ""){
        return;
    }
    newDanmu.classList.add("barrage-info-area");
    newDanmu.style.transitionDuration = speed + "s";
    newDanmu.style.webkitTransitionDuration = speed + "s";
    //添加头像
    newDanmu.innerHTML("<img src=\"pic/headImg.jpg\" rel=\"icon\" class=\"barrage-head-img\" alt=\"\" />");


    newDanmuInfo.style.setProperty("color",color);
    newDanmuInfo.style.setProperty("font-size",textSize+"px");
    newDanmuInfo.innerHTML = content;

    newDanmu.appendChild(newDanmuInfo);
    newDanmu.onmouseenter = function(ev){
        onMouseIn(this);
    }
    newDanmu.onmouseleave = function(ev){
        onmouseLeave(this);
    }
}


function whichTransitionEvent(){

}

function getPAGE(){

}

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate(); 
    return Y+M+D;
}

function pullDanmuku(){

}