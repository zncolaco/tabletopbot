const robot = require('./robot.js');
const BiMap = require('bimap');

const Actions = {
    PLACE: "place",
    MOVE: "move",   
    LEFT: "left",
    RIGHT: "right",
    REPORT: "report"
}

const Facing = {
    NORTH: "north",
    EAST: "east",
    SOUTH: "south",
    WEST: "west",
}

const directionMultiplier = new Map()
directionMultiplier.set(Facing.NORTH, {x: 0, y: 1});
directionMultiplier.set(Facing.SOUTH, {x: 0, y: -1});
directionMultiplier.set(Facing.EAST, {x: 1, y: 0});
directionMultiplier.set(Facing.WEST, {x: -1, y: 0});

Object.freeze(Facing);
Object.freeze(Actions);

const adjacentDirections = new BiMap;
adjacentDirections.push(Facing.WEST, Facing.NORTH);
adjacentDirections.push(Facing.NORTH, Facing.EAST);
adjacentDirections.push(Facing.EAST, Facing.SOUTH);
adjacentDirections.push(Facing.SOUTH, Facing.WEST);

processCommand = (state, command) => { 
    let proposedState = state;
    switch (command.action) {
        case Actions.MOVE:
            proposedState.x += directionMultiplier.get(state.facing).x;
            proposedState.y += directionMultiplier.get(state.facing).y;
            break;
        case Actions.LEFT:
            proposedState.facing = adjacentDirections.val(state.facing);
            break;
        case Actions.RIGHT:
            proposedState.facing = adjacentDirections.key(state.facing);
            break;
        case Actions.PLACE:
            proposedState.x = command.data.x;
            proposedState.y = command.data.y;
            proposedState.facing = command.data.facing;
            break
        default:
            console.log("Action was invalid");
            break;
    }
    console.debug("proposed state:" + proposedState.x + " " + proposedState.y + " " + proposedState.facing);
    return isStateValid(proposedState) ? proposedState : state
}

/**
 * Checks if a given state is considered valid
 * @param {string} state - the current state of the robot. Should contain at least x and y.
 * @returns {boolean} true if state is valid, otherwise false
 */
isStateValid = (state) => {
    // Check bounds here
    return (state.x >= 0 && state.y >= 0 && state.x < 5 && state.y < 5);
}

/**
 * Extract the required action and any additional data from the user input
 * Input for "PLACE" commands assumes the format PLACE x,y,facing
 * @param {string} input - the user input
 * @returns {Object} action - the command given, data - any additional data
 */
function processInput (input) {
    let action;
    let data;
    let inputIsValid = true;
    const cleanInput = input.trim().toLowerCase();
    if (cleanInput.includes(Actions.PLACE)) {
        action = Actions.PLACE;
            // Split on first occurcence of space, then split on subsequent commas
            const inputData = cleanInput.split(/\s(.+)/)[1].split(",");
            console.log(inputData);
            data = { x: inputData[0].trim(), y: inputData[1].trim(), facing: inputData[2].trim() };
            // inputIsValid = false;
            // console.log("PLACE commands should be entered in the format PLACE X,Y,FACING");
    } else {
        action = cleanInput
        if (!(action in Actions)) {
            inputIsValid = false;
            console.log("Action not one of LEFT/RIGHT/PLACE/REPORT/MOVE");
        }
    }
    return {action, data, inputIsValid}
}

exports.processCommand = processCommand;
exports.processInput = processInput;
exports.Facing = Facing;

