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

const teamArray = [];

//Function to ask question
function askQuestion(question) {
    console.log("Let's form your team. Please answer the following prompts.")
    return inquirer
        .prompt(question)
        .then(data => {
            createTeamMember(question, data);
            if (data.newMember == "Engineer") {
                return askQuestion(engQ);
            } else if (data.newMember == "Intern") {
                return askQuestion(intQ);
            }
        })
}

//Function to create team member and update teamArray
function createTeamMember(question, data) {
    let teamMember;
    if (question == mgrQ) {
        teamMember = new Manager(data.name, data.id, data.email, data.officeNum);
    }
    if (question == engQ) {
        teamMember = new Engineer(data.name, data.id, data.email, data.github);
    }
    if (question == intQ) {
        teamMember = new Intern(data.name, data.id, data.email, data.school);
    }
    if (teamMember) {
        teamArray.push(teamMember);
    }
}

// function to Write File
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
}

//Initialize with Manager Questions, then once all prompts are complete, write the teams.html with the output from render function
askQuestion(mgrQ).then(() => {
    console.log(teamArray);
    writeToFile(outputPath, render(teamArray))
});