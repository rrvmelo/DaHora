const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')

require('./database');

app.use(express.json());

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", ["*"]);
    res.header("Access-Control-Allow-Headers",
        ["Origin", "X-Requested-With", "Authorization", "Content-Type", 'X-Custom-Header']);

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', ['PUT, POST, PATCH, DELETE, GET']);
        return res.status(200).send({});
    }
    
    app.use(cors());
    next();
})

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info(`Express started at http://localhost:${port}`)
});