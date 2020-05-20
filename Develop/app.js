const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function init() {
    inquirer.prompt({
        type: "list",
        name: "continue",
        choices: ["yes", "no"],
        message: "would you like to add a new employee?"
    })
        .then(answer => {
            switch (answer.continue) {
                case "yes":
                    continueQuestions();
                    break;
                case "no":
                    console.log("GoodBye");
                    var htmlContent = render(employeeList);
                    fs.writeFile('team.html', htmlContent, (error) => { if(error) console.log("Some huge error we really screwed up")})
                    break;
            }
    })

}
function continueQuestions() {
    inquirer.prompt({
        type: "list",
        name: "employeeType",
        choices: ["Intern", "Engineer", "Manager"],
        message: "What type of employee would you like to add?"
    })
        .then(answer => {
            switch (answer.employeeType) {
                case "Intern":
                    addIntern();

                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "Manager":
                    addManager();
                    break;
            }
        })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Name:"
        },
        {
            type: "input",
            name: "id",
            message: "ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Email:"
        },
        {
            type: "input",
            name: "school",
            message: "School:"
        }
    ])
        .then(answers => {
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employeeList.push(intern);
            console.log(employeeList)
            init();
        })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Name:"
        },
        {
            type: "input",
            name: "id",
            message: "ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Email:"
        },
        {
            type: "input",
            name: "github",
            message: "github:"
        }
    ])
        .then(answers => {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employeeList.push(engineer);
            init();
        })
}
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Name:"
        },
        {
            type: "input",
            name: "id",
            message: "ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "officeNumber:"
        }
    ])
        .then(answers => {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employeeList.push(manager);
            init();
        })
}

init();



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
