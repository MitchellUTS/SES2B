import styles from './all_questions.module.css';


function All_questions()
{

    return(
<table className={styles.table}>
  <thead>
    <tr>
      <th>Questions</th>
      <th>Action</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Question Question Question</td>
      <td><button type="button">Detail</button>
      <button type="button">Delete</button></td>
    </tr>
    <tr>
      <td>Question Question Question</td>
      <td><button type="button">Detail</button>
      <button type="button">Delete</button></td>
    </tr>
    <tr>
      <td>Question Question Question</td>
      <td><button type="button">Detail</button>
      <button type="button">Delete</button></td>
    </tr>
    <tr>
      <td>Question Question Question</td>
      <td><button type="button">Detail</button>
      <button type="button">Delete</button></td>
    </tr>
    <tr>
      <td>Question Question Question</td>
      <td><button type="button">Detail</button>
      <button type="button">Delete</button></td>
    </tr>
  </tbody>
</table>
    
    );
}


export default All_questions;