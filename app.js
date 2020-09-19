const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const inquirer = require("inquirer");
const boxen = require("boxen");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeList = [];

console.log(
    boxen(`
                                ${chalk.blue(chalk.bold(`Welcome to ${chalk.underline('Chalk Your Team')}`))}
    
    Chalk Your Team is a Team Profile Generator. It will Generate Your Team's Profile HTML so that you can visually
    see your team members' profile.
    
    ${chalk.cyanBright(chalk.bold("Developer: Abhijeet Bhagat"))}
    ${chalk.cyanBright("GitHub: https://github.com/bhagatabhijeet/chalkyourteam")}
    ${chalk.yellowBright('v1.0')}
    `, 
    { 
    padding: 1 ,
    borderColor:'magentaBright',
    borderStyle:'round',
    float:'center',  
    
}));


// inquirer to gather information about the development team members,
async function askQuestions(role) {
    let employeeDetails = await inquirer.prompt(questions(role));
    return employeeDetails;
}

// Main 
async function init() {
    let contineAsking = true;
    while (contineAsking) {
        let empRole = await inquirer.prompt([
            {
                type: "list",
                message: "Select Role : ",
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ]);
        // console.log(empRole.role);
        
        let employee = await askQuestions(empRole.role);

        switch (empRole.role) {
            case "Manager":
                employeeList.push(new Manager(employee.empname, employee.empid,
                    employee.empemail, employee.officeid));
                break;
            case "Engineer":
                employeeList.push(new Engineer(employee.empname, employee.empid,
                    employee.empemail, employee.github));
                break;
            case "Intern":
                employeeList.push(new Intern(employee.empname, employee.empid,
                    employee.empemail, employee.school));
                break;
        }

        const keepAsking = await inquirer.prompt({
            type: "confirm",
            message: "Want to add more employees : ",
            name: "wantToContine"
        });
        contineAsking = keepAsking.wantToContine;
        // console.log("user wants to continue : " + contineAsking);
    }
    employeeList.forEach(e=>console.log(e.getRole()));
    // console.log(render(employeeList));
    fs.writeFileSync(path.join("output","team.html"),render(employeeList));
}

init();
// console.log(questions("Engineer"));
// console.log(questions("Intern"));
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
