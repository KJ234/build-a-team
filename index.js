import inquirer from "inquirer";
import fs from 'fs'

import Manager from './lib/Manager.js'
import Engineer from './lib/Engineer.js'
import Apprentice from './lib/Apprentice.js'

import generatePage from './src/generatePage.js'

const employeeArr = [];

// adding questions
const questions = [
  {
    type: "list",
    name: "role",
    message: "Please indicate the role of the employee below.",
    choices: ["Manager", "Engineer", "Apprentice"],
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of the employee? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the name of this employee!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID number of the employee? (Required)",
    validate: (idInput) => {
      if (idInput) {
        return true;
      } else {
        console.log("Please enter the employees ID number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is the employees email? (Required)",
    validate: (emailInput) => {
      if (emailInput.includes("@")) {
        return true;
      } else {
        console.log("Please enter the employees email address!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter the office number of the manager.",
    when: (officeNumberInput) => officeNumberInput.role === "Manager",
    validate: (officeNumberInput) => {
      if (officeNumberInput) {
        return true;
      } else {
        console.log("Please enter the office number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "Please enter the GitHub username for the employee.",
    when: (githubInput) => githubInput.role === "Engineer",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter gitHub username!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "school",
    message: "Please enter the name of the apprentice's school.",
    when: (schoolInput) => schoolInput.role === "Apprentice",
    validate: (schoolInput) => {
      if (schoolInput) {
        return true;
      } else {
        console.log("Please enter the schools name!");
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmEmployee",
    message: "Would you like to enter another employee?",
    default: false,
  },
];

// Adding new employee
function promptEmployee() {
  return inquirer.prompt(questions).then((employeeData) => {
    let { role, name, id, email, github, school, officeNumber } = employeeData;
    let employee;
    if (role === "Manager") {
      employee = new Manager(name, id, email, officeNumber);
    }
    if (role === "Engineer") {
      employee = new Engineer(name, id, email, github);
    }
    if (role === "Apprentice") {
      employee = new Apprentice(name, id, email, school);
    }
    employeeArr.push(employee);

    if (employeeData.confirmEmployee) {
      return promptEmployee(employeeArr);
    } else {
      return employeeArr;
    }
  });
}
const writeFile = (fileContent) => {
  fs.writeFile("./dist/index.html", fileContent, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("File created!");
    }
  });
};

promptEmployee()
  .then((employeeArr) => {
    return generatePage(employeeArr);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
