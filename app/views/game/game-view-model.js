var observable = require("data/observable");

var timerImageSrc = "~/images/timer/timer-";

var GameModel = (function (_super) {
    __extends(GameModel, _super);
    function GameModel() {
        _super.call(this);
        this.questionTimer = 10;
        this.timerImageSrc = timerImageSrc + this.questionTimer + ".png";
    }

    return GameModel;
})(observable.Observable);

exports.gameViewModel = new GameModel();
