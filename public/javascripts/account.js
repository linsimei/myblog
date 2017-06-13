function validation() {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmpassword').value;
    //    var pass_checkde=function(){
    //         if (!userName) {
    //         alert("请输入用户名!");
    //         return false;
    //     }

    //    }

    // var userName_len = userName.length;
    // var userName_maxLen = 25;
    // var username_tips=document.getElementById('username_tips')
    if (!userName) {
        alert("请输入用户名!");
        userName.focus();
        return false;
    };
    // if (userName_len == 0 || userName_len >= userName_maxLen) {
    //     username_tips.innerHTM="用户名字数要求为1-25字符" ;       
    // };
    if (!password) {
        alert("请输入密码!");
        return false;
    }
    if (!confirmPassword) {
        alert("请输入重复密码!");
        return false;
    }
    if (password != confirmPassword) {
        alert("两次密码输入不一致!")
    }

    return true;
}
var submit = document.getElementById("submit");
submit.onclick = function() {
    if (validation() == true) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        // http.post('/account', { username: username, password: password },function(data){
        //     alert(data);
        // })

        $.post("/account", { username: username, password: password }, function(data) {
            if (data.errors.length > 0) {
                for (var i = 0; i < data.errors.length; i++) {
                    $("#" + data.errors[i].name + "_tips").html(data.errors[i].error);
                }

            }
        })
    }
}