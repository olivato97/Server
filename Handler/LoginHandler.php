<?php
/*
Handler che gestisce le chiamate per la parte di Login / Logout
dal sito.
Setta inoltre le variabili di sessione a cui le altre pagine faranno riferimento
*/

// Classi di riferimento
require_once("../Management/Login.php");
require_once("../Management/CustomExceptioon.php");

// Apertura di una sessione se non è già presente
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Variabili possibili dell'handler
$action = $_POST["action"];

try {
    if (!isset($_POST["username"])) {
        throw new CustomExceptioon();
    }
    $username = $_POST["username"];
} catch (Exception $e) {
    $username = "";
}

try {
    if (!isset($_POST["password"])) {
        throw new CustomExceptioon();
    }
    $password = $_POST["password"];
} catch (Exception $e) {
    $password = "";
}

$classeLogin = new Login();

switch ($action) {
    case "login":
        echo $classeLogin->eseguiLogIn("admin", "password", false);
        break;
    case "logout":
        echo $classeLogin->eseguiLogOut();
        break;
}
?>