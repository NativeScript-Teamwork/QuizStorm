var constantsModule = require("nativescript-sqlite");

var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        _super.call(this);
    }
    
    
    Question.prototype.addQuestion = function (id, questionContent, answerA, answerB, answerC, answerD, correctAnswer, hint) {
        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", [id, questionContent, answerA, answerB, answerC, answerD, correctAnswer, hint])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });
    };
    
    Question.prototype.getAllQuestions = function () {
        return global.db.all("select * from Question;")
        .then(function(resultSet) {
            console.log("result is: ", resultSet);
            return resultSet;
        }, function(err){
            console.log(err);
        });
    };

    Question.prototype.dropScoreTable = function (name) {
        return global.db.all("drop table " + name + ";")
        .then(function() {
            console.log("Dropped " + name);
        }, function(err){
            console.log(err);
        });
    };
    
    Question.prototype.deleteDataFromTable = function (name) {
        return global.db.all("delete from " + name + ";")
        .then(function() {
            console.log("Old data removed");
        }, function(err){
            console.log(err);
        });
    };

    Question.prototype.seedQuestions = function () {
        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [0, "In the summer of 2015 Microsoft released new Windows, what is the name of this Windows?", "Windows 7", "Windows 10", "Windows Vista", "Windows 8.1", "Windows 10", "It also has free upgrade from older versions"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });

        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [1, "What is Google Canary?", "Software used to show geographical information about planet Earth", "The headquarters of Google Inc.", "A canary that google feeds everyday to bring them luck", "An earlier version of the newest  Google Chrome used by programmers for testing", "An earlier version of the newest  Google Chrome used by programmers for testing", "It's more likely a software developer to use it"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });

        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [2, "Which ASP.NET version was released with Visual Studio 2013?", "4.6", "4.0", "4.5", "4.5.1", "4.5.1", "In 2015 4.6 was released so it must be close"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });

        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [3, "What is the name of the most popular smartphone operating system for 2015?", "iOS", "Android", "Symbian", "Windows phone", "Android", "Usually the logo is green"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });

        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [4, "What is the name of the newest android version?  It was released in 2015?", "Lollipop", "Cupcake", "Jelly Bean", "Marshmallow", "Marshmallow", "It is also known as Marshies"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });

        global.db.execSQL("insert into Question values (?, ?, ?, ?, ?, ?, ?, ?)", 
            [5, "When was Telerik founded?", "2005", "2002", "1998", "2000", "2002", "It was founded in 21th centure, but which year?"])
        .then(function(id){
            console.log("inserted:", id);
        }, function(err){
            console.log(err);
        });
    };    

    return Question;

})(Object);

exports.Question = new Question();