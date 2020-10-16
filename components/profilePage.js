import { Component } from 'react';
import Link from 'next/link';
import { useFetchUser, fetchUser } from '../lib/user'
import styles from './profile.module.css';

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
    // console.log(this.state);
    return (
      <div>
        <img src={ this.getUserPicture() }></img>
        <p>Name: { this.getUsername() }</p>
        <p>Email: { this.getEmail() }</p>
      </div>
    );
  };
};

export default ProfilePage;
