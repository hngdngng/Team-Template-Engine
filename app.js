const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mgrQ = JSON.parse(fs.readFileSync("./lib/questions-manager.json")); 
const engQ = JSON.parse(fs.readFileSync("./lib/questions-engineer.json")); 
const intQ = JSON.parse(fs.readFileSync("./lib/questions-intern.json")); 

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let teamArray = new Array;

function initMgr() {
    console.log("Let's form your team. Please answer the following prompts.")
    inquirer
        .prompt(mgrQ)
        .then(data => {
            const mgr = new Manager(data.name, data.id, data.email, data.officeNum);
            teamArray.push(mgr);
            if (data.newMember == "Engineer") {
                initEng();
            } else if (data.newMember == "Intern") {
                initInt();
            } else return;
        })
}

function initEng() {
    inquirer
        .prompt(engQ)
        .then(data => {
            const eng = new Engineer(data.name, data.id, data.email, data.github);
            teamArray.push(eng);
            console.log(teamArray);
            if (data.newMember == "Engineer") {
                initEng();
            } else if (data.newMember == "Intern") {
                initInt();
            } else return;
        })
}

function initInt() {
    inquirer
        .prompt(intQ)
        .then(data => {
            const int = new Intern(data.name, data.id, data.email, data.school);
            teamArray.push(int);
            if (data.newMember == "Engineer") {
                initEng();
            } else if (data.newMember == "Intern") {
                initInt();
            } else return;
        })
}

initMgr();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
