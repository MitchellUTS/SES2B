import { Component } from 'react';
import Link from 'next/link';
import styles from './selectTests.module.css';
const axios = require('axios').default;


class SelectTests extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tests: []
    }
    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  componentDidMount() {
    axios.get("/api/tests")
    .then(response => {
      this.setState({ 
        tests: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    })
  }

  // deleteBackground(e){
  //   e.target.style.background = 'red';
  // }

  defaultBackground(e){
    e.target.style.background = '#333';
  }

  onHandleDelete = id => {
    axios.delete('/api/tests/' + id)
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
    const contents = this.state.tests.map((item) => {
      return( 
        <tr>
          <td>{item.name}</td>
          <td>
            <Link href={'/tests/' + item._id}><a>
              <button type="button" className={styles.button}>Begin</button>
            </a></Link>
            

            <Link href='./test'><a>
              <button type="button"
              className={styles.button}>Details</button>
            </a></Link>
            
            <Link href='./test'><a>
              <button type="button"
              className={styles.button}>Edit</button>
            </a></Link>
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
                  <th>Test Topic</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mock Test</td>
                  <td>
                    <button type="button"
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href='./test'
                    }}
                    >Begin</button>

                    <button type="button"
                    className={styles.button}>Details</button>
                    
                    <button type="button"
                    className={styles.button}>Edit</button>      
                  </td>
                </tr>
                {contents}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <br/>
          <a href="/createtest">
          <button
          className={styles.button}
          >
              Create Test
          </button>
              </a>
        </div>
      </div>
    );
  }
}

export default SelectTests;