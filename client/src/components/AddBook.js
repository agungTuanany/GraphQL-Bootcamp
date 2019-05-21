import React, { Component } from 'react';
import { graphql } from 'react-apollo';

/* queries */
import { getAuthorsQuery } from '../queries/queries';

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
    const data = this.props.data;
    if(data.loading) {
      return ( <option>Loading Authors</option> );
    }else {
      return data.authors.map(author => {
        return ( <option key={author.id} value={author.id}>{author.name}</option> );
      });
    }
  };

  childOnChange(e) {
    this.setState({
      name: e.target.value,
      genre: e.target.value,
      authorId: e.target.value
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
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

export default graphql(getAuthorsQuery) (AddBook);
