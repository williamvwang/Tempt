var exports = module.exports = {};

/*
  Thread = {
    threadId: int
    games = { String gameName: Game }
  }
*/

var Thread = function(threadId) {
  this.threadId = threadId;
  this.games = {};

  this.exec = function(game, command, args, api, senderId) {
      if (game.name in this.games) {
          game = this.games[game.name];
      } else {
          this.games[game.name] = game;
      }

      game.exec(command, args, api, this.threadId, senderId);
  };
};

exports.Thread = Thread;
