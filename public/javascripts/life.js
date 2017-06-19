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
                $.get("/life/get_articles", { id: id }, function(data) {
                    vue.articles = data;

                })
            }
        },
        computed: {
            getTypes: function() {
                $.get("/life/type", function(data) {
                    vue.types = data;
                })
            },
            initArticles: function() {
                $.get("/life/get_articles", function(data) {
                    vue.articles = data;
                })
            }
        }
    });
    vue.getTypes;
    vue.initArticles;
})