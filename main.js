const readline = require("readline");
const robot = require("./robot");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let robotState = {
    x: 0,
    y: 0,
    facing: 0,
}

input();

function input(){
    rl.question('What do you want to do?', (userInput) => {
        const action = robot.processInput(userInput);
        state = processAction(robotState, action);
        console.log(`Current state is x:${robotState.x} y:${robotState.y} facing: ${robotState.facing}`);
        input();
    });
}
