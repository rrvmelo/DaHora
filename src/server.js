const express = require('express');
const app = express();
const routes = require('./routes');
const authMiddleware = require('./middlewares/auth');
require('./database');

app.use(express.json());
app.use(routes);



app.use(authMiddleware);

app.listen(4200, () => {
    console.log(`Express started at http://localhost:4200`)
});