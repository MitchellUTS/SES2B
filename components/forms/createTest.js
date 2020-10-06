import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""};
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
                        <input type="text"
                        name="ID" 
                        value={this.state.ID} 
                        onChange={this.handleChange}/>
                   </h3>
                   <h3>
                        Test Name:
                        <input type="text" 
                        name="Name"
                        value={this.state.Name} 
                        onChange={this.handleChange}/>
                    </h3>
                </form>
            
                <h3>Test Subject:

                <select>
                    <option selected value> Arithmetic </option>
                    <option> Algebra </option>
                    <option> Geometry </option> 
                    <option> Trigonometry </option>
                </select>
                </h3>

                <h3>Test Description:</h3>
                <textarea 
                value={this.state.textAreaValue}
                onChange={this.handleChange}
                rows={5}
                cols={80}> 
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