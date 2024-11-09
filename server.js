const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Sowmiya@2016', // Replace with your MySQL password
    database: 'employee_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/employees', (req, res) => {
    const { name, position, department, salary } = req.body;
    db.query(
        'INSERT INTO employees (name, position, department, salary) VALUES (?, ?, ?, ?)',
        [name, position, department, salary],
        (err, results) => {
            if (err) throw err;
            res.send({ message: 'Employee added successfully', employeeId: results.insertId });
        }
    );
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
