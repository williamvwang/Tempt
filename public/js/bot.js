var prompt = require('prompt');
var login = require('facebook-chat-api');
var gameModules = require('./games');
var activityModules = require('./activities');
var thread = require('./Thread.js');
var Thread = thread.Thread;

// Reading user login info
if (process.env.USE_CLI === 'true') {
	var EMAIL_PATTERN = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var schema = {
		properties: {
		  	email: {
		    	pattern: EMAIL_PATTERN,
		    	message: "Email format only. E.g.: foo@bar.com",
		    	required: true
		  	},
		 	password: {
		 		hidden: true,
		    	replace: '*',
		    	required: true
		  	}
		}
	};

	var userAPI, email, stopListening;
	prompt.start();
	prompt.get(schema, function(err, result){
		if (err) {
			return console.error(err);
		}
		email = result.email;
		login({email: result.email, password: result.password},
			{selfListen: true},
			function(err, api) {
				if (err) {
					return console.error(err);
				}
				userAPI = api;
				console.log("\"" + email + "\" logged in!");
				// Bot listener
				stopListening = userAPI.listen(listenerCallback);
			}
		);
	});
} else {
	// Use environment variables to login
	email = process.env.BOT_EMAIL;
	login({email: process.env.BOT_EMAIL, password: process.env.BOT_PASSWORD},
		{selfListen: true},
		function(err, api) {
			if (err) {
				return console.error(err);
			}
			userAPI = api;
			console.log("\"" + email + "\" logged in!");
			// Bot listener
			stopListening = userAPI.listen(listenerCallback);
		}
	);
}

function listenerCallback(err, event) {
	if (err) {
		stopListening();
		return console.error(err);
	}
	switch (event.type) {
		case "message":
			messageHandler(event);
		break;
		// TODO: add more event types
		default:
		break;
	}
}

var threads = {};

function messageHandler(event) {
	var message = event.body;

	if (message != null) {
		// Handle game tempt (Min 3 participants) (event.isGroup)
		var matches;
		if ((matches = /^@(\w+) (\w+)( .+)?$/.exec(message)) !== null) {
			var game = matches[1].toLowerCase();
			var cmd = matches[2].toLowerCase();
			var args = matches[3];

			var thread = threads[event.threadID];
			if (thread == null) {
				thread = new Thread(event.threadID);
			}

            var validActivity = false;
			if (game in gameModules) {
				// give control to the game
				// assume new instance of game
				var newGame = new gameModules[game]();
                validActivity = true;
			} else if (game in activityModules) {
				// send msg to js api
				var newGame = new activityModules[game]();
                validActivity = true;
			}
            
            if (validActivity) {
			    thread.exec(newGame, cmd, args, userAPI, event.senderID);
			    threads[event.threadID] = thread;
            }
		}
	}
}

// Exit -- logout user
function exitHandler(options, err) {
	stopListening();
	console.log('Stopped listening.');

	if (err) {
		return console.error(err);
	}
    if (options.cleanup || options.exit) {
    	if (email != undefined && userAPI != undefined) {
	    	console.log("Logging out \"" + email + "\"...");
	    	userAPI.logout(function(err) {
	    		console.error(err);
	    	});
	    	email = undefined;
	    	userAPI = undefined;
    	} else {
    		return console.log("No active session. Closing...")
    	}
    } else if (options.exception) {
    		return console.error(err);
    }
    return;
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exception: true}));
