
var Home = function () {
    this.args;
}

Home.prototype.initPagina = function() {
    var _this = this;
    
    $('#ciao').on('click', function() {
        var objParam = {};
        objParam.action = "login";
        $.ajax({
            url: '/Handler/LoginHandler.php',
            data: objParam,
            type: "POST",
            cache: false,
        }).done(function (response) {
            // console.log(response);
            console.log(JSON.parse(response));
        });
    
    });

    $('#addio').on('click', function() {
        var objParam = {};
        objParam.action = "logout";
        $.ajax({
            url: '/Handler/LoginHandler.php',
            data: objParam,
            type: "POST",
            cache: false,
        }).done(function (response) {
            var obj = JSON.parse(response);
            if (obj.status) {
                window.location.reload();
            }
        });
    
    });

};