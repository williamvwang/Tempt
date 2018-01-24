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

var addTempt = function(game, api, threadId, senderId) {
  // Get user info
  api.getUserInfo(senderId, function(err, response) {
    if (err) {console.log(error);}

    var data = response[senderId.toString()];

    // Tempt level
    game.addTempt(senderId, new Tempt(senderId, data.name));

    // Generate human readable message
    var toSend = data.name + ' is now tempted for ' + game.name + '.';

    api.sendMessage(toSend, threadId);
  });
}

var getTempted = function(game, api, threadId) {
  var isTempted = game.getTempted();
  if (isTempted.length > 0) {
      var toSend = 'Tempted for ' + game.name + ':\n';
      api.sendMessage(toSend + formatTempted(isTempted), threadId);
  } else {
      api.sendMessage('No one is tempted for ' + game.name + ' in this thread.', threadId);
  }
}

var deleteTempt = function(game, api, threadId, senderId) {
  var gameName = game.name;
  var toSend = '';

  var snapshot = game.deleteTempt(senderId);
  if (snapshot === false) {
    toSend = 'You are not tempted for ' + gameName + '.';
  } else if (snapshot != null) {
    toSend = snapshot.displayName + ' is no longer tempted for ' + gameName + '.';
  }
  api.sendMessage(toSend, threadId);
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
