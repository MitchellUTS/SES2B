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
      <div className={styles.centerdiv}>
        <form onSubmit={this.onHandleUpdate}>
          <div className={styles.menu}>
            <h2>Question ID</h2>
            <input type="text" value={this.state.id} onChange={e => this.handleChange(e, "id")}/>
          </div>
            <br/>
          <div className={styles.menu}>
            <h2>Question</h2>
            <textarea className={styles.textarea} type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
          </div>
            <br/>
          <div className={styles.menu}>
            <h2>Answer</h2>
            <input type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
          </div>
            <br/>
          <div className={styles.menu}> 
            <h2>Level</h2>
            <div className={styles.navitem}>
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
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    );
  };
};

export default Modify;
