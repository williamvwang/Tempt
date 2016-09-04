var exports = module.exports = {};

// Schema

/*
  Tempt = {
    userID: int,
    timeCreated: Date,
    timeExpires: Date,
    displayName: String
  }
*/

// Classes

var Tempt = function(userID, userName) {
  this.timeCreated = Date.now();
  this.timeExpires = this.timeCreated + 1 * 60 * 60 * 1000; // 1 hour expiry
  this.userID = userID;
  this.displayName = userName;
  // this.nickname = nickname;

  this.display = function() {
      return this.displayName;
  };
}

// Exports

exports.Tempt = Tempt;
