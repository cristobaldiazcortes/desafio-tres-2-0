psql -h localhost -p 5432 -U postgres -d postgres
CREATE DATABASE likeme;

\c likeme;

CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR (1000), descripcion VARCHAR(255), likes INT);

psql -h localhost -p 5432 -U postgres -d postgres