const readline = require('readline');
const robot = require('./robot');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let robotState = {
  x: undefined,
  y: undefined,
  facing: undefined,
  isPlaced: false,
};

const debug = process.env.DEBUG;

console.debug = (...args) => {
  if (debug) {
    console.log(args);
  }
};

const input = () => {
  rl.question("\nWhat's your next move? ", (userInput) => {
    robotState = robot.commandLoop(robotState, userInput);
    input();
  });
};

input();
