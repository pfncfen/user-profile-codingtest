// db.js
const mysql = require('mysql');
const dbConfig = require('./db.config');

module.exports = {
  query: (sql, params, callback) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
      if (err) {
        throw err;
      }
      connection.query(sql, params, function (errConnection, results, fields) {
        if (errConnection) {
          throw errConnection;
        }
        if (callback) {
          callback(JSON.parse(JSON.stringify(results)), fields ? JSON.parse(JSON.stringify(fields)) : null);
        }
        connection.end(function (errEnd) {
          if (errEnd) {
            throw errEnd;
          }
        });
      });
    });
  },
};
