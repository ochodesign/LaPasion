
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include 'dbConfig.php';
header('Content-Type: application/json');

function getCount($conn, $start, $end) {
    $sql = "SELECT COUNT(*) as total FROM visitas WHERE fecha BETWEEN ? AND ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $start, $end);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $result['total'];
}

$hoy = date('Y-m-d');
$inicioSemana = date('Y-m-d', strtotime('monday this week'));
$inicioMes = date('Y-m-01');
$fin = date('Y-m-d 23:59:59');


if (isset($_GET['detalle']) && $_GET['detalle'] == '1') {
    $sql = "SELECT id, fecha, ip FROM visitas ORDER BY fecha DESC";
    $result = $conn->query($sql);
    $visitas = [];
    while ($row = $result->fetch_assoc()) {
        $visitas[] = $row;
    }
    $data = [
        "visitas" => $visitas
    ];
    $conn->close();
    echo json_encode($data);
    exit;
}


$sqlTotal = "SELECT COUNT(*) as total FROM visitas";
$resultTotal = $conn->query($sqlTotal);
$rowTotal = $resultTotal->fetch_assoc();
$totalHistorico = $rowTotal['total'];

$data = [
    "hoy" => getCount($conn, "$hoy 00:00:00", "$hoy 23:59:59"),
    "semana" => getCount($conn, "$inicioSemana 00:00:00", "$fin"),
    "mes" => getCount($conn, "$inicioMes 00:00:00", "$fin"),
    "total" => $totalHistorico
];

$conn->close();
echo json_encode($data);
?>
