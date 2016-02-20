var application = require("application");
var databaseModule = require("./common/database");

databaseModule.initializeSQLite();

application.mainModule = "./views/home/home";
application.cssFile = "./styles/app.css";
application.start();
