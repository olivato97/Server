/*
File main globale con metodi di utlità a tutte le pagine
*/

// Variabili Globali
var attivaConsoleLog = true;


// Wrapper per la funzione jQuery getScript
// il parametro passato è una stringa che corrisponde al path
// dello script che si vuole caricare
function loadScript(link) {
    $.getScript(link, function () {
        if (attivaConsoleLog) {
            console.log("Script '" + link + "' caricato con successo");
        }
    }).fail(function () {
        if (attivaConsoleLog) {
            console.log("Errore durante il caricamento dello script" + link);
        }
    });
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