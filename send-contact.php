<?php
// send-contact.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome     = trim($_POST['nome'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $oggetto  = trim($_POST['oggetto'] ?? 'Richiesta informazioni Rent Mario');
    $messaggio= trim($_POST['messaggio'] ?? '');

    if ($nome === '' || $email === '' || $messaggio === '') {
        header('Location: contatti.html?error=1');
        exit;
    }

    $to      = 'info@rentmario.it'; // qui la tua mail reale
    $subject = $oggetto;
    $body    = "Nome: $nome\nEmail: $email\nTelefono: $telefono\n\nMessaggio:\n$messaggio";
    $headers = "From: info@rentmario.it\r\n"
             . "Reply-To: $email\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        header('Location: contatti.html?ok=1');
    } else {
        header('Location: contatti.html?error=1');
    }
    exit;
}

header('Location: contatti.html');
exit;
