const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
// allow cros-origin request
app.use(cors());

// connect to mlab databse
// make sure to replace my db string and creds with your own
mongoose.connect(keys.mongoURI , { useNewUrlParser: true  });
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true

}));

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
  console.log(`now listening for request on port ${PORT}`);
});
