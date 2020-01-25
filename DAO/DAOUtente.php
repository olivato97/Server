<?php
/*
Classe di metodi statici per l'Utente
*/

require_once("../Management/DBConnection.php");

class DAOUtente {
    public static function getUtente($id) {
        $query = "SELECT * FROM prova";
        $param = [
        ];
        $result = DBConnection::execQuery($query, $param);
        return $result;
    }

}

?>