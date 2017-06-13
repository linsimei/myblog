var app = new Vue({
    el: '#mainbody',
    data: {
        photos: [],
        times: []
    },
    computed: {
        initPhotos: function() {
            $.get("/photo/all", function(data) {
                app.photos = data;

            })
        }
    }
})
app.initPhotos;