    var steamClientFactory = require('./steamCFG.js');
    var configsArray = [];
    var config;
    var botArray = [];
    
    config = {};
    config.username = 'USERNAME'; //Steam Username
    config.password = 'PASSWORD'; //Steam Password
    config.sharedSecret = '';  // Shared Secret code if available
    config.games = [730] // Game ID's with Comma eg. [730,240,10]
    configsArray.push(config);

/*
--------------------------Multiple Configs can be imported eg.---------------------
    //USER 1
    config = {};
    config.username = 'USERNAME'; //Steam Username
    config.password = 'PASSWORD'; //Steam Password
    config.sharedSecret = ''; 
    config.games = [730] // Game ID's with Comma eg. [730,240,10]
    configsArray.push(config);

    //User 2
    config = {};
    config.username = 'USERNAME'; //Steam Username
    config.password = 'PASSWORD'; //Steam Password
    config.sharedSecret = ''; 
    config.games = [730] // Game ID's with Comma eg. [730,240,10]
    configsArray.push(config);
------------------------------------------------------------------------------------
*/
    console.log('Number of Accounts : ' + configsArray.length);
     
    for	(index = 0; index < configsArray.length; index++) {
    	var config = configsArray[index];
		
		var bot = steamClientFactory.buildBot(config);
		bot.doLogin();
		botArray.push(bot);
    }
     
    console.log('Running ' + botArray.length + ' Accounts.');
