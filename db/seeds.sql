SELECT 'LOADING departments' as 'INFO';

INSERT INTO departments (name) VALUES 
('Marketing'), ('Sales'), ('Engineering');

insert into role_id (title, salary, department_id) VALUES
("boss", 200000, 1),

("Manager Marketing", 1000000, 1),

("Manager Sales", 100000, 2),

("Workerbee Marketing", 10000, 1),

("Salesperson", 1000, 2),

("Engineering Manager", 100, 3),

("Engineer", 10, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Johnnie', 'Random', 1, 2), ('James', 'Smith', 1, null), ('Ronnie', 'Manning', 1, 2), ('Jimmy', 'Jones', 2, 2), ('Larry', 'Legal', 4, null);
