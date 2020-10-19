import Axios from "axios";
import React, { Component } from "react";
import styles from "./test.module.css";
import resultStyles from "./results.module.css";

export class userTest extends Component {
  state = {
    question: {
      _id: "",
      question: "",
      answer: "",
    },
    complete: false,
    result: {
      testResult: 0,
      numOfQuestionsAnswered: 0,
    },
  };

  async componentDidMount() {
    await Axios.get("/api/userTests/question/" + this.props.userTestID)
      .then((res) => {
        console.log(res.data);
        if (res.data === "Test is complete, no more questions") {
          this.setState({
            complete: true,
          });
        } else {
          this.setState({
            question: {
              _id: res.data._id,
              question: res.data.question,
              answer: "",
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(e) {
    const newState = this.state;
    newState.question.answer = e.target.value;
    this.setState(newState);
  }

  nextQuestionHandler = (e) => {
    e.preventDefault();
    Axios.post(
      "/api/userTests/question/" + this.props.userTestID,
      this.state.question
    ).then((res) => {
      this.componentDidMount();
    });
  };

  viewResult = (e) => {
    e.preventDefault();
    Axios.get("/api/userTests/" + this.props.userTestID).then((res) => {
      const newState = this.state;
      newState.result.testResult = res.data.testResult;
      newState.result.numOfQuestionsAnswered = res.data.numOfQuestionsAnswered;
      this.setState(newState);
    });
  };

  render() {
    if (!this.state.complete) {
      return (
        <div className={styles.div}>
          <h2>{this.state.question.question}</h2>
          <br />
          <br />
          <br />
          <input
            className={styles.text}
            type="text"
            value={this.state.userAnswer}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <button className={styles.button} onClick={this.nextQuestionHandler}>
            Next Question
          </button>
        </div>
      );
    }
    if (this.state.complete && this.state.result.testResult === 0) {
      return (
        <div className={styles.div}>
          <h2>Test is complete</h2>
          <br />
          <br />
          <br />
          <br />
          <br />
          <button className={styles.button} onClick={this.viewResult}>
            View result
          </button>
        </div>
      );
    }
    return (
      <div className={resultStyles.container}>
        <div className={resultStyles.aligntext}>
          <h1>Final Results</h1>
          <h2>Level {this.state.result.testResult}</h2>
        </div>
        <div className={resultStyles.center}>
          <button
            className={resultStyles.button}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            Begin New Test
          </button>
        </div>
      </div>
    );
  }
}

export default userTest;
