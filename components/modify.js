import { Component } from 'react';
import styles from './profile.module.css';

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      post: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);

  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  onHandleUpdate(e){
    console.log(this.postId);
    e.preventDefault();
    // database.ref('posts').child('${this.postId}').update({
    //   question: this.state.question,
    //   answer: this.state.answer
    // });
    this.setState({
      question: '',
      answer: ''
    });
  } 

  render() {
    console.log(this.state);
    return (
      <div className={styles.profile}>
        <form onSubmit={this.onHandleUpdate}>
          <div className="form-group">
            <input type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
          </div>
            <br/>
          <div className="form-group">
            <input type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    );
  };
};

export default Modify;
