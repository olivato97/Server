<?php
/*
Oggetto generico di tipo Utente
*/
class Utente {

    private $nome;
    private $cognome;
    private $username;
    private $password;
    private $email;

    public function __construct() {

    }

    public function setNome($nome) {
        $this->$nome = $nome;
    }

    public function getNome() {
        return $this->$nome;
    }

    public function setCognome($cognome) {
        $this->$cognome = $cognome;
    }

    public function getCognome() {
        return $this->$cognome;
    }

    public function setNUsername($username) {
        $this->$username = $username;
    }

    public function getUsername() {
        return $this->$username;
    }

    public function setPassword($password) {
        $this->$password = $password;
    }

    public function getPassword() {
        return $this->$password;
    }

    public function setEmail($email) {
        $this->$email = $email;
    }

    public function getEmail() {
        return $this->$email;
    }

}
?>