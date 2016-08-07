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
  this.timeExpires = this.timeCreated + 10 * 60 * 1000; // 10 minute expiry
  this.userID = userID;
  this.displayName = userName;
  // this.nickname = nickname;
}

// Exports

exports.Tempt = Tempt;
