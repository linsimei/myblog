$(function() {
    var vue = new Vue({
        el: '.mainbody',
        data: {
            types: [],
            articles: [],
            currentType: ""
        },
        methods: {
            type_click: function(id) {
                vue.currentType = id;
                $.get("/web/get_articles", { id: id }, function(data) {
                    vue.articles = data;
                })
            }
        },
        computed: {
            getTypes: function() {
                $.get("/web/type", function(data) {
                    vue.types = data;
                })
            },
            initArticles: function() {
                $.get("/web/get_articles", function(data) {
                    vue.articles = data;
                })
            }
        }
    });
    vue.getTypes;
    vue.initArticles;
});