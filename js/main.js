/*
File main globale con metodi di utlità a tutte le pagine
*/
// Variabili Globali
var attivaConsoleLog = true;
// Inserisce uno script nell'head della pagina
// il parametro passato è una stringa che corrisponde al path
// dello script che si vuole caricare
function loadScript(link) {
    var newscript;
    var len = $('script').filter(function() {
        return ($(this).attr('src') == link);
    }).length;
    if (+len === 0) {
        newscript = document.createElement('script');
        newscript.type = 'text/javascript';
        newscript.async = true;
        newscript.src = link;
        $('head').append(newscript);
    }
}


// Rimuove uno script nell'head della pagina
// il parametro passato è una stringa che corrisponde al path
// dello script che si vuole rimuovere
function removeScript(link) {
    var newscript;
    var script = $('script').filter(function() {
        return ($(this).attr('src') == link);
    });
    if (script.length > 0) {
        $(script).remove();
    }
}


// Ritorna il path assoluto di una qualsia risorsa
// Parametri accettati
// Tipo risorsa: in base al tipo della risorsa passata crea il path assoluto
// Utente: serve se si deve caricare / scaricare da una sottocartella di Files (es /Files/10/...)
// se l'utente non viene specificato, allora si farà riferimento alla cartella /Files/public/...
function downloadRisorsa(idUtente, tipoRisorsa, idRisorsa) {
    var objParam = {};
    objParam.action = "downloadRisorsa";
    objParam.idUtente = idUtente;
    objParam.tipoRisorsa = tipoRisorsa;
    objParam.idRisorsa = idRisorsa;

    // funzione lato controller per copia file su /Temp/idUtente/tipoRisorsa
    $.ajax({
        url: "/Controller/NomeController.php",
        cache: false,
        data: objParam
    }).done(function(data) {
        var obj = JSON.parse(data);
        if (obj.status) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = obj.data.nomeFile;
            link.href = obj.data.pathFile;
            link.click();
            $(link).remove();
            popupSuccess();
        } else {
            popupFailure(obj.msg);
        }
    });

}


// BOOTSTRAP NOTIFY
function infoNotify(msg) {
    var jo = {};
    jo.msg = msg;
    jo.type = 'info';
    jo.icon = 'fa fa-15x fa-info';
    functionNotify(jo);
}

function warningNotify(msg) {
    var jo = {};
    jo.msg = msg;
    jo.type = 'warning';
    jo.icon = 'fa fa-15x fa-exclamation-triangle';
    functionNotify(jo);
}

function dangerNotify(msg) {
    var jo = {};
    jo.msg = msg;
    jo.type = 'danger';
    jo.icon = 'fa fa-15x fa-exclamation';
    functionNotify(jo);
}

function successNotify(msg) {
    var jo = {};
    jo.msg = msg;
    jo.type = 'success';
    jo.icon = 'fa fa-15x fa-info';
    functionNotify(jo);
}

function timeEventPersitentNotify(msg, time) {
    var jo = {};
    // time è in secondi
    function callbackFunction() {
        //qui deve informare che il tempoè scaduto
        bootbox.alert('tempo scaduto');
    }

    $.notify({
        // options
        message: msg,
        icon: 'fa fa-info'
    }, {
        // settings
        type: 'info',
        placement: {
            from: "bottom",
            align: "right"
        },
        mouse_over: null,
        delay: time * 1000, //tempo durata evento
        time: 1000, //update tempo durata
        showProgressbar: true,
        allow_dismiss: false,
        onClosed: callbackFunction,
        z_index: 1250
    });
}

function functionNotify(objNotify) {
    //boostrap notify. Vedi http://bootstrap-notify.remabledesigns.com/
    $.notify({
        // options
        message: '<b>' + objNotify.msg + '</b>',
        icon: objNotify.icon
    }, {
        // settings
        type: objNotify.type,
        mouse_over: 'pause',
        delay: 7500,
        z_index: 1250,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("wrap").style.display = "block"
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("wrap").style.display = "none"
}
$("#wrap").on("click", function() {
    closeNav()
});

//funzione base per la creazione delle Bootbox per il LogIn e SignUp
function Bootbox(message = " ", title = " ", buttons = {}) {
    bootbox.dialog({
        title: title,
        className: 'bootboxStyle',
        centerVertical: true,
        message: message,
        size: 'medium',
        buttons: buttons
    });
}

//funzione chiamata per fare il LogIn o il SingUp
$("#LogInForm").on("click", () => {
    let title = "Log In";
    let message =
        '<div class="form-row align-items-center">' +
        '    <div class="col-12">' +
        '        <label class="sr-only" for="inlineFormInput">Username</label>' +
        '        <input type="text" class="form-control mb-2" id="UsernameLogin" placeholder="Username"> </div>' +
        '    <div class="col-12">' +
        '        <label class="sr-only" for="inlineFormInputGroup">Password</label>' +
        '        <input type="password" class="form-control" id="PasswordLogin" placeholder="Password"> </div>' +
        '</div>';
    let buttons = {
        SingUpForms: {
            label: 'Sign Up',
            className: 'btn-primary',
            callback: function(result) {
                //se l'utente clicca sul pulsate di Sign Up viene chiusa la bootbox precedente e viene caricata quella sotto con i paramteri necessari
                if (result) {
                    let title2 = "Sign Up";
                    let message2 =
                        '<div class="form-row align-items-center">' +
                        '    <div class="col-12">' +
                        '        <label class="sr-only" for="inlineFormInput">Username</label>' +
                        '        <input type="text" class="form-control mb-2" id="UsernameSignup" placeholder="Username"> </div>' +
                        '    <div class="col-12">' +
                        '        <label class="sr-only" for="inlineFormInputGroup">Password</label>' +
                        '        <input type="password" class="form-control" id="PasswordSignup" placeholder="Password"> </div>' +
                        '</div>';
                    let buttons2 = {
                        LogInForms: {
                            label: 'Sign Up',
                            className: 'btn-primary',
                            callback: function(result) {
                                if (result) {
                                    let usernameSignup = $("#UsernameSignup").val();
                                    let passwordSignup = $("#PasswordSignup").val();
                                    successNotify(usernameSignup + " " + passwordSignup);
                                }
                            }
                        },
                    };
                    Bootbox(message2, title2, buttons2);
                }
            }
        },
        LogInForms: {
            label: 'Log In',
            className: 'btn-primary',
            callback: function(result) {
                if (result) {
                    let usernameLogin = $("#UsernameLogin").val();
                    let passwordLogin = $("#PasswordLogin").val();
                    successNotify(usernameLogin + " " + passwordLogin);
                }
            }
        },
    };
    Bootbox(message, title, buttons);
});

function LoadPageContent(PageName) {
    // Getting elements from server and saving the in the variable data
    $.get(`/visteWeb/${PageName}/${PageName}.html`, function(response) {
        //console.log("file: ", response);
        $("#page-wrapper").append($(response));
    });
}

function BrasaMain() {
    $("#page-wrapper").html("");
}

function ChangePage(PageName) {
    BrasaMain();
    LoadPageContent(PageName);
}

$(".menu-element").off('click').on("click", function() {
    var oggettoCliccato = $(this);
    var pagina = oggettoCliccato.data('pagename').toLowerCase();
    // console.log(pagina);
    ChangePage(pagina);
    closeNav();
})

