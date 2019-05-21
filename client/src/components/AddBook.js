import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

/* queries */
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:"",
      genre:"",
      authorId: "",
    };

    this.submitForm = this.submitForm.bind(this);
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if(data.loading) {
      return ( <option>Loading Authors</option> );
    }else {
      return data.authors.map(author => {
        return ( <option key={author.id} value={author.id}>{author.name}</option> );
      });
    }
  };

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation();
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <header>
          <h4>Add Book Form</h4>
          <p>Submit your book, as you know</p>
        </header>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e)=>this.setState({name:e.target.value})} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e)=>this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={this.childOnChange.authorId}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>

    )
  }
}

/*
compose is a react-apollo method to combine several queires into one default export
*/
export default compose(
  graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"})
) (AddBook);