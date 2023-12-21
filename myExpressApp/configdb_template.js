 
var mysql = require('mysql');
/// Create connection to MySQL database server.
function getMySQLConnection() {
        host     : 'localhost',
        user     : 'USER',
        password : 'PASSWORD',
        database : 'TrackSecAPI',
        multipleStatements: true
    });
}

module.exports = {
    getMySQLConnection,
};
