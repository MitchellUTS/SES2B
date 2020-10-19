import { Component } from "react";
import styles from "./details.module.css";
import QuestionsForm from "./QuestionsForm";

const axios = require("axios").default;

class All_questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {
        numberOfQuestions: 0,
        _id: "",
        name: "",
        questions: [],
      },
    };
  }

  componentDidMount() {
    axios
      .get("/api/tests/" + this.props.id)
      .then((response) => {
        this.setState({
          results: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange = (e) => {
    const newState = this.state;
    if (e.target.name === "name") {
      newState.results.name = e.target.value;
    }
    if (e.target.name === "numberOfQuestions") {
      newState.results.numberOfQuestions = e.target.value;
    }
    this.setState(newState);
  };

  addBackground(e) {
    e.target.style.background = "green";
  }

  deleteBackground(e) {
    e.target.style.background = "red";
  }

  defaultBackground(e) {
    e.target.style.background = "#333";
  }

  updateQuestion = (newQuestion) => {
    const newState = this.state;
    for (let i = 0; i < newState.results.questions.length; i++) {
      if (newState.results.questions[i]._id === newQuestion._id) {
        newState.results.questions[i] = newQuestion;
      }
    }
    this.setState(newState);
  };

  updateTest = () => {
    axios
      .put("/api/tests/" + this.props.id, this.state.results)
      .then((response) => {
        console.log(response);
        axios
          .get("/api/tests/" + this.props.id)
          .then((response) => {
            this.setState({
              results: response.data,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteQuestion = (q) => {
    const newState = this.state;
    newState.results.questions = this.state.results.questions.filter(
      (question) => question !== q
    );
    this.setState(newState);
  };

  addNewQuestion = (e) => {
    e.preventDefault();
    const newState = this.state;
    newState.results.questions = [
      {
        question: "",
        answer: "",
        level: 1,
      },
      ...newState.results.questions,
    ];
    this.updateTest();
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>
          {this.state.results.name} ({this.state.results._id})
        </h1>
        <form>
          <div>
            <label>
              <h2>Name</h2>
              <input
                style={{ width: "370px" }}
                type="text"
                name="name"
                className={styles.text}
                value={this.state.results.name}
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h2>Number of Questions</h2>
              <input
                style={{ width: "370px" }}
                type="number"
                name="numberOfQuestions"
                className={styles.text}
                value={this.state.results.numberOfQuestions}
                onChange={this.onChange}
              />
            </label>
          </div>
          <h2>Pool of Questions</h2>
          <button
            className = {styles.button}
            onClick={this.addNewQuestion}
            onMouseOver={this.addBackground}
            onMouseLeave={this.defaultBackground}
          >
            Add New Question +
          </button>
          <QuestionsForm
            questions={this.state.results.questions}
            updateQuestion={this.updateQuestion}
            delete={this.deleteQuestion}
          />
          <br />
          <br />
          { this.state.numberOfQuestions !== 0 &&
          <input 
          type="submit" 
          value="Save" 
          className = {styles.button}
          onClick={this.updateTest} />
          }
        </form>
      </div>
    );
  }
}

export default All_questions;
