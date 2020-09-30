import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      question: '',
      answer: '',
      level: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);
    this.onHandleCheck = this.onHandleCheck.bind(this);

  }
  
  handlOptionChange = changeEvent => {
    this.setState({
      level: parseInt(changeEvent.target.value)
    });
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  onHandleCheck(e){
    // console.log(this.state.id);
    e.preventDefault();
    axios.get("/api/questions/" + this.state.id)
    .then((response) =>
    this.setState({
      question: response.data.question,
      answer: response.data.answer,
      level: response.data.level
    }),
    )
    .catch(function (error) {
      console.log(error);
    });
  } 

  onHandleUpdate(e){
    console.log(this.state.id);
    e.preventDefault();
    axios.put("/api/questions/" + this.state.id, {
      question: this.state.question,
      answer: this.state.answer,
      level: this.state.level
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    this.setState({
      id: '',
      question: '',
      answer: '',
      level: 0,
    });
  } 

  render() {
    const{selectValue} = this.state
    // console.log(this.state);
    return (
      <div className={styles.container}>
        <form onSubmit={this.onHandleUpdate}>
          <div>
            <h3>Question ID</h3>
            <input className={styles.text} type="text" value={this.state.id} onChange={e => this.handleChange(e, "id")}/>
            <button className={styles.button} onClick={this.onHandleCheck}>Check</button>
          </div>
          <div>
            <h3>Type</h3>
            <select 
            className={styles.dropdown}
            value={this.state.selectValue}
            onChange={ e => this.handleChange(e, "selectValue")}>
              <option value = "sa">Short Answer</option>
              <option value = "mc">Multiple Choice</option>
            </select>
          </div>
          <div>
            <h3>Question</h3>
            <textarea className={styles.textarea} type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
          </div>
          
          { selectValue == "mc" &&
            <div>
              <h3>Options</h3>
              <input className={styles.text} type="text" value={this.state.options} onChange={e => this.handleChange(e, "option")}/>
              <button type ="button" onClick={this.addOption} className={styles.button}>Add Option</button>
              &nbsp;&nbsp;&nbsp; 
              <button type ="button" className={styles.button}>Remove Option</button>
              <h3>Answer</h3>
              <input className={styles.text} type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
            </div>
          }

          { selectValue == "sa" &&
          <div>
            <h3>Answer</h3>
            <input className={styles.text} type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
          </div>
          }

          <div> 
            <h3>Level</h3>
            <div>
              <label>
                <input type="radio" value={1} checked={this.state.level == 1} onChange={this.handlOptionChange}/>
                1
              </label>
              <label>
                <input type="radio" value={2} checked={this.state.level == 2} onChange={this.handlOptionChange}/>
                2
              </label>
              <label>
                <input type="radio" value={3} checked={this.state.level == 3} onChange={this.handlOptionChange}/>
                3
              </label>
            </div>
          </div>
          <br/>
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    )
  };
};

export default Modify;
