var get_comments = function() {
    $.get('/comment/comment_json/', function(data) {
        var html = "";

        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].submitTime).format();
            html += "<div class=\"comments\"> " +
                "<div class=\"name\">" + data[i].name + ":" + "</div> " +
                "<div class=\"message\">" + data[i].message + "</div>" +
                "<div class=\"time\">" + date + "</div>" +
                "<a href='/comment/delete?id=" + data[i]._id + "'>删除</a>" +
                "</div>";
        }
        $("#comments_list").html(html);
        $("#count").html(data.length);
    })
};
get_comments();