function setNavStyle() {
    var pathname = window.location.pathname;
    var lis = document.getElementsByTagName('nav')[0].getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        var href = lis[i].children[0].getAttribute("href");
        if (href == pathname) {
            lis[i].className = "on";
        } else {
            lis[i].className = "";
        }
    }
}

setNavStyle();

(function() {
    var pathname = window.location.pathname;
    var lis = document.getElementsByTagName('nav')[0].getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = "";
            }
            this.className = "on";
        }

        lis[i].onmouseout = function() {
            setNavStyle();
        }
    }
})()