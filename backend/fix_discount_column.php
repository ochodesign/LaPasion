<?php
// Verificar la estructura de la tabla productos y actualizar la columna descuento si es necesario
require_once 'dbConfig.php';

// Verificar si la columna descuento existe y su tipo
$result = $conn->query("DESCRIBE productos descuento");
$row = $result->fetch_assoc();

echo "Estructura actual de la columna descuento: \n";
print_r($row);

// Si la columna no tiene el tipo correcto o permite NULL, actualizarla
if ($row && ($row['Type'] != 'varchar(10)' || $row['Null'] == 'YES')) {
    $sql = "ALTER TABLE productos MODIFY COLUMN descuento varchar(10) NOT NULL DEFAULT '0'";
    if ($conn->query($sql)) {
        echo "\nColumna descuento actualizada correctamente.";
    } else {
        echo "\nError al actualizar la columna: " . $conn->error;
    }
} else if (!$row) {
    // Si la columna no existe, crearla
    $sql = "ALTER TABLE productos ADD COLUMN descuento varchar(10) NOT NULL DEFAULT '0'";
    if ($conn->query($sql)) {
        echo "\nColumna descuento creada correctamente.";
    } else {
        echo "\nError al crear la columna: " . $conn->error;
    }
} else {
    echo "\nLa columna descuento ya está configurada correctamente.";
}

// Verificar si hay valores NULL y actualizarlos a 0
$sql = "UPDATE productos SET descuento = '0' WHERE descuento IS NULL";
if ($conn->query($sql)) {
    echo "\nValores NULL actualizados a 0.";
} else {
    echo "\nError al actualizar valores NULL: " . $conn->error;
}
?>
