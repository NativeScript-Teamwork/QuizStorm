var vmModule = require("./tips-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");

var pageModules = (function() {
	var tapButtonSound = sound.create("~/sounds/tap-button.mp3");

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.tipsViewModel;
			// topmost = frameModule.topmost();
		},
		navigateToGame: function() {
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/game/game",
				backstackVisible: false,
				animated: true,
				navigationTransition: {
					transition: "flip "
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		}
	};


	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
exports.navigateToGame = pageModules.navigateToGame;
