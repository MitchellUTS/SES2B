import React, { Component } from "react";
import QuestionForm from "./questionForm";


class QuestionsForm extends Component {
  
  render() {
    return this.props.questions.map((question) => (
        <QuestionForm
        key={question._id}
        question={question}
        updateQuestion={this.props.updateQuestion}
      />
    ));
  }
}

export default QuestionsForm;
