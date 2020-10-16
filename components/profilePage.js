import { Component } from 'react';
import Link from 'next/link';
import { useFetchUser, fetchUser } from '../lib/user'
// import styles from './profile.module.css';
import resultStyles from './all_questions.module.css';
import styles from './profilePage.module.css';


const axios = require('axios').default;

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      isOpen: false,
      results: [],
      userResults: [],
      tests: []
    }
    this.handleClick = this.handleClick.bind(this);

    fetchUser().then(this.setUser.bind(this)).catch(console.error);
  }

  componentDidMount() {
    axios.get("/api/userTests")
    .then(response => {
      this.setState({ 
        results: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    })
  }

  getUserResults() {
    var i;
    for (i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i].userID === this.state.user._id) {
        userResults.push(this.state.results[i]);
      }
    }
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

  getUsername() {
    if (this.state.user)
      return this.state.user.nickname;
    return "Name not Available";
  }

  getEmail() {
    if (this.state.user)
      return this.state.user.name;
    return "Email not Available";
  }

  updateUser() {
    let {user, loading} = useFetchUser();
    this.setState({
      user: user,
      loading: loading,
    });
  }

  render() {
    console.log(this.state.results);
    console.log(this.state.userResults);

    this.getUserResults();

    const contents = this.state.userResults.map((item) => {
      return(
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.testName}</td>
          <td>{item.testResult}</td>
        </tr>
      )
    })

    return (
      <div className={styles.container}>
        <div className={styles.itemLeft}>
          <img src={ this.getUserPicture() } className={styles.image}></img>
          <p>Name: { this.getUsername() }</p>
          <p>Email: { this.getEmail() }</p>
        </div>
        <div className={styles.itemRight}>
          <h2>Previous Test Results</h2>
          <table className={styles.table}>
            <thead>  
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Test</th>
                <th>Test Result (Level)</th>
              </tr>
            </thead>
            <tbody>
             {contents}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};

export default ProfilePage;
