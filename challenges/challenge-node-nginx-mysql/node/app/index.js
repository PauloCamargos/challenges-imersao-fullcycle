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

function createTable() {
    connectionPool.getConnection(function(err, connection){
        const sql = `CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))`
        connection.query(sql)
        connection.release()
    })
}

function addPerson() {
    connectionPool.getConnection(function(err, connection) {
        const sql = `INSERT INTO people(name) values('Paulo')`
        connection.query(sql)
        connection.release()
    });
}

app.get("/", (req, res) => {
    let template = "<h1>Full cycle rocks!</h1><hr>"
    addPerson()
    connectionPool.getConnection(function(err, connection) {
        connection.query('SELECT name FROM people', function (error, results) {
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
    addPerson()
    createTable()
})