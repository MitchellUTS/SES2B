import { Component } from 'react';
import styles from './details.module.css';
const axios = require('axios').default;


class All_questions extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      testID: props.id,
      results: {
        numberOfQuestions: 0,
        _id: "",
        name:"",
        questions:[]
      }
    }
  }

  componentDidMount() {
    axios.get("/api/tests/" + this.state.testID)
    .then(response => {
      console.log('responded!!!!');
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

    const testID = this.state.testID;
    const results = this.state.results.name;
    const questions = this.state.results.questions.map(question => {
      return(
        <div className={styles.input}>
          <p>
          <div>
          <label>
            Question:
            <input style={{width: "370px"}} type="text" name="numberOfQuestions" value={question.question}/>
          </label>
          </div>
          <div>
          <label>
            Answer:
            <input style={{width: "370px"}} type="text" name="numberOfQuestions" value={question.answer}/>
          </label>
          </div>
          <div>
          <label>
            level:
            <input style={{width: "370px"}} type="number" name="numberOfQuestions" value={question.level}/>
          </label>
          </div>
          </p>
        </div>
      )
    })
    return (
      <div className={styles.input}>
        <h1>{this.state.results.name}  ({this.state.results._id})</h1>
        <form>
          <div>
          <label>
            <h2>
            Name:
            </h2>
            <input style={{width: "370px"}} type="text" name="name" value={this.state.results.name}/>
          </label>
          </div>
          <div>
          <label>
            <h2>
            Number of Questions:
            </h2>
            <input style={{width: "370px"}} type="number" name="numberOfQuestions" value={this.state.results.numberOfQuestions}/>
          </label>
          </div>
          <h2>
            Pool of Questions:
          </h2>
          {questions}
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default All_questions;