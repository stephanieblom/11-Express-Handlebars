DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
id INT NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(30) NULL,
devoured BOOLEAN DEFAULT false,
PRIMARY KEY(id)
);

-- INSERT INTO burgers (burger_name, devoured) values ('Cheese Burger', 0);
-- INSERT INTO burgers (burger_name, devoured) values ('Bacon Cheese Burger', 1);
