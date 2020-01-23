<?php
/*
Classe di gestione del login
*/
require_once("../Beans/Utente.php");

class Login {

    public function __construct() {

    }

    public function eseguiLogIn($username, $password) {
        $utente = new Utente();
        return json_encode($utente);
    }

    public function eseguiLogOut() {

    }

}

?>