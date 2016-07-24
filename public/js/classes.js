var exports = module.exports = {};

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
    this.cleanExpired();
    return this.tempted[userID];
    console.log('got tempt for ', userID);
  };
  this.addTempt = function(userID, tempt) {
    this.cleanExpired();
    this.tempted[userID] = tempt;
    this.modified();
    console.log('added tempt for ', userID);
  };
  this.deleteTempt = function(userID) {
    this.cleanExpired();
    delete this.tempted[userID];
    this.modified();
    console.log('deleted tempt for ', userID);
  };
  this.containsUser = function(userID) {
    this.cleanExpired();
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
    this.cleanExpired();
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

// Exports

exports.Thread = Thread;
exports.Accumulator = Accumulator;
exports.Tempt = Tempt;