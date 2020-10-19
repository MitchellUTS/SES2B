import Axios from "axios";
import React, { Component } from "react";
import styles from "./all_questions.module.css";

export class Users extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    Axios.get("/api/users/").then((res) => {
      this.setState({ users: res.data });
    });
  }

  handleAdminCheckbox = (e) => {
    e.preventDefault();
    Axios.put("/api/users/" + e.target.name, {admin: e.target.checked}).then((res) => {
        this.componentDidMount();
      });
  }

  render() {
    const content = this.state.users.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.userName}</td>
          <td>{user.email}</td>
          <td>
          <input type="checkbox" name={user.sub} checked={user.admin} onChange={this.handleAdminCheckbox} />
          </td>
        </tr>
      );
    });
    return (
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default Users;
