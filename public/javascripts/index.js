window.onload = function() {
    //最新相册 的banner页面:
    var photos = document.getElementsByClassName('photo')[0].getElementsByTagName("li");
    var banner = document.getElementsByClassName('banner')[0];
    var buttons = document.getElementsByClassName('order')[0].getElementsByTagName('li');
    var timer = toggle = null;
    var i = index = 0;
    //切换按钮： 
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].index = i;
        buttons[i].onmouseover = function() {
            show(this.index)
        }
    }
    //鼠标滑过关闭定时器：
    banner.onmouseover = function() {
        clearInterval(toggle);
    }
    banner.onmouseout = function() {
        autoToggle()
    };

    //自动切换
    function autoToggle() {
        toggle = setInterval(function() {
            index++;
            index >= photos.length && (index = 0);
            show(index);
        }, 3000)
    }
    autoToggle();

    //图片切换, 淡入淡出效果
    function show(a) {
        index = a;
        var alpha = 0;
        for (i = 0; i < buttons.length; i++) {
            buttons[i].className = ""
        }
        clearInterval(timer);
        buttons[index].className = "current";


        for (i = 0; i < photos.length; i++) {
            photos[i].style.opacity = 0;
            photos[i].style.filter = "alpha(opacity=0)";
            photos[i].style.display = "none";
        }

        photos[index].className = "current";
        photos[index].style.display = "block";

        timer = setInterval(function() {
            alpha += 2;
            alpha > 100 && (alpha = 100);
            photos[index].style.opacity = alpha / 100;
            photos[index].style.filter = "alpha(opacity = " + alpha + ")";
            alpha == 100 && clearInterval(timer)
        }, 50);

    }




    window.addEventListener('scroll', function(e) {
        scrollFunction();
    });

    function scrollFunction() {
        console.log(document.body.scrollTop);
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            document.getElementById("btn").style.display = "block";
        } else {
            document.getElementById("btn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


}




var recent_Photos = function() {
    $.get("/photo/recent", function(data) {
        var newPhotos = data.slice(0, 5);
        var html = "";
        var dot = "";
        for (var i = 0; i < newPhotos.length; i++) {
            var className = i == 0 ? "current" : "";
            html += '<li class="' + className + '" ><a href=""><img  src="' + newPhotos[i].src + '" alt="近期图片"></a></li>';
            dot += '<li class="' + className + '"></li>';

        }
        $(".photo").html(html);
        $(".order").html(dot);
    })
}

$(function() {
        recent_Photos();
    })
    /*推荐文章时间显示与隐藏与透明度效果：*/
$(function() {
    $('.blogs').mouseenter(function() {
        $(this).$(".dateView").fadeIn(30);
    });
    $('.blogs').mouseleave(function() {
        $(this).$(".dateView").fadeout(30);
    });
})

/*移动端导航菜单的显示隐藏*/
var toggle_button = document.getElementsByClassName("navbar-toggle")[0];
var items_list = document.getElementsByClassName('collapse')[0].getElementsByTagName('ul')[0];
var items = document.getElementsByClassName('navbar')[0].getElementsByTagName('a');
toggle_button.onclick = function() {
    items_list.style.display == items_list.style.display ? "block" : "none;"

}