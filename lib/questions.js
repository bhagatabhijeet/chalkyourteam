let lodash = require('lodash');
const chalk = require("chalk");

// Variable to store the employee objects
const employeeList = [];

//  An array of common questions.
// Role specific questions will be added in getQuestions function

//Note:- use of validate property for each input question
let basicQuestions = [
    {
        type: "input",
        name: "empname",
        message: `Employee's Name${chalk.red('*')} : `,
        // Use of employeeNameValidator
        validate: employeeNameValidator
    },
    {
        type: "input",
        name: "empid",
        message: `Employee's Employee Id(${chalk.red('*')}${chalk.yellow('Numeric')}) : `,
        // Use of employeeIdValidator
        validate: employeeIdValidator
    },
    {
        type: "input",
        name: "empemail",
        message: `Employee's Email(${chalk.red('*')}${chalk.yellow('Format examples - string@string.com|io|info|net')}) : `,
        // Use of emailValiator. The function uses Regexp object to check for format of email
        validate: emailValidator
    } 
];

// Function to validate entered name. The name cannot be blank
async function employeeNameValidator(input) {
    console.log();
    if (input.length === 0) {
        console.log(`${chalk.yellow("  Invalid Name")}${chalk.blue(" Name cannot be empty string.")}`);
        return false;
    }
    else {
        return true;
    }
}

// Function to validate entered email. The email needs to be in string@string.tld format
// The regexp used checks if the TLD is 2 to 4 characters long only e.g abc@input.io  abc@testing.info
async function emailValidator(input) {
    console.log();
    const pattern = new RegExp(/\w+@\w+\.\w{2,4}$/, "g");
    if (pattern.test(input)) {
        return true;
    }
    else {
        console.log(`${chalk.yellow("  Invalid Email Address!")}${chalk.blue(" An email address should be in xxx@yyy.zzz format.")}`);
        return false;
    }

}

// Function to validate Employee Id. The id needs to be numric and 
// Id cannot be duplicate
async function employeeIdValidator(input) {
    console.log();
    const pattern = new RegExp(/^[0-9]+$/, "g");
    if (pattern.test(input)) {
        if(iskDuplicateId(input)){
            return false;
        }
        else{
            return true;
        }
        
    }
    else {
        console.log(`${chalk.yellow("  Invalid Employeed Id!")}${chalk.blue(" Employee Id should be integer.")}`);
        return false;
    }

}

// Function to check if the entered Id is already assigned/Used for another employee
function iskDuplicateId(input){
    let duplicate = false;
    for(let i=0;i<employeeList.length;i++){
        if(employeeList[i].id === input.trim()){
            console.log(`${chalk.yellow("  Duplicate Employeed Id!")}${chalk.blue(` Id already assigned to [${employeeList[i].getRole()}] : ${employeeList[i].name}.`)}`);
            duplicate=true;
            break
        }
    }
    return duplicate;
}

// Function that retruns another Validate function which inturn validates if the input is blank
function blankFieldValidator(field) {
    return (input) => {
        console.log();
        if (input.length === 0) {
            console.log(`${chalk.yellow(`  Invalid ${field}!`)}${chalk.blue(` ${field} cannot be empty string.`)}`);
            return false;
        }
        else {
            return true;
        }

    }
}

// Function to return questions to main app
// The function also adds employee role specific questions and validates the answer using blankFieldValidator
function getQuestions(role) {
    role = role.toUpperCase();
    let qArray = lodash.cloneDeep(basicQuestions);

    // Switch statement to add Employee Role Specific questions like Office Id for Manager, Github for Engineer
    // and School for Intern
    switch (role) {
        case "MANAGER":
            qArray = qArray.map(emp => {
                let e = lodash.cloneDeep(emp);
                e.message = e.message.replace("Employee's", "Manager's");
                return e;
            });
            qArray
                .push({
                    type: "input",
                    name: "officeid",
                    message: `Manager's Office Id${chalk.red('*')} : `,
                    validate: blankFieldValidator("Manager's Office Id")
                });
            return qArray;
        case "ENGINEER":
            qArray = qArray.map(emp => {
                let e = lodash.cloneDeep(emp);
                e.message = e.message.replace("Employee's", "Engineer's");
                return e;
            });
            qArray
                .push({
                    type: "input",
                    name: "github",
                    message: `Engineer's GitHub Id${chalk.red('*')} : `,
                    validate: blankFieldValidator("Engineer's GitHub Id")
                });
            return qArray;
        case "INTERN":
            qArray = qArray.map(emp => {
                let e = lodash.cloneDeep(emp);
                e.message = e.message.replace("Employee's", "Intern's");
                return e;
            });

            qArray
                .push({
                    type: "input",
                    name: "school",
                    message: `Intern's School${chalk.red('*')} : `,
                    validate: blankFieldValidator("Intern's School")
                });
            return qArray;
        default:
            return [];
    }
}

module.exports = {getQuestions,employeeList};