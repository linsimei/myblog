//文章类型选择样式
function addParentClick() {
    var types = document.getElementById("type").getElementsByTagName("li");
    var type_hidden = document.getElementById("type_hidden");
    var child = document.getElementById("child");

    for (var i = 0; i < types.length; i++) {
        types[i].onclick = function() {
            for (var i = 0; i < types.length; i++) {
                types[i].className = "";
            }
            this.className = "current";
            child.style.display = "block";
            type_hidden.value = this.innerText;
            appendChild($(this).attr("id"));
            //模拟下拉列表操作：
            $('.selected_list').hide();
            $('.selected_list').slideDown();



        }
    }
}

function appendChild(id) {
    var children = types_data.filter(item => item.parent == id);
    if (children.length > 0) {
        var html = "<span>请选择分类...</span>";
        children.forEach(function(element) {
            html += "<div id='" + element._id + "'>" + element.name + "</div>";
        }, this);

        $(".selected_list").html(html);
        AddChildClick();
    } else {
        $("#child").hide();
    }

}

function AddChildClick() {
    $(".selected_list div").each(function(index, item) {
        $(item).click(function() {
            $("#type_hidden").val($(this).attr("id"));

            $(".selected_list div").each(function() {
                $(this).removeClass("current");
            })
            $(this).addClass("current");
            //模拟下拉列表收起操作：

            $(this).parents('div').find('span').html($(this).html());
            $(this).parents('div').find('.selected_list div').slideUp();
            $(this).parents('div').find('span').addClass("selectStyle");

        });


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