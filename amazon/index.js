$(function () {

    var websocket;


    // 首先判断是否 支持 WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/MyAmazonServer/websocket");
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://localhost:8080/MyAmazonServer/websocket");
    } else {
        alert("您的浏览器不支持WebSock网络通信，请换用更新版本的浏览器！！");
    }

    // 打开时
    websocket.onopen = function (evnt) {
        console.log("  websocket.onopen  ");
    };

    // 处理消息时
    websocket.onmessage = function (evnt) {
        console.log("接收到消息"+evnt.data)
        $("#msg").append("<p>(<font color='red'>" + evnt.data + "</font>)</p>");
        console.log("  websocket.onmessage   ");
    };


    websocket.onerror = function (evnt) {
        console.log("  websocket.onerror  ");
    };

    websocket.onclose = function (evnt) {
        console.log("  websocket.onclose  ");
    };


    // 点击了发送消息按钮的响应事件
    $("#TXBTN").click(function () {

        // 获取消息内容
        var text = $("#tx").val();

        // 判断
        if (text == null || text == "") {
            alert(" content  can not empty!!");
            return false;
        }

        var msg = {
            "success": true,
            "errMessage": null,
            "data":
                {
                    "operateType": "initPlayer",
                    "player":
                        {
                            "playerId": "",
                            "playerName": text
                        }
                }
        };

        // 发送消息
        websocket.send(JSON.stringify(msg));
    });
});