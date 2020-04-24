<?php
/*
Classe di gestione del login
*/
require_once("../Beans/Utente.php");
require_once("../DAO/DAOUtente.php");
require_once("GestioneUtente.php");

class GestioneLogin {

    public function __construct() {

    }

    /*
    Esegue il login
    - Torna false se non esistono record con username e password passati
    - Torna true se esiste almeno un record
        - se ne esistono più di uno prende solo il primo
        - recupera inoltre le informazioni principali dell'utente che ha eseguito l'accesso
        e setta lo status a true
    - La funzione accetta tre parametri:
        - username e password che sono obbligatori
        - noPassword, un bool che se impostato a true evita di controllare la password
    */
    public function eseguiLogIn($username, $password, $noPassword) {
        $response["status"] = false;
        $checkLogin = DAOUtente::checkLogin($username, $password, $noPassword);
        if (count($checkLogin) > 0) {
            $idPersona = $checkLogin[0]["intIdPersona"];
            $resultSet = DAOUtente::getUtente($idPersona);
            foreach($resultSet as $row) {
                $infoUtente = new Utente();
                $infoUtente->setId($row['intIdPersona']);
                $infoUtente->setNUsername($row['strUsernamePersona']);
                $infoUtente->setNome($row['strNomePersona']);
                $infoUtente->setCognome($row['strCognomePersona']);
                $infoUtente->setForzaAggiornamento($row['boolForzaAggiornamento']);
                $infoUtente->setConfermataRegistrazione($row['booConfermataRegistrazione']);
                $response["infoUtente"] = $infoUtente->getJson();
                $response["moduliPermessi"] = $infoUtente->getId();
                $response["status"] = true;
            }

        }
        return json_encode($response);
    }

    /*
    Esegue il logOut eliminando la sessione
    Una volta tornata la response viene effettuato il reload della pagina
    */
    public function eseguiLogOut() {
        session_destroy();
        $response["status"] = true;
        return json_encode($response);
    }

}

?>