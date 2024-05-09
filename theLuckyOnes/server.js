const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})