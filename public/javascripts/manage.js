var vue = new Vue({
    el: '#mainbody',
    data: {
        articles: []
    },
    methods: {

    },
    computed: {
        initArticles: function() {
            $.get("/manage/get_articles", function(data) {
                vue.articles = data;
            })
        }
    }
});

vue.initArticles;