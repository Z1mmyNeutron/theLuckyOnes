const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('server listening on port 4000')
})

app.get('/', (req, res) => {
    res.send('Hello from our server! Server is working but needs to be connected  to the rest of the file')
})
