<?php
/*
Oggetto generico di tipo Utente
*/
class Utente {

    // Attributi della classe
    private $id;
    private $nome;
    private $cognome;
    private $username;
    // private $password;
    private $email;
    private $forzaAggiornamento;
    private $confermataRegistrazione;

    // Metodo costruttore di default
    public function __construct() {

    }

    // Metodi della classe
    public function getJson() {
        $jsonObject["id"] = $this->id;
        $jsonObject["nome"] = $this->nome;
        $jsonObject["cognome"] = $this->cognome;
        $jsonObject["username"] = $this->username;
        $jsonObject["email"] = is_null($this->email) ? "" : $this->email;
        $jsonObject["forzaAggiornamento"] = $this->forzaAggiornamento;
        $jsonObject["confermataRegistrazione"] = $this->confermataRegistrazione;
        return $jsonObject;
    }


    // Metodi Getter e Setter
    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setCognome($cognome) {
        $this->cognome = $cognome;
    }

    public function getCognome() {
        return $this->cognome;
    }

    public function setNUsername($username) {
        $this->username = $username;
    }

    public function getUsername() {
        return $this->username;
    }

    // public function setPassword($password) {
    //     $this->password = $password;
    // }

    // public function getPassword() {
    //     return $this->password;
    // }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setForzaAggiornamento($forzaAggiornamento) {
        $this->forzaAggiornamento = $forzaAggiornamento;
    }

    public function getForzaAggiornamento() {
        return $this->forzaAggiornamentomail;
    }

    public function setConfermataRegistrazione($confermataRegistrazione) {
        $this->confermataRegistrazione = $confermataRegistrazione;
    }

    public function getConfermataRegistrazione() {
        return $this->confermataRegistrazione;
    }



}
?>