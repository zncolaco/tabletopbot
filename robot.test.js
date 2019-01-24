const robot = require ("./robot.js");

describe.only("Basic robot commands", () => {
    
    let initialState;
    
    beforeEach(() => {
        initialState = { x: 0, y: 0, facing: robot.Facing.NORTH };
    });

    it("should move when the move command is given", () => {
        const expectedState = { x: 0, y: 1, facing: robot.Facing.NORTH };
        expect(robot.processAction(initialState, "move")).toEqual(expectedState);
    });

    it("should turn left when the 'left' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.WEST };
        expect(robot.processAction(initialState, "left")).toEqual(expectedState);
    });

    it("should turn right when the 'right' command is given", () => {
        const expectedState = { x: 0, y: 0, facing: robot.Facing.EAST };
        expect(robot.processAction(initialState, "right")).toEqual(expectedState);
    });

    it("should move in the direction that it is facing after turning", () => {
        robot.processAction(initialState, "move");
        robot.processAction(initialState, "right");
        robot.processAction(initialState, "move");
        robot.processAction(initialState, "right");
        const actualState = robot.processAction(initialState, "move");
        const expectedState = { x: 1, y: 0, facing: robot.Facing.SOUTH };
        expect(actualState).toEqual(expectedState);
    });
});

describe("Robot placement and reporting", () => {
    it("should get placed in the location specified by the 'place' command", () => {

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
