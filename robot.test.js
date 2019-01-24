const robot = require ("./robot.js");

describe("Basic robot commands", () => {
    
    let initialState;

    beforeEach(() => {
        initialState = { x: 0, y: 0, facing: robot.Facing.NORTH };
    });

    it.only("should move when the move command is given", () => {
        const expectedState = { x: 0, y: 1, facing: robot.Facing.NORTH };
        expect(robot.processCommand(initialState, {action: "move"})).toEqual(expectedState);
    });

    it("should turn left when the 'left' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.WEST };
        expect(robot.processCommand(initialState, {action: "left"})).toEqual(expectedState);
    });

    it("should turn right when the 'right' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.EAST };
        expect(robot.processCommand(initialState, {action: "right"})).toEqual(expectedState);
    });

    it("should move in the direction that it is facing after turning", () => {
        robot.processCommand(initialState, { action: "move" });
        robot.processCommand(initialState, { action: "right" });
        robot.processCommand(initialState, { action: "move" });
        robot.processCommand(initialState, { action: "right" });
        const actualState = robot.processCommand(initialState, { action: "move" });
        const expectedState = { x: 1, y: 0, facing: robot.Facing.SOUTH };
        expect(actualState).toEqual(expectedState);
    });
});

describe("Robot placement and reporting", () => {
        
    let initialState;

    beforeEach(() => {
        initialState = { x: 0, y: 0, facing: robot.Facing.NORTH };
    });

    it.only("should get placed in the location specified by the 'place' command", () => {
        const data = { x: 1, y: 1, facing: robot.Facing.EAST};
        const expected = { x: 1, y: 1, facing: robot.Facing.EAST};
        expect(robot.processCommand(initialState, {action: "place", data})).toEqual(expected);
    });

    it("should ignore place commands that attempt to place the robot in an invalid location", () => {

    });

    it("should ignore all other commands until the robot has been placed", () => {

    });

    it("should report the robot's position when the 'report' command is given", () => {

    });
});

describe("Robot input processing", () => {
    it ("should ignore any commands that do not match LEFT/RIGHT/MOVE/REPORT/PLACE", () => {

    });

    it("should ignore 'place' commands that do not have a valid data structure", () => {

    });

    it ("should normalise the strings before passing the data across", () => {

    })

    it ("should reject valid commands that have additional data passed in after the command", () => {

    });

});
