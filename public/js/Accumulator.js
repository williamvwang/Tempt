var exports = module.exports = {};

/*
  Accumulator = {
    gameName: String
    timeCreated: Date,
    lastModified: Date,
    tempted: { int userId: Tempt }
  }
*/

var Accumulator = function(gameName) {
  this.gameName = gameName;
  this.timeCreated = Date.now();
  this.lastModified = this.timeCreated;
  this.tempted = {};

  this.getTempt = function(userId) {
    this.cleanExpired();
    return this.tempted[userId];
    console.log('got tempt for ', userId);
  };

  this.addTempt = function(userId, tempt) {
    this.cleanExpired();
    this.tempted[userId] = tempt;
    this.modified();
    console.log('added tempt for ', userId);
  };

  this.deleteTempt = function(userId) {
    if (this.containsUser(userId)) {
      var deleted = this.tempted[userId];
      delete this.tempted[userId];
      this.modified();
      console.log('deleted tempt for ', userId);
      return deleted;
    } else {
      console.log('dId not find/delete tempt for', userId);
      return false;
    }    
  };

  this.containsUser = function(userId) {
    this.cleanExpired();
    return this.tempted[userId] != null;
  };

  this.modified = function() {
    this.lastModified = Date.now();
  };

  this.cleanExpired = function() {
    var toDelete = [];
    for (var userId in this.tempted) {
      if (!this.tempted.hasOwnProperty(userId)) continue;
      if (this.tempted[userId].timeExpires <= Date.now()) {
        toDelete.push(userId);
      }
    }
    if (toDelete.length > 0) {
      toDelete.forEach(function(Id) {
        delete this.tempted[Id];
        console.log('cleaned ' + Id + ' for expiry');
      }, this); // Make sure to pass `this` context to forEach for parent scope
      this.modified();
    }
  };

  this.getTempted = function() {
    this.cleanExpired();
    var isTempted = [];
    for (var userId in this.tempted) {
      if (!this.tempted.hasOwnProperty(userId)) continue;
      isTempted.push(this.tempted[userId]);
    }
    return isTempted;
  }
};

exports.Accumulator = Accumulator;
