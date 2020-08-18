import { Component } from 'react';
import styles from './modify.module.css';

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      question: '',
      answer: '',
      post: {},
    }

    this.handleChange = this.handleChange.bind(this);
    this.onHandleUpdate = this.onHandleUpdate.bind(this);

  }
  
  handlOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
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
    //   answer: this.state.answer,
    //   level: this.state.level
    // });
    this.setState({
      question: '',
      answer: ''
    });
  } 

  render() {
    console.log(this.state);
    return (
      <div className={styles.container}>
        <form onSubmit={this.onHandleUpdate}>
          <div>
            <h3>Question ID</h3>
            <input className={styles.text} type="text" value={this.state.id} onChange={e => this.handleChange(e, "id")}/>
          </div>
          <div>
            <h3>Question</h3>
            <textarea className={styles.textarea} type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
          </div>
          <div>
            <h3>Answer</h3>
            <input className={styles.text} type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
          </div>
          <div> 
            <h3>Level</h3>
            <div>
              <label>
                <input type="radio" value="1" checked={this.state.selectedOption === '1'} onChange={this.handlOptionChange}/>
                1
              </label>
              <label>
                <input type="radio" value="2" checked={this.state.selectedOption === '2'} onChange={this.handlOptionChange}/>
                2
              </label>
              <label>
                <input type="radio" value="3" checked={this.state.selectedOption === '3'} onChange={this.handlOptionChange}/>
                3
              </label>
            </div>
          </div>
          <br/>
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    );
  };
};

export default Modify;
