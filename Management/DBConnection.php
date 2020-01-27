<?php
/*
Classe che gestisce la connessione al DB
*/
class DBConnection {

    private static $jsonConnectionString;
    private static $connection;

    /*
    Carica nella variabile della classe la stringa json con i dati
    del Database richiesto e poi crea la connessione
    */
    private static function caricaDB() {
        self::$jsonConnectionString = json_decode(file_get_contents("../connectionString-.json"), true);
        $databaseKey = $_SESSION["databaseKey"];
        DBConnection::setDBConnection(self::$jsonConnectionString[$databaseKey], $databaseKey);
    }

    /*
    Crea la connessione e la setta nella variabile private della classe
    */
    private static function setDBConnection($jsonConnectionString, $databaseKey) {
        $servername = $jsonConnectionString["servername"];
        $username = $jsonConnectionString["username"];
        $password = $jsonConnectionString["password"];
        $database = $jsonConnectionString["database"];
        try {
            self::$connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            // set the PDO error mode to exception
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully";
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    /*
    Crea la stringa della query con i parametri passati nell'array
    Esempio:
    $query = "UPDATE users SET name = :user_name WHERE id = :user_id";
    $params = [':user_name' => 'foobear', ':user_id' => 1001];
    */
    private static function buildQuery($string, $array) {
        //Get the key lengths for each of the array elements.
        $keys = array_map('strlen', array_keys($array));
    
        //Sort the array by string length so the longest strings are replaced first.
        array_multisort($keys, SORT_DESC, $array);
    
        foreach($array as $k => $v) {
            //Quote non-numeric values.
            $replacement = is_numeric($v) ? $v : "'{$v}'";
    
            //Replace the needle.
            $string = str_replace($k, $replacement, $string);
        }
    
        return $string;
    }

    /*
    Passati come parametri la query e l'array con i parametri fa:
    1 - Carica il metodo caricaDB
    2 - Carica il metodo buildQuery con parametri:
        - la stringa della query
        - array di parametri
    3 - Aggiunge a tmp (variabile locale) la query con il prepare
    4 - Esegue la query
    5 - Assegna a $resultSet il dataset ritornato dalla query
    6 - Ritorna il risulato della query sotto forma di JSON
    */
    public static function execQuery($query, $param) {
        DBConnection::caricaDB();
        $tmp = self::$connection->prepare(DBConnection::buildQuery($query, $param));
        $tmp->execute();
        $resultSet = $tmp->fetchAll(PDO::FETCH_ASSOC);
        self::$connection = null;
        // return json_encode($resultSet, true);
        return $resultSet;
    }

}
?>