import { Component } from 'react';
import styles from './test.module.css';
import testData from './testData';
const axios = require('axios').default;


class Test extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: "",
      currentIndex: 0,
      options: [],
      testEnd: false,
      score: 0,
      disabled: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
  }

  loadTest = () => {
    const {currentIndex} = this.state;
    this.setState(() => {
      return {
        question: testData[currentIndex].question,
        options: testData[currentIndex].options,
        answer: testData[currentIndex].answer
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
    axios.get("/api/tests")
    .then(response => {
      this.setState({ 
        tests: response.data
      });
      console.log(response.data);
    })
    .catch(function (error){
      console.log(error);
    })

    this.loadTest();
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const{currentIndex} = this.state;
    if(this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          // disabled: true,
          question: testData[currentIndex].question,
          options: testData[currentIndex].options,
          answer: testData[currentIndex].answer
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

    if(this.state.currentIndex===testData.length - 1){
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
              {testData.map((item, index) => (
                <li
                key={index}>
                  Question {item.id + 1}.&nbsp;&nbsp;&nbsp; {item.question}
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
          <span>{`Question ${currentIndex + 1} of ${testData.length}`}</span>
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
          
          {currentIndex < testData.length - 1 && 
          <button className={styles.button} 
          onClick={this.nextQuestionHandler}>
            Next Question
          </button>}
            
          {currentIndex === testData.length - 1 && 
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