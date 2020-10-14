import { Component } from 'react';
import styles from './all_questions.module.css';
const axios = require('axios').default;


class All_questions extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      tests: []
    }
  }

  componentDidMount() {
    axios.get("/api/userTests")
    .then(response => {
      this.setState({ 
        results: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    })
  }

  render() {
    console.log(this.state);
    const contents = this.state.results.map((item) => {
      return(
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.userID}</td>
          <td>{item.testID}</td>
          <td>{item.testResult}</td>
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
                  <th>User (ID)</th>
                  <th>Test</th>
                  <th>Test Result (Level)</th>
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