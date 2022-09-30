const express = require('express');
/*const morgan = require('morgan');*/
/*const bodyParser = require('body-parser');*/
const routes = require('./routes');

const app = express();

/*app.use(morgan('dev'));*/
/*app.use(bodyParser.urlencoded({extended: false}));*/
app.use(express.json());
app.use(routes);


app.listen(4200, () => {
    console.log(`Express started at http://localhost:4200`)
});