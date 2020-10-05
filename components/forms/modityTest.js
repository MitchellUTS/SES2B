import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class Modify extends Component {
  render() {
      return (
          <div classname="ModifyTest">
              <h3>Test Title</h3>
              <textarea>Input Test Title</textarea>
              <button className={styles.button} onClick={this.onHandleCheck}>Check</button>
              <h3>Test Subject</h3>
              <textarea>Modify Test subject</textarea>
              <h3>Test Description</h3>
              <textarea>Modity Test Description</textarea>

              <div>
                  <button>Submit</button>
              </div>
          </div>
    
      );
  }
}

  export default ModifyTest;