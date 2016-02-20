var vmModule = require("./tips-view-model");

var pageModules = (function() {
	var pageModules = {
		pageLoaded: function(args) {
			var page = args.object;
			page.bindingContext = vmModule.homeViewModel;
			// topmost = frameModule.topmost();
		}
	};

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
