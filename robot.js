const {
  Actions, Facing, adjacentDirections, directionMultiplier, MapBounds,
} = require('./constants');

/**
 * Checks if a given state is considered valid
 * @param {string} state - the current state of the robot. Should contain at least x and y.
 * @returns {boolean} true if state is valid, otherwise false
 */
const isStateValid = state => ((state.x >= MapBounds.WEST) && (state.y >= MapBounds.SOUTH)
            && (state.x < MapBounds.EAST) && (state.y < MapBounds.NORTH));

/**
 * Executes a requested command.
 * @param {Object} state - the state of the robot. Must contain, x, y, and facing
 * @param {Object} command - the command to be executed. Must contain an action.
 *                           Must contain a data field if a PLACE command is to be executed.
 * @return {Object} state - the new state of the robot.
 *                          If the command was invalid, the state will remain the same.
 */
const processCommand = (state, command) => {
  const proposedState = Object.assign({}, state);

  if (!(state.isPlaced || (command.action === Actions.PLACE))) {
    console.log('Please place the robot first');
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
      break;
    case Actions.REPORT:
      console.info(`Robot is currently at (${state.x},${state.y}, facing ${state.facing})`);
      break;
    default:
      console.debug('Action was invalid');
      break;
  }
  console.debug(`proposed state: x:${proposedState.x} y:${proposedState.y} f:${proposedState.facing}`);
  return isStateValid(proposedState) ? proposedState : state;
};

/**
 * Extract the required action and any additional data from the user input
 * Input for "PLACE" commands assumes the format PLACE x,y,facing.
 * Commands are case insensitive. Multiple commands can be entered using a space as a seperator.
 * @param {string} input - the user input
 * @returns {Object} action - the command given, data - any additional data
 */
const processInput = (input) => {
  // Split input on any recognised command using a positive lookahead to keep the matched tokens
  const rawCommands = input.toLowerCase().split(/(?=move|left|right|place|report)/g);
  const commands = [];

  rawCommands.forEach((rawCommand) => {
    const command = rawCommand.trim();
    let action;
    let data;
    if (command.includes(Actions.PLACE)) {
      action = Actions.PLACE;
      // Split on first occurcence of space, then split on subsequent commas
      try {
        const inputData = command.split(/\s(.+)/)[1].split(',');
        data = {
          x: parseInt(inputData[0].trim(), 10),
          y: parseInt(inputData[1].trim(), 10),
          facing: inputData[2].trim(),
        };
        commands.push({ action, data });
      } catch (e) {
        console.log('PLACE commands should be entered in the format PLACE X,Y,FACING');
      }
    } else if (Object.values(Actions).includes(command)) {
      action = command;
      commands.push({ action });
    } else {
      console.log('Action was not one of LEFT/RIGHT/PLACE/REPORT/MOVE');
    }
  });
  return commands;
};

exports.processCommand = processCommand;
exports.processInput = processInput;
exports.Facing = Facing;
exports.Actions = Actions;
