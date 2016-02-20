var Sqlite = require("nativescript-sqlite");

exports.initializeSQLite = function() {
	var db_promise = new Sqlite("QuizStorm.sqlite", function(err, db) {
	    if (err) { 
	      console.error("Failed to open database", err);
	    } else {
	      // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred 
	      console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); 
	      global.db = db;
	    }

	    global.db.execSQL("CREATE TABLE `WorldwideScore` (`WorldwideScoreId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `Player` TEXT NOT NULL, `Points` INTEGER, `Country` TEXT NOT NULL );"); 
	    global.db.execSQL("CREATE TABLE `LocalScore` (`LocalScoreId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `Player` TEXT NOT NULL, `Points` INTEGER, `Country` TEXT NOT NULL );"); 
	    global.db.execSQL("CREATE TABLE `Players` (`PlayersId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `PlayerOne` TEXT NOT NULL, `PlayerTwo` TEXT NOT NULL );"); 

		console.log("Tables created..."); 
	});  
	
};