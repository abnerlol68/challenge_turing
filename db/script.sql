DROP DATABASE IF EXISTS turing;
CREATE DATABASE IF NOT EXISTS turing;

USE turing;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    u_id       INT UNSIGNED    NOT NULL AUTO_INCREMENT COMMENT 'User id',
    u_type     ENUM ('A', 'U') NOT NULL DEFAULT 'U' COMMENT 'Type of user: A = Admin, U = Regular user',
    u_name     VARCHAR(45)     NOT NULL COMMENT 'User name',
    u_lastname VARCHAR(45)     NOT NULL COMMENT 'User lastname',
    u_email    VARCHAR(45)     NOT NULL COMMENT 'User email',
    u_password VARCHAR(80)     NOT NULL COMMENT 'User password',
    CONSTRAINT unq_u_email UNIQUE (u_email),
    CONSTRAINT pk_u_id PRIMARY KEY (u_id)
) AUTO_INCREMENT = 100
  ENGINE = InnoDB
    COMMENT 'Users Table';

DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories
(
    c_id   INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Category id',
    c_name VARCHAR(45)  NOT NULL COMMENT 'Category name',
    CONSTRAINT pk_c_id PRIMARY KEY (c_id)
) AUTO_INCREMENT = 100
  ENGINE = InnoDB COMMENT 'Categories table';

DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products
(
    p_id       INT UNSIGNED  NOT NULL AUTO_INCREMENT COMMENT 'Product id',
    p_name     VARCHAR(45)   NOT NULL COMMENT 'Product name',
    p_price    DECIMAL(9, 2) NOT NULL COMMENT 'Product price',
    p_category INT UNSIGNED  NOT NULL COMMENT 'Product category',
    CONSTRAINT pk_p_id PRIMARY KEY (p_id),
    CONSTRAINT fk_p_c_category FOREIGN KEY (p_category) REFERENCES categories (c_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) AUTO_INCREMENT = 100
  ENGINE = InnoDB COMMENT 'Products table';

DROP TABLE IF EXISTS products_imgs;
CREATE TABLE IF NOT EXISTS products_imgs
(
    pi_id      INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Product Image id',
    pi_img     MEDIUMBLOB COMMENT 'Product Image - Image',
    pi_product INT UNSIGNED NOT NULL COMMENT 'Product Image - Product',
    CONSTRAINT pk_pi_id PRIMARY KEY (pi_id),
    CONSTRAINT fk_pi_p_product FOREIGN KEY (pi_product) REFERENCES products (p_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) AUTO_INCREMENT = 100
  ENGINE = InnoDB COMMENT 'Product Images';

### Insets ###
INSERT INTO users (u_type, u_name, u_lastname, u_email, u_password)
    VALUE ('A', 'Abner', 'Perez', 'abner@email.com', '123456');

INSERT INTO categories (c_name)
VALUES ('Electrónica'),
       ('Moda y Accesorios'),
       ('Hogar y Jardín'),
       ('Belleza y Cuidado Personal'),
       ('Libros, Música y Películas'),
       ('Juguetes y Juegos'),
       ('Automóviles y Motocicletas'),
       ('Arte y Manualidades');

SELECT u_id, u_type, u_name, u_lastname, u_email FROM users;

SELECT * FROM categories;
