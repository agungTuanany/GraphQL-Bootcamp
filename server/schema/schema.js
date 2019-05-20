const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = graphql;

/* DUMMY DATA */
let books = [
  {name:'Name of the wind', genre:'fantasy', id:'1'},
  {name:'The final Empire', genre:'fantasy', id:'2'},
  {name:'The Long Earth', genre:'Sci-Fi', id:'3'},
  {name:'Clean Code', genre:'Comp-Sience', id:'4'}
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // wrap without a function cause do not need an order
  fields: {
    book: {
      type: BookType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books,{id:args.id});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
