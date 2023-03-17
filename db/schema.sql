DROP DATABASE IF EXISTS employee_manifest;

DROP TABLE IF EXISTS departments,
                     role_id,
                     employee;
CREATE DATABASE employee_manifest;

USE employee_manifest;

CREATE TABLE departments (
    id int not null auto_increment,
    name VARCHAR(30),
    primary key (id)
);

CREATE TABLE role_id (
    id int not null auto_increment,
    title      VARCHAR(30),
    salary      DECIMAL,
    department_id   INT,
    primary key (id)
);

CREATE TABLE employee (
    id int not null auto_increment,
    first_name      VARCHAR(30),
    last_name       VARCHAR(30),
    role_id         INT,
    manager_id      INT,
    primary key (id)
);


/*select id from departments where name = 'PUT NAME HERE';*/