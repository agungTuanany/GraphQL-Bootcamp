import React, { Component } from 'react';
import { graphql } from 'react-apollo';

/* queries */
import { getBooksQuery } from '../queries/queries';

/* Components */
import BookDetails from './BookDetails';

class Booklist extends Component {

  displayBooks() {
    const data = this.props.data;
    if(data.loading) {
      return (<div>Loading books..</div>);
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{ book.name }</li>
        )
      })
    }
  }

  render() {
    console.log(this.props)
  return (
    <div className="bookList">
      <ul id="book-list">
        { this.displayBooks() }
      </ul>
      <BookDetails />
    </div>
  );
  }
}

export default graphql(getBooksQuery)(Booklist);
