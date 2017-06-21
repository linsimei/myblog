function setNavStyle() {
    var pathname = window.location.pathname;
    var lis = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
    for (var i = 0; i < lis.length; i++) {
        var href = lis[i].getAttribute("href");
        if (href == pathname) {
            lis[i].className = "on";
        } else {
            lis[i].className = "";
        }
    }
}

$(function() {

    var pathname = window.location.pathname;
    var lis = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
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

    /*移动端导航菜单的显示隐藏*/
    var toggle_button = document.getElementsByClassName("navbar-toggle")[0];
    var items_list = document.getElementsByClassName('collapse')[0].getElementsByTagName('ul')[0];
    var items = document.getElementsByClassName('navbar')[0].getElementsByTagName('a');
    toggle_button.onclick = function() {
            items_list.style.display = items_list.style.display == "block" ? "none" : "block";
        }
        // for (var i = 0; i < items.length; i++) {
        //     items.onclick = function() {
        //         items.style.display == "none;"
        //     }
        // }

    setNavStyle();


})