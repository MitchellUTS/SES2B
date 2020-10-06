import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this); 
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <div className={"CreateTest", styles.container}>
                <form>
                    <h3>
                        Test ID:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </h3>
                </form>
                <form>
                    <h3>
                        Test Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </h3>
                </form>
            
                <h3>Test Subject:</h3>
                <select>
                    <option selected value> Arithmetic </option>
                    <option> Algebra </option>
                    <option> Geometry </option> 
                    <option> Trigonometry </option>
                </select>

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