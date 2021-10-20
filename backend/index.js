const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


// database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});


// check database connection
db.connect(function(err){
    if (err) throw err;

    //console.log('Database connected ...');
    
    // CREATE TABLE USERS
    /* var sql = "CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, fullname VARCHAR(100), email VARCHAR(100), mobile VARCHAR(100))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    }); */

    // GET ALL USERS
    /* db.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        console.log(results);
    }) */

    // GET SINGLE USER
    /* var id = '3';
    var sql = 'SELECT * FROM users WHERE id = ' + mysql.escape(id);
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    }); */

    //ADD NEW USER
    /* var sql = "INSERT INTO users (fullname, email, mobile) VALUES ('Salva Kirr', 'abc@abc.com', 852)";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    }); */
})
  
// get all data
app.get('/users', function(req, res){
    let sql = 'SELECT * FROM users';
    db.query(sql, function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    })
})

//get single data
app.get('/user/:id', function(req, res){
    let user_id = req.params.id;
    var sql = 'SELECT * FROM users WHERE id = ' + mysql.escape(user_id);

    db.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length <= 0) return res.send({message: 'data not found'})
        return res.send({ error: false, data: results, message: 'users list.' });
    });
})

//create data
app.post('/user', function(req, res) {
    //console.log(req.body, 'create data')
    /* var fullname = req.body.fullname;
    var email = req.body.email;
    var mobile = req.body.mobile; */
    var user = req.body;
    //var sql = 'INSERT INTO users (fullname, email, mobile) VALUES ('${fullname}', '${email}', '${mobile}')';
    var sql = 'INSERT INTO users  SET ?';
    db.query(sql, user, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

// Update single data
app.put('/user/:id', function(req, res) {
    var id = req.params.id;
    var fullname = req.body.fullname
    var email = req.body.email
    var mobile = req.body.mobile
    
    var sql = "UPDATE users SET fullname = ?, email = ?, mobile = ? WHERE id = ?"

    db.query({
        sql:sql,
        timeout:5000,
        values:[fullname, email, mobile, id],
        }, function(error, results, fields){
            if (error) throw error;
            console.log('changed ' + results.changedRows + ' rows');
            res.send({message:'data updated'})
        }
    )

})

// Delete single data
app.delete('/user/:id', function(req, res) {
    var id = req.params.id;
    var sql = 'DELETE FROM users WHERE id = ' + mysql.escape(id);

    db.query(sql, function(error, results){
        if (error) throw error;
        console.log("Number of records deleted: " + results.affectedRows);
        return res.send({message:'Data deleted'});
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

