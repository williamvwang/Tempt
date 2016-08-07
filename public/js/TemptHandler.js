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

var addTempt = function(api, threadID, message, senderID) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1); // e.g. @csgo tempted => CSGO

  var temptThread = tempts[threadID];
  // Thread level
  if (temptThread == null) {
    // Create new Thread object if needed
    temptThread = new Thread(threadID);
  }

  // TODO: use var alias for tempts[threadID].games[gameName], e.g. var accumulator = ...
  // Accumulator level
  if (temptThread.games[gameName] == null) {
    // Set value of key gameName to new Accumulator
    temptThread.games[gameName] = new Game(gameName);
  }

  // Get user info
  api.getUserInfo(senderID, function(err, response) {
    if (err) {console.log(error);}

    var data = response[senderID.toString()];

    // Tempt level
    temptThread.addTempt(gameName, senderID, new Tempt(senderID, data.name));

    // Generate human readable message
    var toSend = data.name + ' is now tempted to play ' + gameName + '.';

    api.sendMessage(toSend, threadID);
  });
  tempts[threadID] = temptThread;
}

var getTempted = function(api, threadID, message) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1);

  if (tempts[threadID] != null) {

    var isTempted = tempts[threadID].getWhoTempted(gameName);
    if (isTempted.length > 0) {
      var toSend = 'Tempted to play ' + gameName + ':\n';
      api.sendMessage(toSend + formatTempted(isTempted), threadID);
    } else {
      api.sendMessage('No one is tempted to play ' + gameName + ' in this thread.', threadID);
    }
  } else {
    api.sendMessage(gameName + ' is not active in this thread.', threadID);
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
    temptedArray.forEach(function(value, index) {
      builder += (index + 1) + '. ' + value + '\n';
    })
    return builder;
  } else {
    return '';
  }
}
