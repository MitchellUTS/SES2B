import React, { Component } from "react";
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
      this.props.updateQuestion(this, newQuestion);
    }
    if (e.target.name === "level") {
      newQuestion.level = e.target.value;
      this.props.updateQuestion(this, newQuestion);
    }
  };

  render() {
    return (
      <div>
        <p>
            <label>
              Question:{" "}
              <input
                style={{ width: "370px" }}
                type="text"
                name="question"
                value={this.props.question.question}
                onChange={this.onChange}
              />
            </label>
            <br />
            <label>
              Answer:{" "}
              <input
                style={{ width: "370px" }}
                type="text"
                name="answer"
                value={this.props.question.answer}
                onChange={this.onChange}
              />
            </label>
            <br />
            <label>
              level:{" "}
              <input
                style={{ width: "370px" }}
                type="number"
                name="level"
                value={this.props.question.level}
                onChange={this.onChange}
              />
            </label>
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
