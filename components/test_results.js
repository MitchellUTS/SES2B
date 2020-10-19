import { Component } from "react";
import styles from "./all_questions.module.css";
const axios = require("axios").default;

class All_questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      tests: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/userTests")
      .then((response) => {
        const results = response.data;
        if (this.props.user !== null) {
          results.filter(
            (result) => result.username === this.props.user.username
          );
        }
        this.setState({
          results: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    const adminContents = this.state.results.map((item) => {
      const resumeLink = "./userTest/" + item._id;
      return (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.testName}</td>
          <td>{item.complete ? item.testResult : "Pending"}</td>
          <td>{item.complete ? "Complete" : "In Progress"}</td>
        </tr>
      );
    });
    const userContents = this.state.results.map((item) => {
      const resumeLink = "./userTest/" + item._id;
      return (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.testName}</td>
          <td>{item.complete ? item.testResult : "In progress"}</td>
          <td>
            {item.complete ? "Complete" : <a href={resumeLink}>Resume</a>}
          </td>
        </tr>
      );
    });
    return this.props.user === null ? (
      <div className="container">
        <div className="row">
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Test</th>
                  <th>Test Result (Level)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{adminContents}</tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="row">
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Test</th>
                  <th>Test Result (Level)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{userContents}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default All_questions;
