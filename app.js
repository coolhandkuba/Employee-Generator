const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const empRoster = [];

empSelector();

function empSelector() {
    inquirer
        .prompt(
            {
                type: `list`,
                name: `employeeSelect`,
                message: `Choose a new team member role to add.`,
                choices: [
                    `Manager`,
                    `Engineer`,
                    `Intern`
                ]
            }
        )
        .then(response => {
            switch (response.employeeSelect) {
                case `Manager`:
                    inquirerManger();
                    break;
                case `Engineer`:
                    inquirerEngineer();
                    break;
                case `Intern`:
                    inquirerIntern();
                    break;
            }
        });
}

function validateInput(input) {
    if (!input) {
        return false;
    } else {
        return true;
    }
}

const inquirerManger = () => {
    inquirer
        .prompt ([
            {
            type: `input`,
            name: `name`,
            message: `Input their first and last name:`,
            validate: validateInput
            },
            {
                type: `input`,
                name: `id`,
                message: `Input the 6 digit employee ID`,
                validate: validateInput
            },
            {
                type: `input`,
                name: `email`,
                message: `Add their work email address:`,
                validate: validateInput
            },
            {
                type: `number`,
                name: `officeNumber`,
                message: `What is their work phone number?`,
                validate: validateInput
            }
        ])
        .then(response => {
            const newManager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officeNumber
            );
            empRoster.push(newManager);
            console.log(`You have queued ${response.name} as a new Manager!`),
            continueQuery();
        });
};

const inquirerEngineer = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input their first and last name:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'id',
                message: 'Input the 6 digit employee ID:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'email',
                message: 'Add their work email address:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is their github username?',
                validate: validateInput
            }
        ])
        .then(response => {

            const newEngineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            );
            empRoster.push(newEngineer);
            console.log(`You have queued ${response.name} as a new Engineer!`);
            continueQuery();
        });
};

const inquirerIntern = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Input their first and last name:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'id',
                message: 'Input the 6 digit employee ID:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'email',
                message: 'Add their work email address:',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school are they from?',
                validate: validateInput
            }
        ])
        .then(response => {
            const newIntern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            );
            empRoster.push(newIntern);
            console.log(`You have queued ${response.name} as a new Intern!`);
            continueQuery();
        });
};

const continueQuery = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'nextSteps',
                message: 'Would you like to add someone new or save your current selection to finish?',
                choices: [
                    'Add another team member',
                    'Save & Exit'
                ]
            }
        )
        .then(response => {

            switch (response.nextSteps) {
                case 'Add another team member':
                    empSelector();
                    break;
                case 'Save & Exit':
                    for (let i = 0; i < empRoster.length; i++) {

                        console.log(`You have successfully added ${empRoster[i].name}.`);
                    }
                    generateHTML();
            }
        });
};

const generateHTML = () => {
    const outputHTML = render(empRoster);
    fs.writeFile(outputPath, outputHTML, (err) => {
        if (err) throw err;
    });
}

