const robot = require ("./robot.js");

describe("Movement and reporting", () => {
    
    let initialState;

    beforeEach(() => {
        initialState = { x: 0, y: 0, facing: robot.Facing.NORTH, isPlaced: true };
    });

    it("should move when the move command is given", () => {
        const expectedState = { x: 0, y: 1, facing: robot.Facing.NORTH, isPlaced: true };
        expect(robot.processCommand(initialState, {action: "move"})).toEqual(expectedState);
    });

    it("should turn left when the 'left' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.WEST, isPlaced: true };
        expect(robot.processCommand(initialState, {action: "left"})).toEqual(expectedState);
    });

    it("should turn right when the 'right' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.EAST, isPlaced: true };
        expect(robot.processCommand(initialState, {action: "right"})).toEqual(expectedState);
    });

    it("should move in the direction that it is facing after turning", () => {
        let state = Object.assign({}, initialState);
        state = robot.processCommand(state, { action: "move" });
        state = robot.processCommand(state, { action: "right" });
        state = robot.processCommand(state, { action: "move" });
        state = robot.processCommand(state, { action: "right" });
        const actualState = robot.processCommand(state, { action: "move" });
        const expectedState = { x: 1, y: 0, facing: robot.Facing.SOUTH, isPlaced: true };
        expect(actualState).toEqual(expectedState);
    });

    it("should not allow the robot to move out of the map bounds", () => {
        initialState = { x: 4, y: 4, facing: robot.Facing.NORTH };
        expect(robot.processCommand(initialState, {action: "move"})).toEqual(initialState);
    });

    it("should report the robot's position when the 'report' command is given", () => {
        console.info = jest.fn();
        initialState.isPlaced = true;
        robot.processCommand(initialState, {action: "report"});
        expect(console.info).toBeCalledWith("Robot is currently at (0,0, facing north)");
    });
});

describe("Robot placement", () => {
        
    let initialState;

    beforeEach(() => {
        initialState = { x: undefined, y: undefined, facing: undefined , isPlaced: false};
    });

    it("should get placed in the location specified by the 'place' command", () => {
        const data = { x: 1, y: 1, facing: robot.Facing.EAST};
        const expected = { x: 1, y: 1, facing: robot.Facing.EAST, isPlaced: true};
        expect(robot.processCommand(initialState, {action: "place", data})).toEqual(expected);
    });

    it("should ignore place commands that attempt to place the robot in an invalid location", () => {
        const data = { x: 6, y: 6, facing: robot.Facing.EAST};
        expect(robot.processCommand(initialState, {action: "place", data})).toEqual(initialState);
    });

    it("should ignore all other commands until the robot has been placed", () => {
        const expected = initialState
        expect(robot.processCommand(initialState, {action: "move"})).toEqual(expected);
        expect(robot.processCommand(initialState, {action: "left"})).toEqual(expected);
        expect(robot.processCommand(initialState, {action: "right"})).toEqual(expected);
        expect(robot.processCommand(initialState, {action: "report"})).toEqual(expected);
    });

});

describe("Robot input processing", () => {
    
    it ("should not return commands that do not match one of LEFT/RIGHT/MOVE/REPORT/PLACE", () => {
        expect(robot.processInput("potato")).toHaveLength(0)
        // expect(robot.processInput("moveleft")).toHaveLength(0);
        expect(robot.processInput("moveeeee")).toHaveLength(0);
    });

    it("should convert a valid input string into a command", () => {
        expect(robot.processInput("move")).toEqual([{action: robot.Actions.MOVE}]);
    });

    it("should return x, y and facing data for 'place' commands", () => {
        expect(robot.processInput("place 2,3,north")).toEqual([{action: robot.Actions.PLACE, data: {x: 2, y: 3, facing: robot.Facing.NORTH}}]);
    });

    it("should convert multiple space seperated input actions into multiple commands", () => {
        const expected  = [{action: robot.Actions.PLACE, data: {x: 2, y: 3, facing: robot.Facing.NORTH}},
                            {action: robot.Actions.LEFT},
                            {action: robot.Actions.MOVE}];
        expect(robot.processInput("place 2,3,north left   move")).toEqual(expected);
    });

    it ("should normalise the actions before returning them", () => {
        expect(robot.processInput("MoVe")[0].action).toEqual(robot.Actions.MOVE);
        expect(robot.processInput("  MoVe       ")[0].action).toEqual(robot.Actions.MOVE);
    })

    it("should not return any 'place' commands that do not have a valid data structure", () => {
        expect(robot.processInput("place 32north")).toHaveLength(0);
    });

    it ("should reject valid commands that have additional data passed in after the command", () => {
        expect(robot.processInput("move 3,2,NORTH")).toHaveLength(0);
    });
});
