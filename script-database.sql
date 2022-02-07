CREATE DATABASE db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c db;

CREATE TABLE users (
    user_id serial NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email_address varchar(80) NOT NULL,
    password_user varchar(200) NOT NULL,
    description varchar(200) NOT NULL,
    nb_like serial NOT NULL,
    signal serial NOT NULL,
    role varchar(80) NOT NULL,
    constraint pk_user PRIMARY KEY (user_id)
);


INSERT INTO users VALUES (1000, 'pierre', 'perrin', 'pierre.perrin@gmail.com', 'test','',0,0,'USER');
INSERT INTO users VALUES (1001, 'vincent', 'pradier', 'vincent.pradier@gmail.com', 'test','',0,0,'USER');
INSERT INTO users VALUES (1002, 'benjamin', 'corbeau', 'benjamin.corbeau@gmail.com', 'test','',0,0,'MODERATOR');
INSERT INTO users VALUES (1003, 'thomas', 'rimondi', 'thomas.rimondi@gmail.com', 'test','',0,0,'MODERATOR');
INSERT INTO users VALUES (1004, 'florian', 'schneider', 'florian.schneider@gmail.com', 'test','',0,0,'ADMIN');
INSERT INTO users VALUES (1005, 'julien', 'wiegandt', 'julien.wiegandt@gmail.com', 'test','',0,0,'ADMIN');

INSERT INTO users VALUES (1006, 'user', 'user', 'user@gmail.com', '$2b$10$Dyb7CxkHRBb2DeqrtCPaQ.Ko0lv2IOa91SjpwepH9vSY2FTnm3p5u','',0,0,'USER');
INSERT INTO users VALUES (1007, 'moderator', 'moderator', 'moderator@gmail.com', '$2b$10$Dyb7CxkHRBb2DeqrtCPaQ.Ko0lv2IOa91SjpwepH9vSY2FTnm3p5u','',0,0,'MODERATOR');
INSERT INTO users VALUES (1008, 'admin', 'admin', 'admin@gmail.com', '$2b$10$Dyb7CxkHRBb2DeqrtCPaQ.Ko0lv2IOa91SjpwepH9vSY2FTnm3p5u','',0,0,'ADMIN');
