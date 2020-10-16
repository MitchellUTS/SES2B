import { Component } from 'react';
import styles from './test.module.css';
import resultStyles from './results.module.css'
import Link from 'next/link';

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
      disabled: true,
      questions: [],
      quizID: props.id,
      failedToLoadData: false,
      viewAnswer: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
    this.finishHandler = this.finishHandler.bind(this);
  }

  loadTest = () => {
    const {currentIndex} = this.state;
    const {questions} = this.state; 
    if (questions.length == 0) {
      alert("Error, empty test.");
      return {};
    }
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
    const errHandling = (error) =>{
      console.log(error);
      this.setState({failedToLoadData: true});
    }
    errHandling.bind(this);

    axios.get("/api/tests/" + this.state.quizID)
    .then(response => {
      this.setState({ 
        tests: response.data
      });
      this.setState({questions: response.data.questions});
      // console.log(this.state.questions);
      this.loadTest();
    })
    .catch(errHandling)
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

  viewAnswerHandler = () => {
    if (!this.state.viewAnswer) {
      this.setState({ viewAnswer: true })
    }
    else {
      this.setState({ viewAnswer: false })
    }
  }

  render() {
    // console.log(this.state);
    const{question, options, currentIndex, userAnswer, testEnd, viewAnswer} = this.state
    const { failedToLoadData } = this.state;

    if (failedToLoadData) {
      return (
        <div>
          <h1>Failed to load test. Please <Link href="/api/auth/login"><a>log in</a></Link> to continue</h1>
        </div>
      )
    }

    if (testEnd && !viewAnswer) {
      return (
        <div className={resultStyles.container}>
               <div className={resultStyles.aligntext}>
                    <h1>Final Results</h1>
                   <h2>{this.state.score} / {this.state.questions.length}</h2>
              </div>
              <div className={resultStyles.center}>
                  <button className={resultStyles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='./tests'
                  }}>Begin New Test</button>
                <button className={resultStyles.button} onClick={this.viewAnswerHandler}>View Answers</button>
            </div>
        </div>
      )
    }

    if (viewAnswer) {
      return (
        <div className={resultStyles.container}>
          <h1>Correct Answers</h1>
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
          <button className={styles.button} onClick={this.viewAnswerHandler}>Back</button>
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