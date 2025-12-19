<?php
// get-reviews.php
require 'config.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $stmt = $pdo->query("SELECT reviewer, review FROM reviews ORDER BY created_at DESC LIMIT 20");
    $rows = $stmt->fetchAll();
    echo json_encode($rows);
} catch (Exception $e) {
    echo json_encode([]);
}
