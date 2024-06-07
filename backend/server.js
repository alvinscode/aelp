const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const port = 5000;
const secretKey = 'secret_key'

app.use(cors());
app.use(bodyParser.json());

// User registration

app.post('/register', (req, res) => {
    const { email,  password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email, hashedPassword, (err) => {
        if (err) {
            return res.status(500).json({ error: 'User already exists' });
        }
        res.status(200).json({ message: 'User registered successfully' });
    });
    stmt.finalize();
})

// User login

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err || !row) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, row.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: row.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});