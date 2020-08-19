import styles from './all_questions.module.css';


function All_questions()
{

    return(
<table className={styles.table}>
  <tr>
    <th>Questions</th>
    <th>Action</th>
    
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
  <tr>
    <td>Question Question Question</td>
    <td><button type="button">Detail</button>
    <button type="button">Delete</button></td>
  </tr>
 
</table>
    
    );
}


export default All_questions;