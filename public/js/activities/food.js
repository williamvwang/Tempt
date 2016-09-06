var exports = module.exports = {};

var TemptHandler = require('../TemptHandler.js');
var game = require('../Game.js');
var Game = game.Game;

var food = function() {
    this.name = 'food';
    this.activity = new Game(this.name);
    this.place = null;

    this.setPlace = function(api, threadId, where) { // maybe implement some voting system
        where = where.trim();
        this.place = where;
        api.sendMessage('Food is now at ' + this.place, threadId);
    };

    this.getPlace = function(api, threadId) {
        if (this.place === null) {
            api.sendMessage('Nowhere... yet', threadId);
        } else {
            api.sendMessage('Food at ' + this.place, threadId);
        }
    };

    this.exec = function(command, args, api, threadId, senderId) {
        switch (command) {
            case 'tempted':
                TemptHandler.addTempt(this.activity, api, threadId, senderId);
                break;
            case 'untempt':
            	TemptHandler.deleteTempt(this.activity, api, threadId, senderId);
            	break;
            case 'who':
                TemptHandler.getTempted(this.activity, api, threadId);
                break;
            case 'where':
                this.getPlace(api, threadId);
                break;
            case 'at':
                if (typeof args !== 'undefined') {
                    this.setPlace(api, threadId, args);
                }
                break;
        }
    };
};

exports.food = food;
