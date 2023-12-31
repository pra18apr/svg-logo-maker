const inquirer = require("inquirer");
const fs = require("fs");
const {Triangle} = require("./Images/shape");
const {Square} = require("./Images/shape");
const {Circle} = require("./Images/shape");
const Svg = require("./Images/svg")

const questions = [{
    type: 'input',
    message: 'What text do you want in your logo?(up to 3 characters)',
    name: 'text',
    validate: function(input) {
        if (input.length > 3) {
          return "Please enter no more than 3 characters.";
        }
        return true;
      }
  },
  {
    type: 'input',
    message: 'what color do you want that text to be?',
    name: 'textColor',
  },
  {
    type: 'input',
    message: 'what color do you want the shape to be?',
    name: 'shapeColor',
  },
  {
    type: 'list',
    message: 'Please pick a shape?',
    name: 'shape',
    choices: ["triangle", "circle", "square"]
  }

];

function writeToFile(fileName, data) {
return fs.writeFileSync(fileName, data)
}


function init() {
  inquirer.prompt(questions).then(response => {
    console.log("Checkout your new logo in the examples folder and select the test.svg file!")
    let shape 
    if (response.shape === "triangle") {
        shape = new Triangle()
    } else if (response.shape === "square"){
        shape = new Square()
    } else {
        shape = new Circle()
    }
    shape.setColor(response.shapeColor)
    let svgInstance = new Svg ()
    svgInstance.setText(response.text, response.textColor)
    svgInstance.setShape(shape)
    writeToFile("test.svg", svgInstance.render())
  })

}

// Function call to initialize app
init();