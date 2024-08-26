const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }

    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long.');
    }

    // If validation passes
    res.send('Signup successful!');
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
