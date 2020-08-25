import { Component } from 'react';
import styles from './modify.module.css';
const axios = require('axios').default;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      question: '',
      answer: '',
      level: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);

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

  onHandleUpdate(e){
    console.log(this.state.id);
    e.preventDefault();
    axios.post("/api/questions/" , {
      id: '4',
      question: this.state.question,
      answer: this.state.answer,
      level: this.state.level
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
      id: '',
      question: '',
      answer: '',
      level: 0,
    });
  } 

  render() {
    console.log(this.state);
    return (
      <div className={styles.container}>
        <form onSubmit={this.onHandleUpdate}>
          {/* <div>
            <h3>Question ID</h3>
            <input className={styles.text} type="text" value={this.state.id} onChange={e => this.handleChange(e, "id")}/>
          </div> */}
          <div>
            <h3>Question</h3>
            <textarea className={styles.textarea} type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
          </div>
          <div>
            <h3>Answer</h3>
            <input className={styles.text} type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
          </div>
          <div> 
            <h3>Level</h3>
            <div>
              <label>
                <input type="radio" value={1} checked={this.state.level === 1} onChange={this.handlOptionChange}/>
                1
              </label>
              <label>
                <input type="radio" value={2} checked={this.state.level === 2} onChange={this.handlOptionChange}/>
                2
              </label>
              <label>
                <input type="radio" value={3} checked={this.state.level === 3} onChange={this.handlOptionChange}/>
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

export default Create;
