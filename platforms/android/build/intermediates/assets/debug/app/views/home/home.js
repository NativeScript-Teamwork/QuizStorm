var vmModule = require("./views/home/home-view-model");
var frameModule = require("ui/frame");
var pagesModule = require("ui/page");
var sound = require("nativescript-sound");

var pageModules = (function() {
	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.mainViewModel;
			topmost = frameModule.topmost();
		},
		bananaSoundPlay: function() {
			var bananaSound = sound.create("~/sounds/banana.mp3");
			bananaSound.play();
		},
		navigateToPlay: function() {
			var navigationEntry = {
				moduleName: "./views/play/play",
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
exports.bananaSoundPlay = pageModules.bananaSoundPlay;
