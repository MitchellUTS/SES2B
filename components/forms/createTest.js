import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            id: '',
            name: '',
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.onHandleCreate = this.onHandleCreate.bind(this);     
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChangeText(e, field) {
        this.setState({
          [field]: e.target.value
        });
      }

    onHandleCreate(e){
        console.log(this.state.id);
        e.preventDefault();
        if(this.state.name === ""){
            alert("Please fill in the fields!")
        } else {
            axios.post("/api/tests/" , {
                name: this.state.name,
                // description: this.state.description,
              })
                .then(function (response) {
                  const countid = response.data.length;
                  console.log(response.data); 
                }
                )
                .catch(function (error) {
                  console.log(error);
                });
                
              this.setState({
                name: '',
                description: '',
              });
              alert("Test has successfully been created!")
        }
      } 

    render() {
        return (
            <div className={"CreateTest", styles.container}>
                <form onSubmit={this.onHandleCreate}>
                    <div>
                        <h3>Test Name</h3>
                                <input type="text" 
                                className={styles.text}
                                name="Name"
                                value={this.state.Name} 
                                onChange={e => this.handleChangeText(e, "name")}/>
                        </div>

                        <h3>Test Subject</h3>
                        <select>
                            <option selected value> Arithmetic </option>
                            <option> Algebra </option>
                            <option> Geometry </option> 
                            <option> Trigonometry </option>
                        </select>

                        <h3>Test Description</h3>
                        <textarea 
                        value={this.state.textAreaValue}
                        className={styles.textarea}
                        onChange={e => this.handleChangeText(e, "description")}
                        rows={5}
                        cols={80}> 
                            this test will have x number questions 
                        </textarea>
                        <div>
                            <br/>   
                            <button className={styles.button}>Submit</button>
                    </div> 
                </form>
            </div>
        );
    }


}

export default CreateTest;