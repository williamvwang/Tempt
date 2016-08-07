var exports = module.exports = {};

/*
  Thread = {
    threadID: int
    games = { String gameName: Game }
  }
*/

var Thread = function(threadID) {
  this.threadID = threadID;
  this.games = {};

  this.addTempt = function(gameName, senderId, tempt) {
      this.games[gameName].addTempt(senderId, tempt);
  };

  this.getWhoTempted = function(gameName) {
      return this.games[gameName].getTempted();      
  };

  this.getTempt = function(gameName, senderId) {
      return this.games[gameName].getTempt(senderId);
  }

  this.deleteTempt = function(gameName, senderId) {
      var snapshot = getTempt(gameName, senderId);
      this.games[gameName].deleteTempt(senderId);
      return snapshot;
  }
};

exports.Thread = Thread;

