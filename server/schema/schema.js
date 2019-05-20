const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
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

let authors = [
  {name: 'Patrick Rothfuss', age: 44, id:'1'},
  {name: 'Brandon Sanderson', age: 42, id: '2'},
  {name: 'Terry Pratchett', age: 66, id: '3'}
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
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
    },
    author: {
      type: AuthorType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id:args.id});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
