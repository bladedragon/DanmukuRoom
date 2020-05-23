var danmuContent = document.getElementsByClassName("barrage-content")[0];

var danmuRoad = document.getElementsByClassName("barrage-road");

var rangeValue = 20;

//滑块设计
var sliderHandle = document.getElementsByClassName('range-slider-handle');
var slider;
var sliderRect;
var sliderFill;


var content = document.getElementsByClassName("barrage-input")[0];
var speedNum = document.getElementsByClassName("")[0];
var speed_default = 20;
var color;
var color_default = "white";

var transitionEvent = whichTransitionEvent();
var index = 1;

var deviceType = getPAGE();





var danmuData = [
    {
        "danmuId": 1,
        "content": " 系统发送：第一条弹幕",
        "color": "white",
        "speed": 16,
        "textSize": 20,
        "road": 0,
        "starNum": 0,
        "sendTime": "2008-4-2 15:23:28"
    }
];

    (function () {
        for (var i = 0; i < danmuData.length; i++) {
            danmuData[i]["road"] = i % danmuRoad.length;
        }
        console.log("screen-size", screen.width, screen.height);
        var that = this;
        console.log("that:", this);
        var timer = setInterval(function (args) {
            if (danmuData.length <= 0) {
                // pullDanmuku();
                console.log("拉取结果");
            
                return;
            }
            
            console.log("danmuData"+danmuData)
            sendDamu(danmuData[0]["danmuId"],
                danmuData[0]["content"],
                danmuData[0]["color"],
                danmuData[0]["speed"],
                danmuData[0]["textSize"],
                danmuData[0]["road"]);
            danmuData.splice(0, 1);

        }, 1000);

    })();


    

function sendDamu(danmuId, content, color, speed, textSize, road) {
    console.log("发送弹幕");

    var newDanmu = document.createElement("span");
    var newDanmuInfo = document.createElement("div");

    if (content === "") {
        return;
    }
    newDanmu.classList.add("barrage");
    newDanmu.style.transitionDuration = speed + "s";
    newDanmu.style.webkitTransitionDuration  = speed + "s";
    //添加头像
    newDanmu.innerHTML = "<img src=\"pic/headImg.jpg\" rel=\"icon\" class=\"barrage-head-img\" alt=\"\" />";


    newDanmuInfo.classList.add("barrage-info-area");
    newDanmuInfo.style.setProperty("color", color);
    newDanmuInfo.style.setProperty("font-size", textSize + "px");
    newDanmuInfo.innerHTML = content;

    newDanmu.appendChild(newDanmuInfo);
    newDanmu.onmouseenter = function (ev) {
        onMouseIn(this);
    }
    newDanmu.onmouseleave = function (ev) {
        onmouseLeave(this);
    }

    //加入弹道
    danmuRoad[road].appendChild(newDanmu);
    //设置弹幕发射时间
    setTimeout(function () {
        newDanmu.classList.add("barrage-active");
    }, 50);
    
    newDanmu.addEventListener(transitionEvent, function (e) {
        this.parentNode.removeChild(this);
        console.log("css效果结束，删除弹幕")
    })

}

//鼠标悬浮在弹幕上，弹幕停止运动
//原理是移除弹幕上的移动css，换上固定的left
function onMouseIn(event) {
    var danmu = event.valueOf();
    console.log(danmu);
    var computeStyle = window.getComputedStyle(danmu);
    var left = computeStyle.getPropertyValue("left");
    danmu.style.left = left;
    danmu.classList.remove("barrage-active");
}

//鼠标离开弹幕事件
function onmouseLeave(event) {
    var danmu = event.valueOf();
    danmu.classList.add("barrage-active");


}

function enterDanmu(e){
    var enter =  window.event || arguments.callee.caller.arguments[0];

    if(enter.keyCode ==13){
        addDanmu();
    }
}
function addDanmu() {
    var item = {
        "content": "默认添加",
        "color": "red",
        "speed": 16,
        "textSize": 20,
        "road": 0,
        "starNum": 0
    };

    var myContent = content.value;
    item["speed"] = speed_default.value;
    item["textSize"] = rangeValue;
    item["road"] = Math.floor(Math.random() * danmuRoad.length);

    myContent = contentFilter()
    item["content"] = myContent;
    console.log("监听到的content:" + myContent);

    //自定义项
    danmuData.push(item);
    console.log("添加item",danmuData[0]);
    
    //上传弹幕信息到服务器

    //清空输入框
    document.getElementsByClassName("barrage-input")[0].value = "";

}


function contentFilter() {
    var raw_content = content.value;
    raw_content = raw_content.replace(/<.*?>.*?<\/.*?>/g, '[非法字段]');
    raw_content = raw_content.replace(/<img/g, '[非法字段]');
    raw_content = raw_content.replace(/<script/g, '[非法字段]');

    return raw_content;
}


/**
 * 判断浏览器内核
 */
function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

/**
 * 是否是移动端
 */
function getPAGE() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        /*window.location.href="你的手机版地址";*/
        // deviceType = "mobile";
        return "mobile";
    }
    else {
        /*window.location.href="你的电脑版地址";    */
        // deviceType = "pc";
        return "pc";
    }
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    return Y + M + D;
}


function pullDanmuku() {
    
}