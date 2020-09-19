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
    let employeeDetails = await inquirer.prompt(questions.getQuestions(role));
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
                
        let employee = await askQuestions(empRole.role);

        switch (empRole.role) {
            case "Manager":
                questions.employeeList.push(new Manager(employee.empname, employee.empid,
                    employee.empemail, employee.officeid));
                break;
            case "Engineer":
                questions.employeeList.push(new Engineer(employee.empname, employee.empid,
                    employee.empemail, employee.github));
                break;
            case "Intern":
                questions.employeeList.push(new Intern(employee.empname, employee.empid,
                    employee.empemail, employee.school));
                break;
        }

        const keepAsking = await inquirer.prompt({
            type: "confirm",
            message: "Want to add more employees : ",
            name: "wantToContine"
        });
        contineAsking = keepAsking.wantToContine;        
    }

    fs.writeFileSync(path.join("output","team.html"),render(questions.employeeList));
}

init();
