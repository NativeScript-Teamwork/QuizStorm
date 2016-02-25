var application = require("application");
var databaseModule = require("./common/database");

global.numberOfPlayers = 0;
global.redPlayer = {};
global.bluePlayer = {};

databaseModule.initializeSQLite();

application.mainModule = "./views/home/home";
application.cssFile = "./styles/app.css";
application.start();
