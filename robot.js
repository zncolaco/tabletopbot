const robot = require('./robot.js');

const Actions = {
    PLACE: "place",
    MOVE: "move",   
    LEFT: "left",
    RIGHT: "right",
    REPORT: "report"
}

Object.freeze(Actions);

processAction = (state, action) => { 
    let proposedState = state;
    switch (action) {
        case Actions.MOVE:
            proposedState.y += 1
            break;
        default:
            break;
    }
    console.log(proposedState);
    return isStateValid(proposedState) ? proposedState : state
}

isStateValid = (state) => {
    // Check bounds here
    return true;
}

processInput = (input) => {
    // Do some input cleaning up here, splitting the PLACE data etc..
    return input;
}

exports.processAction = processAction;
exports.processInput = processInput;
