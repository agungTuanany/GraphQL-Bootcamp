import React, { Component } from 'react';
import { graphql } from 'react-apollo';

/* queries */
import { getBooksQuery } from '../queries/queries';

/* Components */
import BookDetails from './BookDetails';

class Booklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayBooks() {
    const data = this.props.data;
    if(data.loading) {
      return (<div>Loading books..</div>);
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={(e) =>{this.setState({selected:book.id})}}>{ book.name }</li>
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
      <BookDetails bookId={this.state.selected}/>
    </div>
  );
  }
}

export default graphql(getBooksQuery)(Booklist);
