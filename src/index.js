/**
 * Imports
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

/**
 * Api setup
 */
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({
        Info: 'This is a simple project to consume API Brasil.io',
        Author: 'chicofariasneto',
        Port: `APP running on port ${port}.`
    });
});

require('./app/controller/index')(app);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});