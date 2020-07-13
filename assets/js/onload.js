$(document).ready(function() {
    if (localStorage.getItem("logged") != null) {
        loadPage('main');
    } else {
        loadPage('login');
    }

});

function loadPage(page) {
    $.ajax({
        url: 'pages/' + page + '.html',
        type: 'get',
        dataType: 'html',
        success: function(html) {
            $("#container").html(html);
        }
    });
}

