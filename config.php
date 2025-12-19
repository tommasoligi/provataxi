<?php
// config.php

$host = 'localhost';
$db   = 'rentmario';        // NOME DATABASE
$user = 'UTENTE_DB';        // utente MySQL Aruba
$pass = 'PASSWORD_DB';      // password MySQL Aruba

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (Exception $e) {
    die('Errore connessione database');
}
