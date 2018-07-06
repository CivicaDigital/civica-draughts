const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username + '2'}));
app.listen(11011, () => console.log('Listening on port 11011!'));
