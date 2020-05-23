/*
File main globale con metodi di utlità a tutte le pagine
*/
// Variabili Globali
var Permissions = ["amministrazione", "meme"];


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


// Funzioni per il controllo del comportamento del menù laterale
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


// Funzione base per la creazione delle Bootbox per il LogIn e SignUp
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


// Funzione chiamata per fare il LogIn o il SingUp
$("#LogInForm").on("click", function() {
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
                    logIn(usernameLogin, passwordLogin, false);
                    successNotify(usernameLogin + " " + passwordLogin);
                }
            }
        },
    };
    Bootbox(message, title, buttons);
});


// Carica nel page-wrapper l'html della pagina richiesta
// cercandola nel path all'interno di visteWeb
function LoadPageContent(PageName) {
    // Getting elements from server and saving the in the variable data
    $.get(`/visteWeb/${PageName}/${PageName}.html`, function(response) {
        //console.log("file: ", response);
        $("#page-wrapper").append($(response));
    });
}


// Come dice il nome, cancella il contentuto del page-wrapper
function BrasaMain() {
    $("#page-wrapper").html("");
}


// Funzione aggregata che prima svuota il page-wrapper
// e dopo carica la pagina richiesta
function ChangePage(PageName) {
    BrasaMain();
    LoadPageContent(PageName);
}


// Handler che aggiunge un comportamento ai bottoni del menù laterale
function SetButtonHandler() {
    $(".menu-element").off("click").on("click", function() {
        var oggettoCliccato = $(this);
        var pagina = oggettoCliccato.data('pagename').toLowerCase();
        ChangePage(pagina);
        closeNav();
    });
}


// appende le pagine in basi ai permessi ricevuti
function setPermision(params) {
    Permissions.forEach((Permission) => {
        var c = `<div class="nav-item nav-link nav-class menu-element" data-pagename="${Permission}">${Permission}</div>`
        $(params).append(c)
    })
    SetButtonHandler();
}


// Chiamata all'autenticazione per il login
// Parametri: username e password (verrà convertita in md5)
// noPassword, parametro che di default sarebbe a false
// serve per loggarsi utilizzando solo l'username
function logIn(username, password, noPassword) {
    var objParam = {};
    objParam.action = "login";
    objParam.username = username;
    objParam.password = md5(password);
    objParam.noPassword = noPassword;

    $.ajax({
        url: '/Handler/LoginHandler.php',
        data: objParam,
        type: "POST",
        cache: false,
    }).done(function (response) {
        var obj = JSON.parse(response);

    });

}


// Esegue il logout chiudendo la sessione
// resettando tutte le variabili lato client
// e ricaricando la pagina alla home
function logOut() {
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

}


/*
Aggiunge / rimuove l'elemento dal DOM
Può essere sia un id che una classe
Stato: opzioni del metodo
- 1: rimuove l'elemento
- 2: appende il nuovoElemento all'elemento
- 3: sostituisce il contenuto dell'elemento con il nuovoElemento
- 4: svuota l'elemento
*/
function modificaElementoDOM(stato, elemento, nuovoElemento) {

    switch (stato) {
        case 1:
            $(elemento).remove();
            break;
        case 2:
            $(elemento).append(nuovoElemento);
            break;
        case 3:
            $(elemento).html(nuovoElemento);
            break;
        case 4:
            $(elemento).html();
            break;
        default:
            console.log("0");
            break;
    }

}


// Cerco se ho il permesso nei moduli
// Parametri:
// type: "MODULO" - "PERMESSO"
function checkModuloPermesso(type, chiave) {
    switch (type) {
        case "MODULO":
            if (ModuliUtente.indexOf(chiave) >= 0) {
                return true;
            }
            break;
        case "PERMESSO":
            if (PermessiUtente.indexOf(chiave) >= 0) {
                return true;
            }
            break;
        default:
            return false;
            break;
    };

}


