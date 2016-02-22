var vmModule = require("./play-view-model");
var frameModule = require("ui/frame");
var pagesModule = require("ui/page");
var sound = require("nativescript-sound");
var view = require("ui/core/view");
var Toast = require("nativescript-toast");
var playerService = require("~/services/player-service");

var pageModules = (function() {
	var tapButtonSound = sound.create("~/sounds/tap-button.mp3");
	var heheSound = sound.create("~/sounds/hehehe.mp3");

	var playerNameRegex = /([a-zA-Z])\w+/;

	var topmost;
	var toast;
	var numberOfPlayers = 0;

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.playViewModel;
			topmost = frameModule.topmost();

		},
		addPlayerButton: function(args) {
			heheSound.play();
			var page = args.object.page;
			var addPlayerTextField = view.getViewById(page, "addPlayerTextField");

			if (!addPlayerTextField.text) {
				toast = Toast.makeText("Player name cannot be empty", "long");
				toast.show();
				return;
			} else if (addPlayerTextField.text.length < 2) {
				toast = Toast.makeText("Player name is too short", "long");
				toast.show();
				return;
			} else if (addPlayerTextField.text.length > 15) {
				toast = Toast.makeText("Player name is too long", "long");
				toast.show();
				return;
			} else if (!playerNameRegex.test(addPlayerTextField.text)) {
				toast = Toast.makeText("Player name can contains only latin letters", "long");
				toast.show();
				return;
			}

			if (numberOfPlayers === 0) {
				var player1NameTextField = view.getViewById(page, "player1-name");
				player1NameTextField.text = addPlayerTextField.text;

				// Adding player 1 to SQLite
				playerService.Players.addPlayer(0, addPlayerTextField.text, 0);
				numberOfPlayers += 1
			}
			else if (numberOfPlayers === 1){
				var player2NameTextField = view.getViewById(page, "player2-name");
				player2NameTextField.text = addPlayerTextField.text;

				// Adding player 2  to SQlite
				playerService.Players.addPlayer(1, addPlayerTextField.text, 0);
				numberOfPlayers += 1;
			} 

			addPlayerTextField.text = "";
		},
		navigateToTips: function() { // navigate after the two players are added
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/tips/tips",
				backstackVisible: false,
				animated: true,
				navigationTransition: {
					transition: "flip "
				},
			};

			topmost.navigate(navigationEntry);
		}
	};

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
exports.addPlayerButton = pageModules.addPlayerButton;
exports.navigateToTips = pageModules.navigateToTips;
