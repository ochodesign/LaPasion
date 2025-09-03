
<?php
// Archivo: backend/dbConfig.php
// Configuración centralizada de la base de datos

$DB_HOST = 'localhost';
$DB_USER = 'u506439444_lapasion';
$DB_PASS = 'Magno10!';
$DB_NAME = 'u506439444_bd_lapasion';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
	header('Content-Type: application/json');
	echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos: ' . $conn->connect_error]);
	exit;
}
?>
