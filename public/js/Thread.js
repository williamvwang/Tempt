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

  this.exec = function(game, command, api, senderId) {
      if (game.name in this.games) {
          game = this.games[game.name];
      } else {
          this.games[game.name] = game;
      }

      game.exec(command, api, this.threadID, senderId);
  };
};

exports.Thread = Thread;
