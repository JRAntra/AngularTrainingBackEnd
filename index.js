const express = require('express');
const morgan = require('moment');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);


// in the terminal: export NODE_ENV=development
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});