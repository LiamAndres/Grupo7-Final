create database bd_grupo7;

use bd_grupo7;

CREATE TABLE `productos` (
   `id` INT AUTO_INCREMENT,
   `referencia` VARCHAR(255) NOT NULL,
   `fabricante` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(500),
   `precio` INT NOT NULL,
   `stock` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usuarios` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `contraseña` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categoriasProd` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `producto_categoriasProd` (
   `id` INT AUTO_INCREMENT,
   `productoId` INT,
   `categoriaId` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usuario_rol` (
   `id` INT AUTO_INCREMENT,
   `usuarioId` INT,
   `categoriaId` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `rol` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `detalle_compra` (
   `id` INT AUTO_INCREMENT,
   `ordenId` INT,
   `productoId` INT,
   `unidades` INT NOT NULL,
   `precio` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ordenes_compra` (
   `id` INT AUTO_INCREMENT,
   `usuarioId` INT,
   `total` INT NOT NULL,
   `fecha_compra` DATETIME NOT NULL,
   `direccion` VARCHAR(255) NOT NULL,
   `estadoOrdenId` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `estadoOrden` (
   `id` INT AUTO_INCREMENT,
   `estado` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   PRIMARY KEY (`id`)
);


ALTER TABLE `producto_categoriasProd` ADD CONSTRAINT `FK_3cb2cbb2-754c-4760-a605-d2a7c9aaf29e` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`)  ;

ALTER TABLE `producto_categoriasProd` ADD CONSTRAINT `FK_e52553df-c85c-45e1-bcd6-e88b5d410097` FOREIGN KEY (`categoriaId`) REFERENCES `categoriasProd`(`id`)  ;

ALTER TABLE `usuario_rol` ADD CONSTRAINT `FK_85b77442-f7bf-4a65-8b62-0e29717304bf` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `usuario_rol` ADD CONSTRAINT `FK_24ed2d7e-8da3-441b-8ef3-eb5290586e57` FOREIGN KEY (`categoriaId`) REFERENCES `rol`(`id`)  ;

ALTER TABLE `detalle_compra` ADD CONSTRAINT `FK_9ae39a35-df73-4cfc-b380-1298130522fa` FOREIGN KEY (`ordenId`) REFERENCES `ordenes_compra`(`id`)  ;

ALTER TABLE `detalle_compra` ADD CONSTRAINT `FK_d65af975-ce83-41aa-9f39-61dcb69b352b` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`)  ;

ALTER TABLE `ordenes_compra` ADD CONSTRAINT `FK_959797cc-a7b4-44cf-b5ca-a85574a8f115` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `ordenes_compra` ADD CONSTRAINT `FK_5595b86f-8601-4cfb-a146-181c9befdf85` FOREIGN KEY (`estadoOrdenId`) REFERENCES `estadoOrden`(`id`)  ;

