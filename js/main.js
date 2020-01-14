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

$(document).ready(() => {
    console.log("is' alive");
    loadScript("./plugins/popper/popper.min.js");
});
