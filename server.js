//Tester
console.log("hello World");

//Start

// CONST's
const connection = require('./config/connect');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');
const validate = require('./Validate/Validate');
//AREA FOR HEADER o

//Prompt for user Choices
const promptuser = () => {
    inquirer.prompt([
        {
            name: 'Options',
            type: 'list',
            message: 'plese select an option',
            choice: [
                'View ALL Employees',
                'View ALL Roles',
                'View ALL Departments',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Remove Employee',
                'Remove Role',
                'Remove Departments',
                'BACK',
   // add back when working product (original)             'quit'
            ]
        }
    ])
    .then((answers) => {
        const {choices} = answers;

        if (choices === 'View ALL Employees') {
            viewAllEmployees();
        }
        if (choices === 'View ALL Departments') {
            viewAllDepartments();     
        }
        if (choices === 'View ALL Roles') {
            viewAllRoles();     
        }
        if (choices === 'Add Employee') {
            addEmployee();     
        }
        if (choices === 'Add Role') {
            addRole();     
        }
        if (choices === 'Add Department') {
            addDepartment();     
        }
        if (choices === 'Remove Employee') {
            removeEmployee();     
        }
        if (choices === 'Remove Role') {
            removeRole();     
        }
        if (choices === 'Remove Department') {
            removeDepartment();     
        }
        if (choices === 'Exit') {
            connection.end();     
        }
    });














    // View All Employees
    const viewAllEmployees = () => {
        let sql =       `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.department_name AS 'department', 
                        role.salary
                        FROM employee, role, department 
                        WHERE department.id = role.department_id 
                        AND role.id = employee.role_id
                        ORDER BY employee.id ASC`;
        connection.promise().query(sql, (error, response) => {
          if (error) throw error;
          console.log(chalk.yellow.bold(`====================================================================================`));
          console.log(`                              ` + chalk.green.bold(`Current Employees:`));
          console.log(chalk.yellow.bold(`====================================================================================`));
          console.table(response);
          console.log(chalk.yellow.bold(`====================================================================================`));
          promptUser();
        });
      };
      
      // View all Roles
      const viewAllRoles = () => {
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        const sql =     `SELECT role.id, role.title, department.department_name AS department
                        FROM role
                        INNER JOIN department ON role.department_id = department.id`;
        connection.promise().query(sql, (error, response) => {
          if (error) throw error;
            response.forEach((role) => {console.log(role.title);});
            console.log(chalk.yellow.bold(`====================================================================================`));
            promptUser();
        });
      };
      
      // View all Departments
      const viewAllDepartments = () => {
        const sql =   `SELECT department.id AS id, department.department_name AS department FROM department`; 
        connection.promise().query(sql, (error, response) => {
          if (error) throw error;
          console.log(chalk.yellow.bold(`====================================================================================`));
          console.log(`                              ` + chalk.green.bold(`All Departments:`));
          console.log(chalk.yellow.bold(`====================================================================================`));
          console.table(response);
          console.log(chalk.yellow.bold(`====================================================================================`));
          promptUser();
        });
      };
}

// Add a New Employee
const addEmployee = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'fistName',
        message: "What is the employee's first name?",
        validate: addFirstName => {
          if (addFirstName) {
              return true;
          } else {
              console.log('Please enter a first name');
              return false;
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        validate: addLastName => {
          if (addLastName) {
              return true;
          } else {
              console.log('Please enter a last name');
              return false;
          }
        }
      }
    ])
      .then(answer => {
      const crit = [answer.fistName, answer.lastName]
      const roleSql = `SELECT role.id, role.title FROM role`;
      connection.promise().query(roleSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql =  `SELECT * FROM employee`;
                connection.promise().query(managerSql, (error, data) => {
                  if (error) throw error;
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
                      console.log("Employee has been added!")
                      viewAllEmployees();
                });
              });
            });
          });
       });
    });
  };
  
  // Add a New Role
  const addRole = () => {
    const sql = 'SELECT * FROM department'
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
          .prompt([
            {
              name: 'departmentName',
              type: 'list',
              message: 'Which department is this new role in?',
              choices: deptNamesArray
            }
          ])
          .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment();
            } else {
              addRoleResume(answer);
            }
          });
  
        const addRoleResume = (departmentData) => {
          inquirer
            .prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
                validate: validate.validateString
              },
              {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
                validate: validate.validateSalary
              }
            ])
            .then((answer) => {
              let createdRole = answer.newRole;
              let departmentId;
  
              response.forEach((department) => {
                if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
              });
  
              let sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
              let crit = [createdRole, answer.salary, departmentId];
  
              connection.promise().query(sql, crit, (error) => {
                if (error) throw error;
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Role successfully created!`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                viewAllRoles();
              });
            });
        };
      });
    };


    // Add a New Department
const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: 'newDepartment',
          type: 'input',
          message: 'What is the name of your new Department?',
          validate: validate.validateString
        }
      ])
      .then((answer) => {
        let sql =     `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
          if (error) throw error;
          console.log(``);
          console.log(chalk.greenBright(answer.newDepartment + ` Department successfully created!`));
          console.log(``);
          viewAllDepartments();
        });
      });
};


// Delete an Employee
const removeEmployee = () => {
    let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee would you like to remove?',
            choices: employeeNamesArray
          }
        ])
        .then((answer) => {
          let employeeId;

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let sql = `DELETE FROM employee WHERE employee.id = ?`;
          connection.query(sql, [employeeId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Employee Successfully Removed`));
            console.log(chalk.RedBright.bold(`====================================================================================`));
            viewAllEmployees();
          });
        });
    });
  };

// Delete a Role
const removeRole = () => {
    let sql = `SELECT role.id, role.title FROM role`;

    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let roleNamesArray = [];
      response.forEach((role) => {roleNamesArray.push(role.title);});

      inquirer
        .prompt([
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: roleNamesArray
          }
        ])
        .then((answer) => {
          let roleId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              roleId = role.id;
            }
          });

          let sql =   `DELETE FROM role WHERE role.id = ?`;
          connection.promise().query(sql, [roleId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.greenBright(`Role Successfully Removed`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            viewAllRoles();
          });
        });
    });
  };

// Delete a Department
const removeDepartment = () => {
    let sql =   `SELECT department.id, department.department_name FROM department`;
    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      let departmentNamesArray = [];
      response.forEach((department) => {departmentNamesArray.push(department.department_name);});

      inquirer
        .prompt([
          {
            name: 'chosenDept',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: departmentNamesArray
          }
        ])
        .then((answer) => {
          let departmentId;

          response.forEach((department) => {
            if (answer.chosenDept === department.department_name) {
              departmentId = department.id;
            }
          });

          let sql =     `DELETE FROM department WHERE department.id = ?`;
          connection.promise().query(sql, [departmentId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Department Successfully Removed`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            viewAllDepartments();
          });
        });
    });
};