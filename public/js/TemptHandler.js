/**
 * @file tempt.js
 * Handle grouping, setting, and expiration of tempts.
 *
 */
"use strict";

// Instantiate classes
var Thread = require('./Thread.js').Thread;
var Game = require('./Game.js').Game;
var Tempt = require('./Tempt.js').Tempt;

var exports = module.exports = {};

// Tempt container
// Hierarchy: tempts >> Thread >> Game >> Accumulator >> Tempt
var tempts = {};

// Functions

var addTempt = function(game, api, threadID, senderID) {
  // Get user info
  api.getUserInfo(senderID, function(err, response) {
    if (err) {console.log(error);}

    var data = response[senderID.toString()];

    // Tempt level
    game.addTempt(senderID, new Tempt(senderID, data.name));

    // Generate human readable message
    var toSend = data.name + ' is now tempted to play ' + game.name + '.';

    api.sendMessage(toSend, threadID);
  });
}

var getTempted = function(game, api, threadID) {
    var isTempted = game.getTempted();
    if (isTempted.length > 0) {
        var toSend = 'Tempted to play ' + game.name + ':\n';
        api.sendMessage(toSend + formatTempted(isTempted), threadID);
    } else {
        api.sendMessage('No one is tempted to play ' + game.name + ' in this thread.', threadID);
    }
}

var deleteTempt = function(api, threadID, message, senderID) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1);

  var toSend = '';

  if (tempts[threadID].games[gameName].containsUser(senderID)) {
    var snapshot = tempts[threadID].deleteTempt(gameName, senderID);
    toSend += snapshot.displayName + ' is no longer tempted to play ' + gameName + '.';
  } else {
    toSend = 'You are not tempted.';
  }

  api.sendMessage(toSend, threadID);
}

// Exports

exports.addTempt = addTempt;
exports.getTempted = getTempted;
exports.deleteTempt = deleteTempt;

// Util functions

function formatTempted(temptedArray) {
  var builder = '';
  if (temptedArray.length > 0) {
    temptedArray.forEach(function(tempt, index) {
      builder += (index + 1) + '. ' + tempt.display() + '\n';
    })
    return builder;
  } else {
    return '';
  }
}
