var vmModule = require("./game-view-model");
var frameModule = require("ui/frame");
var sound = require("nativescript-sound");

var pageModules = (function() {

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.gameViewModel;
			topmost = frameModule.topmost();
		}
	};

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
