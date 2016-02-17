var observable = require("data/observable");

var HomeModel = (function (_super) {
    __extends(HomeModel, _super);
    function HomeModel() {
        _super.call(this);
    }
    
    return HomeModel;
    
})(observable.Observable);

exports.HomeModel = HomeModel;
exports.mainViewModel = new HomeModel();