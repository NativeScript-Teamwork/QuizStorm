var constantsModule = require("nativescript-sqlite");

var Players = (function (_super) {
    __extends(Players, _super);
    function Players() {
        _super.call(this);
    }
    
    
    Players.prototype.addPlayer = function (id, playerName, points) {
        global.db.execSQL("insert into Players values (?, ?, ?)", [id, playerName, points])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });
    };

    Players.prototype.getPlayers = function () {
        return global.db.all("select * from Players")
        .then(function(data){
            console.log("result is: ", data);
            return data;
        }, function(err){
            console.log(err);
        });
    };

    Players.prototype.dropPlayerTable = function (name) {
        return global.db.all("drop table " + name + ";")
        .then(function() {
            console.log("Dropped " + name);
        }, function(err){
            console.log(err);
        });
    };
    
    Players.prototype.deleteDataFromTable = function (name) {
        return global.db.all("delete from " + name + ";")
        .then(function() {
            console.log("Old data removed");
        }, function(err){
            console.log(err);
        });
    };

    return Players;

})(Object);

exports.Players = new Players();