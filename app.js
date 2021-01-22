const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");
// ref (./library/htmlRenderer.js line 26, 36, 46
// render.renderManager
// render.renderMain

function createEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email",
            },
            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])
        .then(function ({ name, id, email, role }) {
            switch (role) {
                // switch statement with breaks to hopefully stop code from infinitely running
                case "Manager":
                    inquirer
                        .prompt({
                            type: "input",
                            message: "What is your Office Number?",
                            name: "officeNumber"
                        }).then(function ({ officeNumber }) {
                            createManager = (name, id, email, officeNumber);
                            // threw back error. should const be made to render manager? **ref htmlRenderer.js**
                            console.log(createManager);
                            createNewEmployee();
                        })
                    break
                case "Engineer":
                    inquirer
                        .prompt({
                            type: "input",
                            message: "What is your Github username?",
                            name: "github",
                        }).then(function ({ github }) {
                            createEngineer(name, id, email, github);
                            createNewEmployee();
                        })
                    break
                case "Intern":
                    inquirer
                        .prompt({
                            type: "input",
                            message: "What school do you go to?",
                            name: "school"
                        }).then(function ({ school }) {
                            createIntern(name, id, email, school);
                            createNewEmployee();
                        })

            }
        })
}

createEmployee()

function createNewEmployee() {
    inquirer
    .prompt({
        type: "confirm",
        message: "Would you like to create a new Employee?",
        name: "newEmployee",
    }).then (function ({ newEmployee}) {
        if (newEmployee) {
            console.log("Let's create a new employee file");
            createEmployee();
        } else {
            console.log("Guess we're done here");
            renderMain
        }
        }
    )
}


// individual function to create Manager employee
// function createManager({ name, identification, email, role }) {
//     inquirer
//         .prompt({
//             type: "input",
//             message: "What is your office number?",
//             name: "officeNumber",
//         }).then(function ({ officeNumber }) {
//             createManager(name, identification, email, officeNumber)
//         })
// }
// // createManager();
// // individual function to create Engineer employee
// function createEngineer({ name, identification, email, role }) {
//     inquirer
//         .prompt({ 
//             type: "input",
//             message: "What is your Github username?",
//             name: "github",
//         }).then(function ({ github }) {
//             createEngineer(name, identification, email, github)
//         })
// }
// // createEngineer();
// // individual function to create Intern employee
// function createIntern({ name, identification, email, role }) {
//     inquirer
//         .prompt({
//             type: "input",
//             message: "What school do you atten?",
//             name: "school",
//         }).then(function ({ school }) {
//             createIntern(name, identification, email, school)
//         })

// createIntern();






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
