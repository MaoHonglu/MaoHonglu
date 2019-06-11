//校验验证码
function validate(check){
    var inputCode = document.getElementById("inputCode").value.toUpperCase(); //取得输入的验证码并转化为大写
    var inputName = document.getElementById("username").value;
    var inputContent = document.getElementById("userpassword").value;

    $.get(check+'?code='+inputCode,function(result){
    if(inputCode.length <= 0||inputName.length <=0||inputContent.length <= 0) { //若输入的验证码长度为0
        alert("内容填写不完整！"); //则弹出请输入验证码
        return false;
    }
    else if(result !== '1') { //若输入的验证码与产生的验证码不一致时
        alert("验证码输入错误!"); //则弹出验证码输入错误
        document.getElementById("inputCode").value = "";//清空文本框
        return false;
    }else {
        document.getElementById("liveMessage").submit();
    }
    });
}