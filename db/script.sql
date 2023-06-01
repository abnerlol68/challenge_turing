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
    p_user     INT UNSIGNED  NOT NULL COMMENT 'Product user',
    CONSTRAINT pk_p_id PRIMARY KEY (p_id),
    CONSTRAINT fk_p_category FOREIGN KEY (p_category) REFERENCES categories (c_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_p_user FOREIGN KEY (p_user) REFERENCES users (u_id)
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
INSERT INTO users (u_type, u_name, u_lastname, u_email, u_password)
    VALUE ('U', 'Crys', 'Alvaro', 'crys@email.com', '123456');

INSERT INTO categories (c_name)
VALUES ('Electrónica'),
       ('Moda y Accesorios'),
       ('Hogar y Jardín'),
       ('Belleza y Cuidado Personal'),
       ('Libros, Música y Películas'),
       ('Juguetes y Juegos'),
       ('Automóviles y Motocicletas'),
       ('Arte y Manualidades');

# add/user
DROP PROCEDURE IF EXISTS `add_user`;
DELIMITER ;;
CREATE PROCEDURE `add_user`(
    IN type_u ENUM ('A', 'U'),
    IN name_u VARCHAR(45),
    IN lastname_u VARCHAR(45),
    IN email_u VARCHAR(45),
    IN password VARCHAR(80)
)
BEGIN
    INSERT INTO users (u_type, u_name, u_lastname, u_email, u_password)
        VALUE (type_u, name_u, lastname_u, email_u, password);
    SELECT u_id, u_type, u_name, u_lastname, u_email FROM users ORDER BY u_id DESC LIMIT 1;
END ;;
DELIMITER ;

# add/product
DROP PROCEDURE IF EXISTS `add_product`;
DELIMITER ;;
CREATE PROCEDURE `add_product`(
    IN name_p VARCHAR(45),
    IN price_p DECIMAL(9,2),
    IN category_p INT UNSIGNED,
    IN user_p INT UNSIGNED
)
BEGIN
    INSERT INTO products (p_name, p_price, p_category, p_user)
        VALUE (name_p, price_p, category_p, user_p);
    SELECT * FROM products ORDER BY p_id DESC LIMIT 1;
END ;;
DELIMITER ;

# add/product_img
DROP PROCEDURE IF EXISTS `add_product_img`;
DELIMITER ;;
CREATE PROCEDURE `add_product_img`(
    IN img_pi MEDIUMBLOB,
    IN product_pi INT UNSIGNED
)
BEGIN
    INSERT INTO products_imgs(pi_img, pi_product) VALUE (img_pi, product_pi);
    SELECT pi_img, pi_product FROM products_imgs ORDER BY pi_id DESC LIMIT 1;
END ;;
DELIMITER ;

# get/users/all
DROP PROCEDURE IF EXISTS `get_users_all`;
DELIMITER ;;
CREATE PROCEDURE `get_users_all`()
BEGIN
    SELECT u_id, u_type, u_name, u_lastname, u_email FROM users;
END ;;
DELIMITER ;

# get/users/regular
DROP PROCEDURE IF EXISTS `get_users_regular`;
DELIMITER ;;
CREATE PROCEDURE `get_users_regular`()
BEGIN
    SELECT u_id, u_type, u_name, u_lastname, u_email FROM users WHERE u_type = 'U';
END ;;
DELIMITER ;

# get/users/admin
DROP PROCEDURE IF EXISTS `get_users_admin`;
DELIMITER ;;
CREATE PROCEDURE `get_users_admin`()
BEGIN
    SELECT u_id, u_type, u_name, u_lastname, u_email FROM users WHERE u_type = 'A';
END ;;
DELIMITER ;

# get/users/admin
DROP PROCEDURE IF EXISTS `get_categories`;
DELIMITER ;;
CREATE PROCEDURE `get_categories`()
BEGIN
    SELECT * FROM categories;
END ;;
DELIMITER ;

# get/products
DROP PROCEDURE IF EXISTS `get_products`;
DELIMITER ;;
CREATE PROCEDURE `get_products`()
BEGIN
    SELECT * FROM products;
END ;;
DELIMITER ;

# get/products_img/
DROP PROCEDURE IF EXISTS `get_products_imgs`;
DELIMITER ;;
CREATE PROCEDURE `get_products_imgs`(
    IN product_id INT UNSIGNED
)
BEGIN
    SELECT * FROM products_imgs WHERE pi_product = product_id;
END ;;
DELIMITER ;

# validate/user
DROP PROCEDURE IF EXISTS `validate_user`;
DELIMITER ;;
CREATE PROCEDURE `validate_user`(
    IN email_u VARCHAR(45)
)
BEGIN
    SELECT * FROM users WHERE u_email = email_u;
END ;;
DELIMITER ;

DELETE FROM users WHERE u_id = 100;
