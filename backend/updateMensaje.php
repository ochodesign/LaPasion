<?php
// backend/updateMensaje.php
header('Content-Type: application/json');
require_once 'dbConfig.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;
$nombre = isset($data['nombre']) ? trim($data['nombre']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
wsp = isset($data['wsp']) ? trim($data['wsp']) : '';
motivo = isset($data['motivo']) ? trim($data['motivo']) : '';
$mensaje = isset($data['mensaje']) ? trim($data['mensaje']) : '';

if ($id <= 0 || !$nombre || !$email || !$wsp || !$motivo || !$mensaje) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión']);
    exit;
}

$stmt = $conn->prepare('UPDATE contacto SET nombre=?, email=?, wsp=?, motivo=?, mensaje=? WHERE id=?');
$stmt->bind_param('sssssi', $nombre, $email, $wsp, $motivo, $mensaje, $id);
$success = $stmt->execute();
$stmt->close();
$conn->close();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'No se pudo actualizar']);
}
?>
