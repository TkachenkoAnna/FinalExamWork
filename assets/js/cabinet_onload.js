$(document).ready(function() {
    loadCabinet('hotels');

    $("#sidebarMenu a").click(function() {
        loadCabinet($(this).data("content"));
    });

    $('#sidebarMenu ul li a').click(function(){
        if($(this).parent().hasClass('active')){
            return false;
        }
        $('#sidebarMenu ul li').removeClass('active');
        $(this).parent().addClass('active');
    });
});

function loadCabinet(page) {
    $.ajax({
        url: 'pages/cabinet/' + page + '.html',
        type: 'get',
        dataType: 'html',
        success: function(html) {
            $("#cabinet_content").html(html);
        }
    });
}