CREATE DATABASE beatBot_db;

USE songs;

CREATE TABLE songs(
    id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
    artist VARCHAR(225),
    title VARCHAR(225),
    year INTEGER(4),
    raw_total DECIMAL(10,2),
    raw_usa DECIMAL(10,2),
    
)