
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

};