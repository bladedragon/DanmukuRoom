var danmuContent = document.getElementsByClassName("barrage-content")[0];

var danmuRoad = document.getElementsByClassName("barrage-road");

var rangeValue = 20;

//设置栏设计
var isShow = false;
//滑块设计
var sliderHandle = document.getElementsByClassName('range-slider-handle')[0];
var slider;
var sliderRect;
var sliderFill = document.getElementsByClassName("range-slider-fill");


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
        "sendTime": "2008-4-2 15:23:28",
        "road": 0,
        "starNum": 0,
        "location": null,
        "userId": null
        
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
                pullDanmuku();
                console.log("拉取结果");
            
                return;
            }
            
            console.log("danmuData"+danmuData)
            sendDamu(danmuData[0]["danmuId"],
                danmuData[0]["content"],
                danmuData[0]["color"],
                danmuData[0]["speed"],
                danmuData[0]["textSize"]);
            danmuData.splice(0, 1);

        }, 1000);

    })();


    

function sendDamu(danmuId, content, color, speed, textSize) {
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
    var road = Math.floor(Math.random() * danmuRoad.length);

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


//设置栏相关事件

function clickSetting(){
    var settingElement = document.getElementsByClassName("barrage-setting-wrap")[0];
    var settingIconElement = document.getElementsByClassName("icon-setting")[0].children[0];
    
    if(isShow){
        settingElement.style.setProperty("display","none");
        settingIconElement.style.setProperty("fill","");
        isShow = !isShow;  
    }else{
        settingElement.style.setProperty("display","block");
        settingIconElement.style.setProperty("fill","#00a1d6");
        isShow = !isShow
    }
}

//滑块控制
if(deviceType === "pc"){
    sliderHandle
}



function enterDanmu(e){
    var enter =  window.event || arguments.callee.caller.arguments[0];

    if(enter.keyCode ==13){
        addDanmu();
    }
}
function addDanmu() {   

    var item = {
        "danmuid": 1,
        "content": "默认添加",
        "color": "red",
        "speed": 16,
        "textSize": 20,
        "sendTime": "2008-4-2 15:23:28",
        "road": 0,
        "starNum": 0,
        "location": null,
        "userId": null
    };

    var myContent = content.value;
    item["speed"] = speed_default.value;
    item["textSize"] = rangeValue;
    item["road"] = Math.floor(Math.random() * danmuRoad.length);

    myContent = contentFilter()
    item["content"] = myContent;
    console.log("监听到的content:" + myContent);

    //自定义项
    danmuData.unshift(item);
    console.log("添加item",danmuData[0]);
    
    //上传弹幕信息到服务器
    saveDanmuku();


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
    $.ajax({
        url:"http://127.0.0.1:81/pullDanmu",
        type: "get",
        dataType: "json",
        complete: function(ev){
            console.log("ev.status="+ev.status);
            if(ev.status == 200){
                var response = JSON.parse(ev.responseText);
                danmuData=  danmuData.concat(response["data"]);
                console.log("pull data:"+response["data"]);
                // console.log("danmuData);
            }else{
                console.log("error",ev.responseText)
            }
        }

    });
}

function saveDanmuku(){
    myContent = contentFilter()
    var json =  {
        "danmuId": 1,
        "content": myContent,
        "color": "white",
        "speed": 5,
        "textSize": 20,
        "sendTime": "2008-4-2 15:23:28",
        "road": 0,
        "starNum": 0,
        "location": "",
        "userId": "null"
    }
    json["road"] = Math.floor(Math.random() * danmuRoad.length);

    $.ajax({
        // url:"http://www.zblade.top:81/addDanmu",
        url: "localhost:81/addDanmu",
        type:"POST",
        dataType: "json",
        // jsonp: "callback",
        // jsonpCallback:"showData",
        // headers: {
        //     Accept: "application/json; charset=utf-8",
        // },
        contentType: "application/json",
        data:JSON.stringify(json),
        complete: function(ev) {
            if(ev.status == 200){
                var msg = JSON.parse(ev.responseText)["msg"];
                console.log("发送成功"+msg);
            }else{
                console.log("error",ev.responseText);
            }
        }
    })
}
function showData(result){
    var data = JSON.stringify(result);
    console.log("data=>"+data);
}


