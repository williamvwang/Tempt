var exports = module.exports = {};

var TemptHandler = require('../TemptHandler.js');
var game = require('../Game.js');
var Game = game.Game;

// 1 instance of this csgo class is to handle 1 csgo Qing system for 1 thread
/*
 * Schema
 *
 * csgo => {
 *    name: string,
 *    Game: general Game object that handles logic (shared amongst lots of games)
 * }
 *
 */
var csgo = function() {
    this.name = 'csgo';
    this.game = new Game(this.name);
    this.gameId = 730;

    this.exec = function(command, api, threadId, senderId) {
        switch(command) {
            case 'tempted':
                TemptHandler.addTempt(this.game, api, threadId, senderId);
                break;
            case 'untempt':
            	TemptHandler.deleteTempt(this.game, api, threadId, senderId);
            	break;
            case 'who':
                TemptHandler.getTempted(this.game, api, threadId);
                break;
            default:
                break;
        }
    };
};

exports.csgo = csgo;
