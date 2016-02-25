var vmModule = require("./game-win-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");

var tapButtonSound = sound.create("~/sounds/banana.mp3");

var pageModules = (function() {

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.gameWinViewModel;
			global.numberOfPlayers = 0;
			vmModule.gameWinViewModel.setWinner();
			topmost = frameModule.topmost();
		},
		navigateToHomePage: function() {
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/home/home",
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
exports.navigateToHomePage = pageModules.navigateToHomePage;
