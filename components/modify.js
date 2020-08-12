import { Component } from 'react';
import Link from 'next/link';
import { useFetchUser, fetchUser } from '../lib/user'
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
    // this.onHandleUpdate = this.onHandleUpdate.bind(this);

    fetchUser().then(this.setUser.bind(this)).catch(console.error);
  }

  setUser(user) {
    this.setState({
      user: user,
      loading: false,
    });
  }

  handleClick(event) {
    this.setState({
      isOpen: (!this.state.isOpen)
    });
    // this.updateUser();
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  getUserPicture() {
    if (this.state.user)
      return this.state.user.picture;
    return "https://www.avioncommunications.com.au/wp-content/uploads/2014/06/Question-mark.png";
  }

  updateUser() {
    let {user, loading} = useFetchUser();
    this.setState({
      user: user,
      loading: loading,
    });
  }

  render() {
    // console.log(this.state);
    return (
      <div className={styles.profile}>
        <img src={this.getUserPicture()} alt="user picture" onClick={this.handleClick} />
          {this.state.isOpen && (
            <div className={styles.menu}>
              <ul>
                {!this.state.loading &&
                  (this.state.user ? (
                    <>
                      <li>
                        <Link href="/profile">
                          <a>Modify</a>
                        </Link>
                      </li>
                      <li>
                        <a href="/api/auth/logout">Logout</a>
                      </li>
                    </>
                  ) : (
                    <li>
                      <a href="/api/auth/login">Login</a>
                    </li>
                  )
                  )}
              {this.state.loading && (
                <li>
                  Loading
                </li>
              )}
              </ul>
            </div>
          )}
        <input type="text" value={this.state.question} onChange={e => this.handleChange(e, "question")}/>
        <input type="text" value={this.state.answer} onChange={e => this.handleChange(e, "answer")}/>
        <button className="btn btn-success">Submit</button>
      </div>
    );
  };
};

export default Modify;
