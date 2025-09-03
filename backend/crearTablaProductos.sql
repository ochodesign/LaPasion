-- backend/crearTablaProductos.sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  `desc` TEXT,
  img VARCHAR(255),
  img2 VARCHAR(255)
);
