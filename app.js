const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");

let employees = []


function createEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name",
            },
            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]

            },
            {
                type: "input",
                message: "What is your email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your Office Number?",
                name: "officeNumber",
                when: (answer) => answer.role === "Manager",
            },
            {
                type: "input",
                message: "What is your Github username?",
                name: "github",
                when: (answer) => answer.role === "Engineer",
            },
            {
                type: "input",
                message: "What school do you go to?",
                name: "school",
                when: (answer) => answer.role === "Intern",
            }
        ]).then((data) => {
            if (data.role == "Manager") {
                const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
                employees.push(manager);
            }
            else if (data.role == "Engineer") {
                const engineer = new Engineer(data.name, data.id, data.email, data.github)
                employees.push(engineer);
            } 
            else if (data.role == "Intern") {
                const intern = new Intern(data.name, data.id, data.email, data.school)
                employees.push(intern);
            }
            console.log(employees)
            createNewEmployee();

        })
}
createEmployee();

function createNewEmployee() {
    inquirer
        .prompt({
            type: "confirm",
            message: "Would you like to create a new Employee?",
            name: "newEmployee",
        }).then(function ({ newEmployee }) {
            if (newEmployee) {
                console.log("Let's create a new employee file");
                createEmployee();
            } else {
                console.log("Guess we're done here");
                fs.writeFileSync(outputPath, render(employees), "utf-8");
            }
        }
        )
}
