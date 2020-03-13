CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
	id INT AUTO_INCREMENT NOT NULL
    , bg_name VARCHAR(30) NOT NULL
    , eaten BOOLEAN DEFAULT false
    , PRIMARY KEY (id)
);


