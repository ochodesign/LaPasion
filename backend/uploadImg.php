<?php
// backend/uploadImg.php
header('Content-Type: application/json');
$targetDir = __DIR__ . '/uploads/';
if (!file_exists($targetDir)) {
    if (!mkdir($targetDir, 0775, true)) {
        echo json_encode(['success' => false, 'error' => 'No se pudo crear la carpeta uploads. Verifica permisos.']);
        exit;
    }
}
if (!empty($_FILES['file']['name'])) {
    $fileName = basename($_FILES['file']['name']);
    $fileName = uniqid() . '_' . preg_replace('/[^A-Za-z0-9_.-]/', '', $fileName);
    $targetFile = $targetDir . $fileName;
    $url = 'https://' . $_SERVER['HTTP_HOST'] . '/backend/uploads/' . $fileName;
    if (!is_writable($targetDir)) {
        echo json_encode(['success' => false, 'error' => 'La carpeta uploads no tiene permisos de escritura.']);
        exit;
    }
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo json_encode(['success' => true, 'url' => $url]);
    } else {
        $err = error_get_last();
        echo json_encode(['success' => false, 'error' => 'Error al subir archivo: ' . ($err['message'] ?? 'desconocido')]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No se recibió archivo']);
}
