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
directionMultiplier.set(Facing.NORTH, { x: 0, y: 1 });
directionMultiplier.set(Facing.SOUTH, { x: 0, y: -1 });
directionMultiplier.set(Facing.EAST, { x: 1, y: 0 });
directionMultiplier.set(Facing.WEST, { x: -1, y: 0 });

const adjacentDirections = new BiMap;
adjacentDirections.push(Facing.WEST, Facing.NORTH);
adjacentDirections.push(Facing.NORTH, Facing.EAST);
adjacentDirections.push(Facing.EAST, Facing.SOUTH);
adjacentDirections.push(Facing.SOUTH, Facing.WEST);

Object.freeze(Facing);
Object.freeze(Actions);
Object.freeze(directionMultiplier);
Object.freeze(adjacentDirections);

/**
 * Executes a requested command.
 * @param {Object} state - the state of the robot. Must contain, x, y, and facing
 * @param {Object} command - the command to be executed. Must contain an action. 
 *                           Must contain a data field if a PLACE command is to be executed.
 * @return {Object} state - the new state of the robot. If the command was invalid, the state will remain the same.
 */
processCommand = (state, command) => {
    let proposedState = Object.assign({}, state);

    if (!(state.isPlaced || (command.action === Actions.PLACE))) {
        console.log("Please place the robot first")
        return proposedState;
    }

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
            proposedState.isPlaced = true;
            break
        case Actions.REPORT:
            console.info(`Robot is currently at (${state.x},${state.y}, facing ${state.facing})`)
            break;
        default:
            console.debug("Action was invalid");
            break;
    }
    console.debug("proposed state:" + proposedState.x + " " + proposedState.y + " " + proposedState.facing);
    return isStateValid(proposedState) ? proposedState : state;
}

/**
 * Checks if a given state is considered valid
 * @param {string} state - the current state of the robot. Should contain at least x and y.
 * @returns {boolean} true if state is valid, otherwise false
 */
isStateValid = (state) => {
    return ((state.x >= 0) && (state.y >= 0) && (state.x < 5) && (state.y < 5));
}

/**
 * Extract the required action and any additional data from the user input
 * Input for "PLACE" commands assumes the format PLACE x,y,facing
 * @param {string} input - the user input
 * @returns {Object} action - the command given, data - any additional data
 */
processInput = (input) => {
    let action;
    let data;
    let inputIsValid = true;
    const cleanInput = input.trim().toLowerCase();
    if (cleanInput.includes(Actions.PLACE)) {
        action = Actions.PLACE;
        // Split on first occurcence of space, then split on subsequent commas
        try {
            const inputData = cleanInput.split(/\s(.+)/)[1].split(",");
            data = {
                x: parseInt(inputData[0].trim()),
                y: parseInt(inputData[1].trim()),
                facing: inputData[2].trim()
            };
        } catch (e) {
            inputIsValid = false;
            console.log("PLACE commands should be entered in the format PLACE X,Y,FACING");
        }
    } else {
        action = cleanInput
        if (!Object.values(Actions).includes(action)) {
            inputIsValid = false;
            console.log("Action was not one of LEFT/RIGHT/PLACE/REPORT/MOVE");
        }
    }
    return { action, data, inputIsValid }
}

exports.processCommand = processCommand;
exports.processInput = processInput;
exports.Facing = Facing;
exports.Actions = Actions;