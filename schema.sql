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

SELECT 'LOADING departments' as 'INFO';

INSERT INTO departments (name) VALUES 
('Marketing'), ('Sales'), ('Engineering');


INSERT INTO Managers (name) VALUES 
("boss", 10000000, 1),
("HEAD OF SALES", 1000000, 1),
("HEAD OF Marketing", 2000000, 2)
("HEAD ENGINEER", 4000000,3)

insert into role_id (title, salary, department_id) VALUES

("Manager Marketing", 1000000, 1),

("Manager Sales", 100000, 2),

("Workerbee Marketing", 10000, 1),

("Salesperson", 1000, 2),

("Engineering Manager", 100, 3),

("Engineer", 10, 3);


insert into employee (name, role_id, manager_id) VALUES
(bob, a, 1, 1)
(joe, b, 2, 1)



//*select id from departments where name = 'PUT NAME HERE';*//