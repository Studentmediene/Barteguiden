var fs = require('fs');
var file = 'database.db';
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);


db.serialize(function() {
    if (!exists) {
        db.run('');
    }
});
