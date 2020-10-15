import { Component } from "react";
import styles from "./details.module.css";
import QuestionsForm from "./QuestionsForm";

const axios = require("axios").default;

class All_questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testID: props.id,
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
      .get("/api/tests/" + this.state.testID)
      .then((response) => {
        console.log("responded!!!!");
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
      .put("/api/tests/" + this.state.testID, {
        name: this.state.results.name,
        numberOfQuestions: this.state.results.numberOfQuestions,
        questions: this.state.results.questions,
      })
      .then((response) => {
        console.log("Success?");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const testID = this.state.testID;
    const results = this.state.results.name;
    return (
      <div className={styles.input}>
        <h1>
          {this.state.results.name} ({this.state.results._id})
        </h1>
        <form>
          <div>
            <label>
              <h2>Name:</h2>
              <input
                style={{ width: "370px" }}
                type="text"
                name="name"
                value={this.state.results.name}
                onChange={this.onChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h2>Number of Questions:</h2>
              <input
                style={{ width: "370px" }}
                type="number"
                name="numberOfQuestions"
                value={this.state.results.numberOfQuestions}
                onChange={this.onChange}
              />
            </label>
          </div>
          <h2>Pool of Questions:</h2>
          <QuestionsForm
            questions={this.state.results.questions}
            updateQuestion={this.updateQuestion}
          />
          <input type="submit" value="Save" onClick={this.updateTest} />
        </form>
      </div>
    );
  }
}

export default All_questions;
