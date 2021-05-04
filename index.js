const inquirer = require('inquirer');
const fs = require('fs');
const listedMembers = [];


const startApplication = async () => {

    const teamManager = await teamManagerInput();
    console.log(`This team's manager is ${teamManager.name}`);
    const teamMembers = await teamMembersInput();

    console.log(`This team's members are:`);
    listedMembers.forEach(member => console.log(`${member.role}: ${member.name}`));
    console.log(`Creating HTML...`);
    // const newHTML = `<html> <p>My name is ${ teamManager.managerName}</br> 
    // I am from ${ location }</br>
    // ${ bio }</br>
    // LinkedIn URL: <a href="https://${ linkedInURL }">Go to LinkedIn Page</a></br>
    // GitHub URL: <a href="https://github.com/${ githubUserName }">Go to GitHub Page</a> </html> `
    
    // fs.writeFile('index.html', newHTML, 'utf8', function (err) {
    // if (err) throw err;
    // console.log('Saved!');
//});
}
const teamMembersInput = async () => {
    let next = false;
    let addMember = {
        type: 'list',
        name: 'teamMember',
        message: 'Select a member to add to your team (Show your members with TEAM and Create your page with Done)',
        choices: ['INTERN', 'ENGINEER', 'TEAM', 'DONE'] 
    };

    do (await inquirer.prompt(addMember).then(async (response) => {
        switch (response.teamMember) {
            case 'INTERN':
                let intern = await addIntern();
                listedMembers.push(intern);
                console.log('Added member to team!');
                break;
            case 'ENGINEER':
                let engineer = await addEngineer();
                listedMembers.push(engineer);
                console.log('Added member to team!');
                break;
            case 'TEAM':
                console.log(listedMembers)
                break;
            case 'DONE':
                next = true;
                return;
            }
        return;
    }))
    while (next !== true);
    return listedMembers;

};

const addIntern = async () => {
    let intern = inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'What is this Intern\'s Name?'
        },
        {
            type: 'input',
            name: 'internID',
            message: 'What is this Intern\'s ID?'
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is this Intern\'s email address?'
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'What school does this Intern\'s attend?'
        },
    ])
    .then((response) => {
        let newIntern = {
            role: 'Intern',
            name: response.internName,
            id: response.internID,
            email: response.internEmail,
            school: response.internSchool
        };
        return newIntern;
    });
    return intern;
};
const addEngineer = async () => {
    let engineer = inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is this Engineer\'s Name?'
        },
        {
            type: 'input',
            name: 'engineerID',
            message: 'What is this Engineer\'s ID?'
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is this Engineer\'s email address?'
        },
        {
            type: 'input',
            name: 'engineerUsername',
            message: 'What is this Engineer\'s GitHub username?'
        },
    ])
    .then((response) => {
        let newEngineer = {
            role: 'Engineer',
            name: response.engineerName,
            id: response.engineerID,
            email: response.engineerEmail,
            github: response.engineerUsername
        };
        return newEngineer;
    });
    return engineer;
};
const teamManagerInput = async () => {
    const manager = inquirer.prompt([
        {
          type: 'input',
          message: 'What is this team manager\'s name?',
          name: 'managerName'
        },
        {
          type: 'input',
          message: 'What is this team manager\'s employee ID?',
          name: 'employeeID'
        },
        {
          type: 'input',
          message: 'What is this team manager\'s email address?',
          name: 'email'
        },
        {
          type: 'input',
          message: 'What is this team manager\'s office number?',
          name: 'officeNumber'
        },
    ]).then((response) => {
        let lead = {
            role: 'Team Manager',
            name: response.managerName,
            employeeID: response.employeeID,
            email: response.email,
            officeNumber: response.officeNumber
        };
        return(lead)
    });
    return manager;
}
startApplication();

