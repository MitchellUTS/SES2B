import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

// toggleClass(){
//   const currentState = this.state.active;
//   this.setState({})
// }

const Sidebar = props => {
  // const [open, setOpen] = useState(false);
  
  return (
    <>  
    <div id ="sidebar">
      <div onClick={toggleSidebar()} className="toggle-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>

      <style jsx>{`
        * {
          margin:0px;
          padding:0px;
        }
        #sidebar {
          position: fixed;
          width: 200px;
          height: 100%;
          background:#222;
          left:0px;
          transition: all 500ms linear;
        }
        #siderbar.active {
          left: -200px;
        }
        
        #sidebar ul li {
          color: rgba(230,230,230,0.9);
          list-style: none;
          padding:15px 10px;
          border-bottom: 1px solid rgba(100,100,100,0.3);
        }
        
        #sidebar .toggle-btn {
          position: absolute;
          left: 230px;
          top: 20px;
        }
        #sidebar .toggle-btn span {
          display:block;
          width:30px;
          height:5px;
          background:#151719;
          margin: 3px 0px;
        }
        `}</style>
      </>
  )
}

export default Sidebar;

if (typeof window !== 'undefined') {
  ReactDOM.render(<Sidebar />, document.getElementById("sidebar"));
  
}