//文章分类:
var article_web = function() {
    web_types = [];

    $.get("/web/type", function(data1) {;
        web_types = data1;
        var str1 = "前端文章分类:";
        for (var i = 0; i < web_types.length; i++) {
            str1 += "<li ><a href='/web/get_articles?id=" + web_types[i]._id + "'> " + web_types[i].name + "<span>(" + web_types[i].name.length + ")</span></a></li >"

        };
        $(".web").html(str1);
    });

}
$(function() {
    article_web();
});

var article_life = function() {
    life_types = [];
    $.get("/life/type", function(data2) {
        life_types = data2;
        var str2 = "生活文章分类:";
        for (var i = 0; i < life_types.length; i++) {
            for (var i = 0; i < life_types.length; i++) {
                str2 += "<li ><a href='/life/get_articles?id=" + life_types[i]._id + "'> " + life_types[i].name + "<span>(" + life_types[i].name.length + ")</span></a></li >"

            };
        };
        $(".life").html(str2);
    });







};
$(function() {
    article_life();
});

//最新的十篇文章:
var recent_Article = function() {
    datas = [];
    var newArticle = [];
    $.get("/article/recent", function(data) {
        function type_sort(item) {
            return item.type != "心情"
        }
        var datas = data.filter(type_sort);
        var newArticle = datas.slice(0, 10);
        var html = "";
        for (var i = 0; i < newArticle.length; i++) {
            html += "<li ><a href='/article/content?id=" + newArticle[i]._id + "'> " + newArticle[i].title + "</a></li >"
        };
        $(".recent_article").html(html);
    });
};

$(function() {
    recent_Article();
});
//最热的十篇文章:
var hot_Article = function() {
    var hotArticle = [];
    $.get("/article/hot/", function(hot_data) {
        function type_sort(item) {
            return item.type != "心情";
        }
        hotArticle = hot_data.filter(type_sort).slice(0, 10);
        var html = "";
        for (var i = 0; i < hotArticle.length; i++) {
            html += "<li ><a href='/article/content?id=" + hotArticle[i]._id + "'> " + hotArticle[i].title + "</a></li >"
        };
        $(".hot_article").html(html);
    })
};
$(function() {
    hot_Article();
});