<?php

class Database
{

    public $db;

    function __construct()
    {
        try {
            $this->db = new PDO("mysql:host=localhost;dbname=api;charset=utf8", "root", "04181414");
            echo "<h1>database connected</h1>";
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }

    }

}


