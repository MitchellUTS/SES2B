import React, { Component } from "react";
import styles from "./details.module.css";
import PropTypes from "prop-types";

export class QuestionForm extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    const newQuestion = this.props.question;
    if (e.target.name === "question") {
      newQuestion.question = e.target.value;
      this.props.updateQuestion(newQuestion);
    }
    if (e.target.name === "answer") {
      newQuestion.answer = e.target.value;
      this.props.updateQuestion(newQuestion);
    }
    if (e.target.name === "level") {
      newQuestion.level = e.target.value;
      this.props.updateQuestion(newQuestion);
    }
  };

  deleteBackground(e) {
    e.target.style.background = "red";
  }

  defaultBackground(e) {
    e.target.style.background = "#333";
  }

  delete = (e) => {
    e.preventDefault();
    this.props.delete(this.props.question);
  };

  render() {
    return (
      <div>
        <p>
          <label>
            Question{" "}
            <input
              // style={{ width: "370px" }}
              className={styles.text}
              type="text"
              name="question"
              value={this.props.question.question}
              onChange={this.onChange}
            />
          </label>
          <br />
          <label>
            Answer{" "}
            <input
              // style={{ width: "370px" }}
              className={styles.text}
              type="text"
              name="answer"
              value={this.props.question.answer}
              onChange={this.onChange}
            />
          </label>
          <br />
          <label>
            Level{" "}
            <input
              // style={{ width: "370px" }}
              className={styles.text}
              type="number"
              name="level"
              value={this.props.question.level}
              onChange={this.onChange}
            />
          </label>
          <br />
          <br />
          <button 
          onClick={this.delete}
          className={styles.button}
          onMouseOver={this.deleteBackground}
          onMouseLeave={this.defaultBackground}
          >
            Delete
          </button>
        </p>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default QuestionForm;
