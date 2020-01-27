<?php
/*
Classe di metodi statici per l'Utente
*/

require_once("../Management/DBConnection.php");

class DAOUtente {

    /*
    Estrae le informazioni dell'utente passato come parametro
    */
    public static function getUtente($idPersona) {
        $query = "
            SELECT *
            FROM Persone
            WHERE intIdPersona = :idPersona
                AND boolAttivo = 1
        ";

        $param = [
            ":idPersona" => $idPersona
        ];

        $result = DBConnection::execQuery($query, $param);
        return $result;
    }

    /*
    Esegue il check dei dati in DB
    */
    public static function checkLogin($user, $pass, $noPassword) {
        $query = "
        SELECT intIdPersona
        FROM Persone
        WHERE (
                strUserNamePersona = :user
                /* OR strEmailPersona = :user */
            )
            
            AND (
                strPasswordPersona = :pass
                OR :noPass = 1
            )
            
        ";
        $param = [
            ":user" => $user,
            ":pass" => md5($pass),
            ":noPass" => $noPassword
        ];
        $result = DBConnection::execQuery($query, $param);
        return $result;
    }



}
?>