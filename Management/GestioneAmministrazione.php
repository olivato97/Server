<?php
/*
Classe di gestione dell'amministrazione
*/
require_once("../Beans/Utente.php");
require_once("../DAO/DAOUtente.php");

class GestioneAmministrazione {

    public function __construct() {

    }

    /*
    Carica la lista degli utenti
    */
    public function getListaUtenti() {
        $response["status"] = false;
        $listaUtenti = DAOUtente::getListaUtenti();
        if (count($listaUtenti) > 0) {
            $jaResp = array();
            foreach($listaUtenti as $row) {
                $infoUtente = new Utente();
                $infoUtente->setId($row['intIdPersona']);
                $infoUtente->setNUsername($row['strUsernamePersona']);
                $infoUtente->setNome($row['strNomePersona']);
                $infoUtente->setCognome($row['strCognomePersona']);
                $infoUtente->setForzaAggiornamento($row['boolForzaAggiornamento']);
                $infoUtente->setConfermataRegistrazione($row['booConfermataRegistrazione']);
                array_push($jaResp, $infoUtente->getJson());
            }
            $response["status"] = true;
            $response["data"] = $jaResp;
        }
        return json_encode($response);
    }


}

?>