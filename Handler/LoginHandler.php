<?php
/*
Handler che gestisce le chiamate per la parte di Login / Logout
dal sito.
Setta inoltre le variabili di sessione a cui le altre pagine faranno riferimento
*/
require_once("../Management/Login.php");

$action = $_POST["action"];
// $username = $_POST["username"];
// $password = $_POST["password"];
$classeLogin = new Login();

switch ($action) {
    case "login":
        echo $classeLogin->eseguiLogIn("ciao", "ciao");
        break;
    case "logout":
        return $classeLogin.eseguiLogOut();
        break;
}
?>