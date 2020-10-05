import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;


class CreateTest extends Component {
    render() {
        return (
            <div className="CreateTest">
                <h3>Test Title:</h3>
                <textarea>
                    Test number 1
                </textarea>

                <h3>Test Subject:</h3>
                <textarea>
                    Test subject 1
                </textarea>

                <h3>Test Description:</h3>
                <textarea>
                    this test will have x number questions 
                </textarea>

            <div>
            <button>SUBMIT</button>
                </div> 
            
            </div>
        );
    }


}

export default CreateTest;