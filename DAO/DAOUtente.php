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


    /*
    Estrae i permessi / profili dell'utente
    */
    public static function getProfiliPermessiUtente($idUtente) {
        $query = "
        -- Estraggo i permessi individuali associati alla persona
        CREATE TEMPORARY TABLE #tmpPermessi (
            SELECT Permessi.intIdPermesso
                , Permessi.strNomePermesso
                , IFNULL(Permessi.strPaginaCollegata, 'ND') AS strPaginaCollegata
            FROM Persone
            INNER JOIN PersonePermessi
                ON PersonePermessi.intIdPersona = Persona.intIdPersona
                AND PersonePermessi.boolAttivo = 1
            INNER JOIN Permessi
                ON Permessi.intIdPermesso = PersonePermessi.intIdPermesso
                AND Permessi.boolAttivo = 1
            WHERE Persone.intIdPersona = :idUtente
        );

        -- Estraggo i profili associati alla persona
        CREATE TEMPORARY TABLE #tmpProfili (
        SELECT Profili.intIdProfilo
            , Profili.strNomeProfilo
            , IFNULL(Profili.strPaginaCollegata, 'ND') AS strPaginaCollegata
        FROM Persone
        INNER JOIN PersoneProfili
            ON PersoneProfili.intIdPersona = Persona.intIdPersona
            AND PersoneProfili.boolAttivo = 1
        INNER JOIN Profili
            ON Profili.intIdProfilo = PersoneProfili.intIdProfilo
            AND Profili.boolAttivo = 1
        INNER JOIN ProfiliPermessi
            ON ProfiliPermessi.intIdProfilo = Profili.intIdProfilo
            AND ProfiliPermessi.boolAttivo = 1
        INNER JOIN Permessi
            ON Permessi.intIdPermesso = ProfiliPermessi.intIdPermesso
            AND Permessi.boolAttivo = 1
        WHERE Persone.intIdPersona = :idUtente


        -- Unisco le due tabelle
        SELECT *
        FROM #tmpPermessi

        UNION

        SELECT *
        FROM #tmpPermessi


        ";
    
        $param = [
            ":idUtente" => $idUtente
        ];
        $result = DBConnection::execQuery($query, $param);
        return $result;
    }


}
?>