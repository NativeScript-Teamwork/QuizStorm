var vmModule = require("./play-view-model");
var frameModule = require("ui/frame");
var pagesModule = require("ui/page");
var sound = require("nativescript-sound");

var pageModules = (function() {
	var tapButtonSound = sound.create("~/sounds/tap-button.mp3");

	var topmost;

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.playViewModel;
			topmost = frameModule.topmost();
		},
		/*navigateToPlay: function() {
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
		}*/
	};

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
