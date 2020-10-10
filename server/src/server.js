const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const Fetch = require('./api/Fetch');
const GraphQL = require('./api/GraphQL');

const app = express();

/* 
    For security reasons
    Removes X-Powered-by: Express header
    Add/mask other header properties 
*/
app.use(helmet());
app.use(morgan('dev'));

// CORS policy
app.use(cors({
    //only frontend can access backend
    origin: process.env.CORS_ORIGIN
}));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());

/* == Routing == */
app.use('/fetch', Fetch);
app.use('/graphql', GraphQL);

/* == Listen == */
console.log(process.env.PORT);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port: ${ port }`);
});
