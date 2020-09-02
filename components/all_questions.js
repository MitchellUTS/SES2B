import { Component } from 'react';
import styles from './all_questions.module.css';
const axios = require('axios').default;


class All_questions extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  componentDidMount() {
    axios.get("/api/questions")
    .then(response => {
      this.setState({ 
        questions: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    })
  }

  deleteBackground(e){
    e.target.style.background = 'red';
  }

  defaultBackground(e){
    e.target.style.background = '#333';
  }

  onHandleDelete = id => {
    axios.delete('/api/questions/' + id)
    .then(response => {
      //Returning <empty string>
      console.log(response.data)
      // this.setState({questions: response.data})
    })
    // .then(() => {
    //     return axios.get('/api/questions')
    // })
    // .then(response => {
    //   const questions = response.data;
    //   this.setState({ questions });
    //   console.log(response);
    // })
    .catch(function (error) {
      console.log(error);
    });
  } 

  render() {
    // console.log(this.state);
    const contents = this.state.questions.map((item) => {
      return( 
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.question}</td>
          <td>
            <button type="button"
              className={styles.button}>Detail</button>
            &nbsp;&nbsp;&nbsp;  
            <button type="button" 
              onClick={ () => this.onHandleDelete(item.id)}
              onMouseOver={this.deleteBackground}
              onMouseLeave={this.defaultBackground}
              className={styles.button}>Delete</button>
          </td>
        </tr>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <div>
            <table className={styles.table}>
              <thead>  
                <tr>
                  <th>ID</th>
                  <th>Questions</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
               {contents}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default All_questions;