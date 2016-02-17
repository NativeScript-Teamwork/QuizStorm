var vmModule = require("./score-view-model");
var frameModule = require("ui/frame");

var pageModules = (function() {
	var topmost;

	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.scoreViewModel;
			topmost = frameModule.topmost();
		}
	};

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
