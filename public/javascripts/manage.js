var vue = new Vue({
    el: '.blogs_list',
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