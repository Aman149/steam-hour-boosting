var SteamUser = require('steam-user');
var SteamTotp = require('steam-totp');
var botFactory = {};
 
botFactory.buildBot = function (config)
{	
	var bot = new SteamUser({
        promptSteamGuardCode: false,
		dataDirectory: "./sentry",
		singleSentryfile: false
    });
	
	bot.username = config.username;
	bot.password = config.password;
	bot.sharedSecret = config.sharedSecret;
	bot.games = config.games;
	bot.messageReceived = {};
	
	bot.on('loggedOn', function(details) {
		console.log("[" + this.username + "] Logged into Steam as Steam ID : " + bot.steamID.getSteam3RenderedID());
		bot.setPersona(SteamUser.EPersonaState.Online);
		bot.gamesPlayed(this.games);
	});
 
	bot.on('error', function(e) {
		console.log("[" + this.username + "] " + e);
		setTimeout(function() {bot.doLogin();}, 30*60*1000);
	});
 
	bot.doLogin = function ()
	{
		this.logOn({ 
			"accountName": this.username,
			"password": this.password
		});
	}
	
	bot.on('steamGuard', function(domain, callback) {
		if ( !this.sharedSecret ) {
			var readlineSync = require('readline-sync');
			var authCode = readlineSync.question("[" + this.username + "] " + 'Steam Guard' + (!domain ? ' App' : '') + ' Code : ');
			callback(authCode);	
		} 
		else {
			var authCode = SteamTotp.generateAuthCode( this.sharedSecret );
			console.log("[" + this.username + "] Generated Auth Code: " + authCode);
			callback(authCode);	
		}
		
	});
	
	bot.on("friendMessage", function(steamID, message) {
		console.log("[" + this.username + "] Message from " + steamID+ ": " + message);
		if ( !this.messageReceived[steamID] ) {
			bot.chatMessage(steamID, "Currently not available to play");
			this.messageReceived[steamID] = true;
		}
	});
	
	return bot;
}
 
module.exports = botFactory;