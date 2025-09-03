<?php
// Permitir peticiones desde cualquier origen (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit(0);
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
// Archivo: backend/contacto.php

// Configuración de la base de datos centralizada
require_once 'dbConfig.php';

// Obtener datos del POST
$data = json_decode(file_get_contents('php://input'), true);
$nombre = $data['nombre'] ?? '';
$email = $data['email'] ?? '';
$wsp = $data['wsp'] ?? '';
$motivo = $data['motivo'] ?? '';
$mensaje = $data['mensaje'] ?? '';

if (!$nombre || !$email || !$wsp || !$motivo || !$mensaje) {
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

// Conexión a MySQL
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    echo json_encode(['error' => 'Error de conexión a la base de datos.']);
    exit;
}


$tz = 'America/Argentina/Buenos_Aires';
date_default_timezone_set($tz);
$fecha = date('Y-m-d H:i:s');
$stmt = $conn->prepare('INSERT INTO contacto (nombre, email, wsp, motivo, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->bind_param('ssssss', $nombre, $email, $wsp, $motivo, $mensaje, $fecha);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Error al guardar en la base de datos.', 'sql_error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
