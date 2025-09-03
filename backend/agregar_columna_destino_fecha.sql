-- SQL para agregar columnas destino y fecha_creacion a la tabla productos/cards
ALTER TABLE productos
ADD COLUMN destino VARCHAR(20) DEFAULT 'catalogo',
ADD COLUMN fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Si la tabla se llama 'cards', reemplaza 'productos' por 'cards' en el comando.
