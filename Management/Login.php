<?php
/*
Classe di gestione del login
*/
require_once("../Beans/Utente.php");
require_once("../DAO/DAOUtente.php");

class Login {

    public function __construct() {

    }

    public function eseguiLogIn($username, $password) {
        $utente = new Utente();
        $prova = DAOUtente::getUtente("ciao");
        return $prova;
    }

    public function eseguiLogOut() {

    }

}

?>