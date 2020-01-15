/*
File main globale con metodi di utlità a tutte le pagine
*/

// Variabili Globali
var attivaConsoleLog = true;


// Wrapper per la funzione jQuery getScript
// il parametro passato è una stringa che corrisponde al path
// dello script che si vuole caricare
function loadScript(link) {
    $.getScript(link, function() {
        if (attivaConsoleLog) {
            console.log("Script '" + link + "' caricato con successo");
        }
    }).fail(function() {
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
    bootbox.alert({
        message: "Operazione avvenuta con successo. " + !msg ? ' ' : msg
    });
}


// Mostra una bootbox di errore durante un'operazione
// Può essere passato anche un messaggio da mostrare
function popupFailure(msg) {
    bootbox.alert({
        message: "Errore durante l'operazione.<br />Contattare un amministratore ed indicare il seguente codice: " + !msg ? ' ' : msg
    });
}