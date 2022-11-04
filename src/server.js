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

app.listen(3000, () => {
    console.log(`Express started at http://localhost:3000`)
});