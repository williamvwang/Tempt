var exports = module.exports = {};

/*
  Accumulator = {
    gameName: String
    timeCreated: Date,
    lastModified: Date,
    tempted: { int userID: Tempt }
  }
*/

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
    if (this.containsUser(userID)) {
      var deleted = this.tempted[userID];
      delete this.tempted[userID];
      this.modified();
      console.log('deleted tempt for ', userID);
      return deleted;
    } else {
      console.log('did not find/delete tempt for', userID);
      return false;
    }    
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
      isTempted.push(this.tempted[userID]);
    }
    return isTempted;
  }
};

exports.Accumulator = Accumulator;
