import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBoooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class Booklist extends Component {
  render() {
    console.log(this.props)
  return (
    <div className="bookList">
      <ul id="book-list">
        <li>Book List</li>
      </ul>
    </div>
  );
  }
}

export default graphql(getBoooksQuery)(Booklist);
