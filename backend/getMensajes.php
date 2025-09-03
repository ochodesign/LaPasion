<?php
// backend/getMensajes.php
// Limpia cualquier buffer previo y fuerza solo salida JSON
if (ob_get_level()) ob_end_clean();
header('Content-Type: application/json; charset=utf-8');
error_reporting(0); // Cambia a E_ALL para depurar
ini_set('display_errors', 0); // Cambia a 1 para depurar
require_once 'dbConfig.php';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$result = $conn->query('SELECT id, nombre, email, wsp, motivo, mensaje, fecha, leido FROM contacto ORDER BY fecha DESC');
$mensajes = [];
while ($row = $result->fetch_assoc()) {
    $mensajes[] = $row;
}

// Solo salida JSON, sin espacios ni saltos
echo json_encode($mensajes, JSON_UNESCAPED_UNICODE);
$conn->close();
exit;
?>
