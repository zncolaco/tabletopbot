const robot = require('./robot');

console.debug = () => {};

let robotState = { // eslint-disable-line no-unused-vars
  x: undefined, y: undefined, facing: undefined, isPlaced: false,
};

// Expect: "place the robot first"
robotState = robot.commandLoop(robotState, 'move');

// Robot is currently at: 1,2, facing north
robotState = robot.commandLoop(robotState, 'place 1,1,north');
robotState = robot.commandLoop(robotState, 'move');
robotState = robot.commandLoop(robotState, 'report');

// Action would result in robot being in an invalid state. Discarding action.
robotState = robot.commandLoop(robotState, 'move move');
robotState = robot.commandLoop(robotState, 'move');

// Robot is currently at: 2,4, facing east
robotState = robot.commandLoop(robotState, 'right');
robotState = robot.commandLoop(robotState, 'move');
robotState = robot.commandLoop(robotState, 'report');

// Action was not one of LEFT/RIGHT/PLACE/REPORT/MOVE
robotState = robot.commandLoop(robotState, 'blah blah');

// PLACE commands should be entered in the format PLACE X,Y,FACING
robotState = robot.commandLoop(robotState, 'place a,dadasda');

// Robot is currently at: 3,3, facing north
robotState = robot.commandLoop(robotState, 'place 2,2,north move right move left report');
