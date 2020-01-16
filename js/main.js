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
    var len = $('script').filter(function () {
        return ($(this).attr('src') == url);
    }).length;
    if (+len === 0) {
        newscript = document.createElement('script');
        newscript.type = 'text/javascript';
        newscript.async = true;
        newscript.src = url;
        $('head').append(newscript);
    }
}


// Rimuove uno script nell'head della pagina
// il parametro passato è una stringa che corrisponde al path
// dello script che si vuole rimuovere
function removeScript(url) {
    var newscript;
    var script = $('script').filter(function () {
        return ($(this).attr('src') == url);
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
    }).done(function (data) {
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

// Mostra una bootbox di operazione avvenuta correttamente
// Può essere passato anche un messaggio da mostrare
function popupSuccess(msg) {
    console.log(msg);
    //var alertWrapper = $('.alert-wrapper');
    //alertWrapper.append('<div class="alert alert-success" id="success-alert" style="display:none; position: absolute; top: 10%; left: 50%; z-index: 1000;"></div>');
    $('#success-alert').append("Operazione avvenuta con successo. " + (!msg ? ' ' : msg) + "<br/>");
    $('#success-alert').fadeIn('slow', () => {
        setTimeout(function () {
            $('#success-alert').fadeOut('slow', function () {
                $(this).html('');
            });
        }, 2000);
    });
}


// Mostra una bootbox di errore durante un'operazione
// Può essere passato anche un messaggio da mostrare
function popupFailure(msg) {
    $('#failure-alert').append("Errore durante l'operazione.<br />Contattare un amministratore ed indicare il seguente codice: " + (!msg ? ' ' : msg)+ "<br/>");
    $('#failure-alert').fadeIn('slow');
    setTimeout(function () {
        $('#failure-alert').fadeOut('slow', function () {
            $(this).html('');
        });
    }, 2000);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("wrap").style.display = "block"
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("wrap").style.display = "none"
}
$("#wrap").on("click", function () {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("wrap").style.display = "none"
});