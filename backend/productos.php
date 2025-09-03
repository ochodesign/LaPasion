
<?php
// Habilitar CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// backend/productos.php
header('Content-Type: application/json');
require_once 'dbConfig.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Listar productos
    $sql = "SELECT * FROM productos ORDER BY id DESC";
    $result = $conn->query($sql);
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    echo json_encode($productos);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('Error al decodificar JSON: ' . json_last_error_msg() . ' | Recibido: ' . $raw);
        echo json_encode(['success' => false, 'error' => 'Error al decodificar JSON: ' . json_last_error_msg(), 'raw' => $raw]);
        exit;
    }
    // Eliminar producto por POST si action = 'delete'
    if (isset($data['action']) && $data['action'] === 'delete' && isset($data['id'])) {
        $id = intval($data['id']);
        $sql = "DELETE FROM productos WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
        exit;
    }
    // Alta y edición normales
    if (!$data || !isset($data['title']) || !isset($data['price']) || !isset($data['desc'])) {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos recibidos', 'raw' => $raw]);
        exit;
    }
    $title = $conn->real_escape_string($data['title']);
    $price = $conn->real_escape_string($data['price']);
    $desc = $conn->real_escape_string($data['desc']);
    // Si es edición y no se envía img/img2, usar el valor actual
    if (isset($data['action']) && $data['action'] === 'update' && isset($data['id'])) {
        $id = intval($data['id']);
        $img = isset($data['img']) ? $conn->real_escape_string($data['img']) : '';
        $img2 = isset($data['img2']) ? $conn->real_escape_string($data['img2']) : '';
        if ($img === '' || $img2 === '') {
            $sqlGet = "SELECT img, img2 FROM productos WHERE id=$id";
            $resGet = $conn->query($sqlGet);
            if ($resGet && $rowGet = $resGet->fetch_assoc()) {
                if ($img === '') $img = $conn->real_escape_string($rowGet['img']);
                if ($img2 === '') $img2 = $conn->real_escape_string($rowGet['img2']);
            }
        }
    } else {
        $img = isset($data['img']) ? $conn->real_escape_string($data['img']) : '';
        $img2 = isset($data['img2']) ? $conn->real_escape_string($data['img2']) : '';
    }
    $categoria = isset($data['categoria']) ? $conn->real_escape_string($data['categoria']) : '';
    $genero = isset($data['genero']) ? $conn->real_escape_string($data['genero']) : '';
    $tipo = isset($data['tipo']) ? $conn->real_escape_string($data['tipo']) : 'Genérico';
    // Manejar descuento - Asegurarnos de que no sea un valor vacío o nulo
    $descuento = isset($data['descuento']) && $data['descuento'] !== '' && $data['descuento'] !== null ? $conn->real_escape_string($data['descuento']) : '0';
    // Convertir a entero para asegurarnos de que es un valor numérico
    $descuento = is_numeric($descuento) ? $descuento : '0';
    // Log para depuración
    error_log("Descuento recibido y procesado: " . $descuento . ", tipo: " . gettype($descuento));
    $talles = isset($data['talles']) ? $conn->real_escape_string(is_array($data['talles']) ? implode(',', $data['talles']) : $data['talles']) : null;
    $destino = isset($data['destino']) ? $conn->real_escape_string(is_array($data['destino']) ? implode(',', $data['destino']) : $data['destino']) : 'catalogo';
    if (($categoria !== 'Piluso' && $categoria !== 'Gorra') && ($talles === null || $talles === '')) {
        echo json_encode(['success' => false, 'error' => 'Debes seleccionar al menos un talle']);
        exit;
    }
    // Si es edición
    if (isset($data['action']) && $data['action'] === 'update' && isset($data['id'])) {
        $id = intval($data['id']);
        // Debug log para ver valores antes de la consulta
        error_log("Ejecutando UPDATE con descuento: $descuento");
        $sql = "UPDATE productos SET title='$title', price='$price', `desc`='$desc', img='$img', img2='$img2', categoria='$categoria', genero='$genero', tipo='$tipo', talles='$talles', destino='$destino', descuento='$descuento' WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'id' => $id]);
        } else {
            error_log('Error SQL UPDATE: ' . $sql . ' | MySQL: ' . $conn->error);
            echo json_encode(['success' => false, 'error' => $conn->error, 'sql' => $sql]);
        }
        exit;
    }
    // Si es alta
    // Debug log para ver valores antes de la consulta
    error_log("Ejecutando INSERT con descuento: $descuento");
    $sql = "INSERT INTO productos (title, price, `desc`, img, img2, categoria, genero, tipo, talles, destino, descuento, fecha_creacion) VALUES ('$title', '$price', '$desc', '$img', '$img2', '$categoria', '$genero', '$tipo', '$talles', '$destino', '$descuento', NOW())";
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        // Log de error detallado
        error_log('Error SQL: ' . $sql . ' | MySQL: ' . $conn->error);
        echo json_encode(['success' => false, 'error' => $conn->error, 'sql' => $sql]);
    }
    exit;
}

if ($method === 'DELETE') {
    // Eliminar producto
    // Permitir id por query string o por body
    $id = 0;
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
    } else {
        parse_str(file_get_contents('php://input'), $_DELETE);
        $id = intval($_DELETE['id'] ?? 0);
    }
    if ($id) {
        $sql = "DELETE FROM productos WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'ID inválido']);
    }
    exit;
}

if (!headers_sent()) {
    header('Content-Type: application/json');
}
echo json_encode(['success' => false, 'error' => 'Método no soportado o error desconocido en el servidor']);
