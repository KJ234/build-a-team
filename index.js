const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const generatePage = require("./src/generatePage");

const questions = [
  {
    type: "list",
    name: "role",
    message: "Please indicate the role of the employee below.",
    choices: ["Manager", "Engineer", "Intern"],
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
    message: "Please enter the name of the interns school.",
    when: (schoolInput) => schoolInput.role === "Intern",
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
