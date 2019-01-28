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

const MapBounds = {
    NORTH: 5,
    EAST: 5,
    SOUTH: 0,
    WEST: 0,
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

exports.Facing = Object.freeze(Facing);
exports.Actions = Object.freeze(Actions);
exports.directionMultiplier = Object.freeze(directionMultiplier);
exports.adjacentDirections = Object.freeze(adjacentDirections);
exports.MapBounds = Object.freeze(MapBounds);