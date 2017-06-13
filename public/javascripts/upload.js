$(function() {
    $("#img_upload").on("change", function() {
        if (this.files && this.files.length > 0) {
            var blobFile = this.files[0];
            var formData = new FormData();
            formData.append("image", blobFile);

            $.ajax({
                url: "/files/upload",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    $("#img").attr("src", response);
                },
                error: function(jqXHR, textStatus, errorMessage) {
                    console.log(errorMessage); // Optional
                }
            });
        }
    })
})



$("#submit").click(function() {
    var photo = {
        _id: "",
        title: "",
        src: ""
    };

    photo.title = $("#title").val();
    photo.src = $("#img").attr("src");

    $.post("/photo/upload", photo, function(data) {
        window.location.href = "/photo";
    })
});