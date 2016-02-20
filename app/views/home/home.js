var vmModule = require("./home-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");

var pageModules = (function() {
	var bananaSound = sound.create("~/sounds/banana.mp3");
	var tapButtonSound = sound.create("~/sounds/tap-button.mp3");

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.homeViewModel;
			topmost = frameModule.topmost();
		},
		bananaSoundPlay: function() {
			bananaSound.play();
		},
		navigateToPlayPage: function() {
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/play/play",
				backstackVisible: false,
                animated: true,
                navigationTransition: {
                    transition: "flip "
                },
			};

			topmost.navigate(navigationEntry);
		},
		navigateToScorePage: function() {
			tapButtonSound.play();
			var navigationEntry = {
				moduleName: "./views/score/score",
				backstackVisible: true,
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
exports.bananaSoundPlay = pageModules.bananaSoundPlay;
exports.navigateToPlayPage = pageModules.navigateToPlayPage;
exports.navigateToScorePage = pageModules.navigateToScorePage;
