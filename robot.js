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

processAction = (state, action) => { 
    let proposedState = state;
    switch (action) {
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
        default:
            break;
    }
    console.debug("proposed state:" + proposedState.x + " " + proposedState.y + " " + proposedState.facing);
    return isStateValid(proposedState) ? proposedState : state
}

isStateValid = (state) => {
    // Check bounds here
    return (state.x >= 0 && state.y >= 0 && state.x < 5 && state.y < 5);
}

processInput = (input) => {
    // Do some input cleaning up here, splitting the PLACE data etc..
    return input;
}

exports.processAction = processAction;
exports.processInput = processInput;
exports.Facing = Facing;

