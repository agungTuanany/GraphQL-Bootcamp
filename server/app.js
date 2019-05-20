const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI , { useNewUrlParser: true  });
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

// connect to mlab databse
// make sure to replace my db string and creds with your own

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true

}));

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
  console.log(`now listening for request on port ${PORT}`);
});
