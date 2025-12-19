<?php
// save-review.php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reviewer = trim($_POST['reviewer'] ?? '');
    $review   = trim($_POST['review'] ?? '');

    if ($reviewer === '' || $review === '') {
        header('Location: recensioni.html?error=1');
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (reviewer, review) VALUES (:r, :v)");
        $stmt->execute([
            ':r' => $reviewer,
            ':v' => $review
        ]);
        header('Location: recensioni.html?ok=1');
    } catch (Exception $e) {
        header('Location: recensioni.html?error=1');
    }
    exit;
}

header('Location: recensioni.html');
exit;
