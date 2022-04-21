const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    connectionLimit: 3,
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const connectionPool = mysql.createPool(config);

app.get("/", (req, res) => {
    let template = "<h1>Full cycle rocks!</h1><hr>"
    connectionPool.getConnection(function(err, connection) {
        const sql = `INSERT INTO people(name) values('Paulo')`
        connection.connect()
        connection.query(sql)
        connection.release()
    });

    connectionPool.getConnection(function(err, connection) {
        connection.query('SELECT `name` FROM `people`', function (error, results) {
            if (error) {
                console.log(error);
            }
            let i = results.length
            results.forEach(element => {
                template += `<p>#${i}: ${element.name}</p>`
                i -= 1;
            });
            connection.release()
            res.send(template);
        });
    })
})

app.listen(port, () => {
    console.log("Running app");
})