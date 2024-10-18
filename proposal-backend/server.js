const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests from your React frontend

let responses = []; // Array to store the responses

app.post('/respond', (req, res) => {
    const { answer } = req.body;
    if (answer === 'Yes' || answer === 'No') {
        responses.push(answer);
        return res.status(200).json({ message: 'Response recorded', response: answer });
    }
    return res.status(400).json({ message: 'Invalid response' });
});

app.get('/responses', (req, res) => {
    res.json(responses);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
