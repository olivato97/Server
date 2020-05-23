<?php
/*
Handler che gestisce le chiamate per la pagina di Amministrazione del sito.
Setta inoltre le variabili di sessione a cui le altre pagine faranno riferimento
*/


// Classi di riferimento
require_once("../Management/GestioneAmministrazione.php");
require_once("../Management/CustomExceptioon.php");


// Apertura di una sessione se non è già presente
include_once('../Management/InitSession.php');

// Variabili possibili dell'handler
$action = "";
try {
    if (!isset($_POST["action"])) {
        throw new CustomExceptioon();
    }
    $action = $_POST["action"];
} catch (Exception $e) {
    $action = "errore";
}

$classeAmministrazione = new GestioneAmministrazione();

switch ($action) {
    case "getListaUtenti":
        echo $classeAmministrazione->getListaUtenti();
        break;
    case "errore":
        echo json_encode(false);
        break;
}

?>