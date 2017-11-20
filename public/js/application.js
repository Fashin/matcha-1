$("#register").on('submit', function (event ) {
    event.preventDefault();
    var datastring = $("#register").serialize();
    console.log(datastring);
    $.ajax({
        type: "POST",
        url: "/register",
        data: datastring,
        success: function(data) {
            alert('Data send', data); // retour de ton API
        },
        error: function(err) {
            console.log(err) // tes err;
        }
    });
});

$(document).ready(function() {
    $('select').material_select();
});

$('select').material_select('destroy');