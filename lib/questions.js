let lodash = require('lodash');

let basicQuestions = [
    {
        type: "input",
        name: "empname",
        message: "Employee's Name : "
    },
    {
        type: "input",
        name: "empid",
        message: "Employee's Employee Id : "
    },
    {
        type: "input",
        name: "empemail",
        message: "Employee's Email : "
    }
];

function getQuestions(role) {
    role = role.toUpperCase();
    let qArray = lodash.cloneDeep(basicQuestions);
    
    switch (role) {
        case "MANAGER":
            qArray = qArray.map(emp => {
                let e =lodash.cloneDeep(emp);
                e.message= e.message.replace("Employee's","Manager's");
                return e;
            });                
            qArray
            .push({
                type: "input",
                name: "officeid",
                message: "Manager's Office Id : "
            });
            return qArray;
        case "ENGINEER":
            qArray = qArray.map(emp => {
                let e =lodash.cloneDeep(emp);
                e.message= e.message.replace("Employee's","Engineer's");
                return e;
            });            
            qArray
            .push({
                type: "input",
                name: "github",
                message: "Engineer's GitHub Id : "
            });
            return qArray;
        case "INTERN":
            qArray = qArray.map(emp => {
                let e =lodash.cloneDeep(emp);
                e.message= e.message.replace("Employee's","Intern's");
                return e;
            });
            
            qArray
            .push({
                type: "input",
                name: "school",
                message: "Intern's School : "
            });
            return qArray;
        default:
            return [];
    }
}

module.exports = getQuestions;