const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const Fetch = require('./api/Fetch');
const graphQLCustomScheme = require('./model/GraphQL');

const app = express();

/* 
    For security reasons
    Removes X-Powered-by: Express header
    Add/mask other header properties 
*/
// CPS needs to be set in order to prevent loading playground stuck window: https://github.com/graphql/graphql-playground/issues/1283
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(morgan('dev'));

// CORS policy;
app.use(cors({
    //only frontend can access backend
    origin: process.env.CORS_ORIGIN
}));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());

/* == Routing == */
app.use('/fetch', Fetch);
app.use('/graphql', graphqlHTTP({
    schema: graphQLCustomScheme,
    graphiql: true
}));

/* == Listen == */
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port: ${ port }`);
});
