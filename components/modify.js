import { Component } from 'react';
import Link from 'next/link';
import { useFetchUser, fetchUser } from '../lib/user'
import styles from './profile.module.css';

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      isOpen: false,
    }
    this.handleClick = this.handleClick.bind(this);

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
      </div>
    );
  };
};

export default Modify;
