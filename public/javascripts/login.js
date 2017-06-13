function validation() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('password').value;


    // var userName_len = userName.length;
    // var userName_maxLen = 25;
    // var username_tips=document.getElementById('username_tips')
    if (!userName) {
        alert("请输入用户名!");
        userName.foucus();
        return false;
    };
    // if (userName_len == 0 || userName_len >= userName_maxLen) {
    //     username_tips.innerHTM="用户名字数要求为1-25字符" ;       
    // };
    if (!password) {
        alert("请输入密码!");
        return false;
    }
    return true;
}
var submit = document.getElementById("submit");
submit.onclick = function() {
    if (validation() == true) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        $.post("/account/login", { username: username, password: password }, function(data) {
            if (data.errors.length == 0) {
                window.location.href = '/';
            } else {

            }
        })
    }
}