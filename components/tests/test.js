import { Component } from 'react';
import styles from './test.module.css';
import testData from './testData';
const axios = require('axios').default;


class Test extends Component {
  
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      userAnswer: "",
      currentIndex: 0,
      options: [],
      testEnd: false,
      score: 0,
      disabled: true,
      questions: testData,
      quizID: props.id
    }

    this.handleChange = this.handleChange.bind(this);
    this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
  }

  loadTest = () => {
    const {currentIndex} = this.state;
    const {questions} = this.state; 
    this.setState(() => {
      return {
        question: questions[currentIndex].question,
        options: questions[currentIndex].options,
        answer: questions[currentIndex].answer
      }
    })
  }

  nextQuestionHandler = (e) => {
    e.preventDefault();

    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer){
      this.setState ({
        score: score + 1
      })
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: ''
    })
  }

  componentDidMount() {
    axios.get("/api/tests/" + this.state.quizID)
    .then(response => {
      this.setState({ 
        tests: response.data
      });
      this.setState({questions: response.data.questions});
      console.log(this.state.questions);
      this.loadTest();
    })
    .catch(function (error){
      console.log(error);
      this.loadTest();
    })
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const{currentIndex} = this.state;
    const {questions} = this.state; 

    if(this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          // disabled: true,
          question: questions[currentIndex].question,
          options: questions[currentIndex].options,
          answer: questions[currentIndex].answer
        }
      })
    }
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  finishHandler = () => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer){
      this.setState({
        score: score + 1
    })
    }

    if(this.state.currentIndex === this.state.questions.length - 1){
      this.setState({
        testEnd: true
      })
    }
  }

  render() {
    // console.log(this.state);
    const{question, options, currentIndex, userAnswer, testEnd} = this.state

      if (testEnd) {
        return (
          <div>
            <h1>Your Final Score is {this.state.score}</h1>
            <p>The correct answers are:</p>
            <ul className={styles.ul}>
              {this.state.questions.map((item, index) => (
                <li
                key={index}>
                  Question {index + 1}.&nbsp;&nbsp;&nbsp; {item.question}
                  <br></br>
                  <br></br>
                  Answer: {item.answer}
                  <br></br> 
                  <br></br>
                  <br></br>
                </li>
              ))}
            </ul>
            <button 
            className = {styles.button}
            onClick={(e) => {
              e.preventDefault();
              window.location.href='./tests'
            }}>
              Return to Tests 
            </button>
          </div>
        )
      }

      return  ( 
        // console.log(this.state),  
      <>
        <div className={styles.div}>
          <h2>{question}</h2>
          <span>{`Question ${currentIndex + 1} of ${this.state.questions.length}`}</span>
          <br></br>
          <br></br>
          { options == null &&
            <input className={styles.text} 
            type="text"
            value={this.state.userAnswer}
            onChange={e => this.handleChange(e, "userAnswer")}
            />
          }

          { options != null &&
            options.map((option, index) =>
              <p key = {index} 
              onClick = {(e) => {this.checkAnswer(option);}}
              className={`options ${userAnswer === option? "selected" : null}`}
              >
                  {option}
              </p>
            )
          }
          <br></br>
          <br></br>
          
          {currentIndex < this.state.questions.length - 1 && 
          <button className={styles.button} 
          onClick={this.nextQuestionHandler}>
            Next Question
          </button>}
            
          {currentIndex === this.state.questions.length - 1 && 
          <button className={styles.button} 
          onClick={this.finishHandler}>
            Finish
          </button>}
        </div>

      <style jsx>{`
        .selected {
          background: #333 !important;
        }

        .options {
          padding: 8px;
          border: 1px solid #000;
          border-radius: 4px;
          cursor: pointer;
          background-color: #666;
          color: white;
          font-weight: bold;
        }
        `}</style>
      </>
      )
      
  }
}

export default Test;