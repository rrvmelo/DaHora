const express = require('express');
const app = express();
const routes = require('./routes');
const { eAdmin } = require('./middlewares/auth');
require('./database');

app.use(express.json());
app.use(routes);

/*app.use(eAdmin);*/

app.listen(4200, () => {
    console.log(`Express started at http://localhost:4200`)
});