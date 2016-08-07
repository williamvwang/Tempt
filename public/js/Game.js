var accumulator = require('./Accumulator.js');
var Accumulator = accumulator.Accumulator;

var exports = module.exports = {};

// TODO: determine how to store game ids
var GameIds = {
    'csgo': 730
};

var Game = function(gameName) {
    this.gameName = gameName;
    this.accumulator = new Accumulator(gameName);
    if (gameName in GameIds) this.GameId = GameIds[gameName];

    this.addTempt = function(userId, tempt) {
        this.accumulator.addTempt(userId, tempt);
    };

    this.getTempted = function() {
        return this.accumulator.getTempted();
    };

    this.getTempt = function(userId) {
        return this.accumulator.getTempt(userId);
    }

    this.deleteTempt = function(userId) {
        this.accumulator.deleteTempt(userId);
    }
};

exports.Game = Game;
