/**
 * @file tempt.js
 * Handle grouping, setting, and expiration of tempts.
 *
 */
"use strict";

// Instantiate classes
var classes = require('./classes.js');
var Thread = classes.Thread;
var Accumulator = classes.Accumulator;
var Tempt = classes.Tempt;

var exports = module.exports = {};

// Tempt container
// Hierarchy: tempts >> Thread >> Accumulator >> Tempt
var tempts = {};

// Functions

var addTempt = function(api, threadID, message, senderID) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1); // e.g. @csgo tempted => CSGO

  // Thread level
  if (tempts[threadID] == null) {
    // Create new Thread object if needed
    tempts[threadID] = new Thread(threadID);
  }

  // TODO: use var alias for tempts[threadID].games[gameName], e.g. var accumulator = ...
  // Accumulator level
  if (tempts[threadID].games[gameName] == null) {
    // Set value of key gameName to new Accumulator
    tempts[threadID].games[gameName] = new Accumulator(gameName);
  }
  
  // Get user info
  api.getUserInfo(senderID, function(err, response) {
    if (err) {console.log(error);}

    var data = response[senderID.toString()];

    // Tempt level
    tempts[threadID].games[gameName].addTempt(senderID, new Tempt(senderID, data.name));

    // Generate human readable message
    var toSend = data.name + ' is now tempted to play ' + gameName + '.';
    
    api.sendMessage(toSend, threadID);
  });

}

var getTempted = function(api, threadID, message) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1);

  if (tempts[threadID] != null) {

    var isTempted = tempts[threadID].games[gameName].getTempted();
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
    var snapshot = tempts[threadID].games[gameName].getTempt(senderID);
    tempts[threadID].games[gameName].deleteTempt(senderID);
    var isTempted = tempts[threadID].games[gameName].getTempted();
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