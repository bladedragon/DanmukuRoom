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
        "barrageId": 1,
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
    })
})();



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