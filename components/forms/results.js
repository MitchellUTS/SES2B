import { Component } from 'react';
import styles from './results.module.css';
const axios = require('axios').default;

class Results extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.aligntext}>
                    <h2>Final Results</h2>
                    <p>10/10</p>
                </div>
                <div className={styles.center}>
                    <button className={styles.button}>Begin New Test</button>
                    <button className={styles.button}>Profile Page</button>
                </div>
            </div>
        )
    };
};

export default Results;