var vmModule = require("./tips-view-model");
var frameModule = require("ui/frame");

var pageModules = (function() {
	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.tipsViewModel;
			// topmost = frameModule.topmost();
		},
		navigateToGame: function() {
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
