/**
 * @file tempt.js
 * Handle grouping, setting, and expiration of tempts.
 *
 */
var exports = module.exports = {};
var tempts = {};

// TODO: move schema and classes to dedicated file

// Schema

/*
  Thread = {
    threadID: int
    games = { String gameName: Accumulator }
  }

  Accumulator = {
    gameName: String
    timeCreated: Date,
    lastModified: Date,
    tempted: { int userID: Tempt }
  }

  Tempt = {
    userID: int,
    timeCreated: Date,
    timeExpires: Date,
    displayName: String
  }
*/

// Classes

var Thread = function(threadID) {
  this.threadID = threadID;
  this.games = {};
}

var Accumulator = function(gameName) {
  this.gameName = gameName;
  this.timeCreated = Date.now();
  this.lastModified = this.timeCreated;
  this.tempted = {};
  this.getTempt = function(userID) {
    return this.tempted[userID];
    console.log('got tempt for ', userID);
  };
  this.addTempt = function(userID, tempt) {
    this.tempted[userID] = tempt;
    this.modified();
    console.log('added tempt for ', userID);
  };
  this.deleteTempt = function(userID) {
    delete this.tempted[userID];
    this.modified();
    console.log('deleted tempt for ', userID);
  };
  this.containsUser = function(userID) {
    return this.tempted[userID] != null;
  };
  this.modified = function() {
    this.lastModified = Date.now();
  };
  this.cleanExpired = function() {
    var toDelete = [];
    for (var userID in this.tempted) {
      if (!this.tempted.hasOwnProperty(userID)) continue;
      if (this.tempted[userID].timeExpires <= Date.now()) {
        toDelete.push(userID);
      }
    }
    if (toDelete.length > 0) {
      toDelete.forEach(function(id) {
        delete this.tempted[id];
        console.log('cleaned ' + id + ' for expiry');
      }, this); // Make sure to pass `this` context to forEach for parent scope
      this.modified();
    }
  };
  this.getTempted = function() {
    var isTempted = [];
    for (var userID in this.tempted) {
      if (!this.tempted.hasOwnProperty(userID)) continue;
      isTempted.push(this.tempted[userID].displayName);
    }
    return isTempted;
  }
};

var Tempt = function(userID, userName) {
  this.timeCreated = Date.now();
  this.timeExpires = this.timeCreated + 600000; // 10 minute expiry
  this.userID = userID;
  this.displayName = userName;
  // this.nickname = nickname;
}

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

    // Clean expired Tempts
    tempts[threadID].games[gameName].cleanExpired();

    // Generate human readable message
    var toSend = data.name + ' is tempted to play ' + gameName + '.\n'
    var isTempted = tempts[threadID].games[gameName].getTempted();
    toSend += formatTempted(isTempted);
    
    api.sendMessage(toSend, threadID);
  });

}

var getTempted = function(api, threadID, message) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1);

  if (tempts[threadID] != null) {

    // Clean expired Tempts
    tempts[threadID].games[gameName].cleanExpired();

    var isTempted = tempts[threadID].games[gameName].getTempted();
    if (isTempted.length > 0) {
      api.sendMessage(formatTempted(isTempted), threadID);
    } else {
      api.sendMessage('No one is tempted to play ' + gameName + ' in this thread.', threadID);
    }
  } else {
    api.sendMessage(gameName + ' is not active in this thread.', threadID);
  }
}

var deleteTempt = function(api, threadID, message, senderID) {
  var gameName = message.split(' ')[0].toUpperCase().substring(1);

  // Clean expired Tempts
  tempts[threadID].games[gameName].cleanExpired();

  var toSend = '';

  if (tempts[threadID].games[gameName].containsUser(senderID)) {
    var snapshot = tempts[threadID].games[gameName].getTempt(senderID);
    tempts[threadID].games[gameName].deleteTempt(senderID);
    var isTempted = tempts[threadID].games[gameName].getTempted();
    toSend += snapshot.displayName + ' is not tempted anymore.\n' + formatTempted(isTempted);
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
    builder += temptedArray.join(', ');
    if (temptedArray.length === 1) {
      builder += ' is';
    } else {
      builder += ' are';
    }
    builder += ' tempted.';
    return builder;
  } else {
    return '';
  }
}