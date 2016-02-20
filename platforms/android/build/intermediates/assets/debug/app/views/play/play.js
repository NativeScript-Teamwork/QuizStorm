var vmModule = require("./play-view-model");
var frameModule = require("ui/frame");
var pagesModule = require("ui/page");
var sound = require("nativescript-sound");
var view = require("ui/core/view");

var players = [];

var pageModules = (function() {
	var tapButtonSound = sound.create("~/sounds/tap-button.mp3");
	var heheSound = sound.create("~/sounds/hehehe.mp3");

	var topmost;

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
				return;
			}

			if (players.length === 0) {
				var player1NameTextField = view.getViewById(page, "player1-name");
				player1NameTextField.text = addPlayerTextField.text;
				players.push({name: addPlayerTextField.text, score: 0});
			}
			else if (players.length === 1){
				var player2NameTextField = view.getViewById(page, "player2-name");
				player2NameTextField.text = addPlayerTextField.text;
				players.push({name: addPlayerTextField.text, score: 0});
			}

			addPlayerTextField.text = "";
		},
		navigateToGamePlaying: function() {
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/game/game",
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
exports.navigateToGamePlaying = pageModules.navigateToGamePlaying;
