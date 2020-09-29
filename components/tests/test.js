import { Component } from 'react';
import styles from './test.module.css';
import testData from './testData'
const axios = require('axios').default;


class Test extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      testEnd: false,
      score: 0,
      disabled: true
    }
  }

  loadTest = () => {
    const {currentIndex} = this.state;
    this.setState(() => {
      return {
        question: testData[currentIndex].question,
        answer: testData[currentIndex].answer
      }
    })
  }

  nextQuestionHandler = () => {
    const {userAnswer, answer, score} = this.state

    if(userAnswer === answer){
      this.setState ({
        score: score + 1
      })
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null
    })
  }

  componentDidMount() {
    axios.get("/api/tests")
    .then(response => {
      this.setState({ 
        tests: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    })

    this.loadTest();
  }

  checkAnswer = answer => {
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
          question: testData[currentIndex].question,
          answer: testData[currentIndex].answer
        }
      })
    }
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
    this.checkAnswer(field)
  }

  finishHandler = () => {
    if(this.state.currentIndex ===
      testData.length -1) {
        this.setState({
          testEnd:true
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
            <p>The correct answers were</p>
            <ul>
              {testData.map((item, index) => (
                <li
                key={index}>
                  {item.question}
                  <br></br>
                  <br></br>
                  {item.answer}
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
        <div>
          <h2>{question}</h2>
          <span>{`Question ${currentIndex + 1} of ${testData.length}`}</span>
          {
            <input className={styles.text} 
            type="text"
            onChange={e => this.handleChange(e, "userAnswer")}
            />
          }

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
      )
  }
}

export default Test;