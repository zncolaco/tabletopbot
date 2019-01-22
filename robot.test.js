const robot = require ("./robot.js");

describe("test test", () => {
    // Make sure things are working
    it("make sure things are working", () => {
        expect(robot.processAction("mystate", "Ad")).toEqual("mystate");
    });
});
