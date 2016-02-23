var constantsModule = require("nativescript-sqlite");

var Scores = (function (_super) {
    __extends(Scores, _super);
    function Scores() {
        _super.call(this);
    }
    
    Scores.prototype.addWorldwideScore = function (id, player, points, country) {
        global.db.execSQL("insert into WorldwideScore values (?, ?, ?, ?)", [id, player, points, country])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });
    };

    Scores.prototype.addLocalScore = function (player, points, country) {
        global.db.execSQL("insert into LocalScore values (?, ?, ?)", [player, points, country])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });
    };

    Scores.prototype.getTopSixWorldwideScores = function () {
        return global.db.all("select * from WorldwideScore order by points desc limit 6;")
        .then(function(resultSet) {
            console.log("result is: ", resultSet);
            return resultSet;
        }, function(err){
            console.log(err);
        });
    };

    Scores.prototype.getTopFourLocalScore = function () {
        return global.db.all("select * from WorldwideScore order by points desc limit 4;")
        .then(function(resultSet) {
            console.log("result is: ", resultSet);
            return resultSet;
        }, function(err){
            console.log(err);
        });
    };

    Scores.prototype.dropScoreTable = function (name) {
        return global.db.all("drop table " + name + ";")
        .then(function() {
            console.log("Dropped " + name);
        }, function(err){
            console.log(err);
        });
    };

    Scores.prototype.deleteDataFromTable = function (name) {
        return global.db.all("delete from " + name + ";")
        .then(function() {
            console.log("Old data removed");
        }, function(err){
            console.log(err);
        });
    };

    return Scores;

})(Object);

exports.Scores = new Scores();
