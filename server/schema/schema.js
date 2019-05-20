const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name:'Book',
  // wrap inside a function cause is kind like catch 212, not executing this
  // function untill sort point, after all the file or functuon inside this file is run
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return _.find(authors, {id:parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, {authorId: parent.id})
      }
    }
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
        //return _.find(books,{id:args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id:args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
