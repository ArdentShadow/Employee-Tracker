//Tester
console.log("hello World");

//Start

// CONST's
const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');
const validate = require('./javascript/validate');
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
        if (choices === 'View ALL Roles') {
            viewAllEmployees();    
        }
        if (choices === 'View ALL Departments') {
            viewAllEmployees();
        }
        if (choices === 'Add Employee') {
            viewAllEmployees();
        }
        if (choices === 'Add Role') {
            viewAllEmployees();
        }
        if (choices === 'Add Department') {
            viewAllEmployees();
        }
        if (choices === 'Remove Employee') {
            viewAllEmployees();
        }
        if (choices === 'Remove Role') {
            viewAllEmployees();
        }
        if (choices === 'Remove Departments') {
            viewAllEmployees();
        }
        if (choices === 'BACK') {
            viewAllEmployees();
        }
    });

    // View All Employees
}
