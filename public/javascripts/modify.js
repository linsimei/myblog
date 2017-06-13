$(function() {
    var id = url.query.id;
    // 获取元素
    var textarea = document.getElementById('content');
    // 生成编辑器
    var editor = new wangEditor(textarea);
    editor.config.uploadImgUrl = '/files/upload';
    editor.create();

    $.get("/article/get_article", { id: id }, function(data) {
        $("#type_hidden").val(data.type);
        $("#title").val(data.title);
        $("#author").val(data.author);
        $("#id_hidden").val(data._id);
        editor.$txt.append(data.content);

    })


})

//文章类型选择样式
function addParentClick() {
    var types = document.getElementById("type").getElementsByTagName("li");
    var type_hidden = document.getElementById("type_hidden");
    for (var i = 0; i < types.length; i++) {
        types[i].onclick = function() {
            for (var i = 0; i < types.length; i++) {
                types[i].className = "";
            }
            this.className = "current";
            type_hidden.value = this.innerText;

            appendChild($(this).attr("id"));
        }
    }
}

function appendChild(id) {
    var children = types_data.filter(item => item.parent == id);
    var html = "";
    children.forEach(function(element) {
        html += "<div id='" + element._id + "'>" + element.name + "</div>";
    }, this);

    $("#child").html(html);
    AddChildClick();
}

function AddChildClick() {
    console.log($("#child div"));
    var children = $("#child div").each(function(index, item) {
        $(item).click(function() {
            console.log($(this).attr("id"));
            $("#type_hidden").val($(this).attr("id"));
        })
    });
}


var types_data = [];

$(function() {
    $.get("/type/parent_type", function(data) {
        types_data = data;

        function parentIsEmpty(item) {
            return item.parent == "";
        }
        var parents = data.filter(parentIsEmpty);
        var html = "";
        for (var i = 0; i < parents.length; i++) {
            html += "<li id=" + parents[i]._id + ">" + parents[i].name + "</li>";
        }
        $("#type").html(html);
        addParentClick();

        console.log(parents);
    })
})