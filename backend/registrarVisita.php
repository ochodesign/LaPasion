
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include 'dbConfig.php';
$tz = 'America/Argentina/Buenos_Aires';
date_default_timezone_set($tz);
$date = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];
$sql = "INSERT INTO visitas (fecha, ip) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $date, $ip);
$stmt->execute();
$stmt->close();
$conn->close();
echo json_encode(["success" => true]);
?>
