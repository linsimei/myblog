var vue = new Vue({
    el: '.bloglist',
    data: {

        blogs: [],

    },
    methods: {

        mouseOver: function() {
            //$(this).$(".dateView").fadeIn(30);
        },
        mouseOut: function() {
            //$(this).$(".dateView").fadeout(30);
        }


    },
    computed: {

        initArticles: function() {
            $.get("/article/all_recommend", function(data) {
                data.forEach(function(element) {
                    element.content = $(element.content).text();
                }, this);
                vue.blogs = data;
            })
        }
    }
});

vue.initArticles;