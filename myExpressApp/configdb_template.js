var mysql = require('mysql');
/// Create connection to MySQL database server.
function getMySQLConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : '',
        password : '',
        database : 'TrackSecAPI',
        multipleStatements: true
    });
}
 
module.exports = {
    getMySQLConnection,
};