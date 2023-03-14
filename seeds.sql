SELECT 'LOADING departments' as 'INFO';

INSERT INTO departments (name) VALUES 
('Marketing'), ('Sales'), ('Engineering');


INSERT INTO Managers (name) VALUES 
("boss", 10000000, 1),
("HEAD OF SALES", 1000000, 1),
("HEAD OF Marketing", 2000000, 2),
("HEAD Engineer", 4000000,3);

insert into role_id (title, salary, department_id) VALUES

("Manager Marketing", 1000000, 1),

("Manager Sales", 100000, 2),

("Workerbee Marketing", 10000, 1),

("Salesperson", 1000, 2),

("Engineering Manager", 100, 3),

("Engineer", 10, 3);