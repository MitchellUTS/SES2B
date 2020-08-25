const Sidebar = props => {
  
  return (
    <>
    <div className="wrapper">
      <div className="sidebar">
        <ul>
          <li><a href="list">Questions</a></li>
          <li><a href="create">Create</a></li>
          <li><a href="modify">Modify</a></li>
        </ul>
      </div>
    </div>

      <style jsx>{`
        *{
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
          list-style: none;
          text-decoration: none;
        }

        body{
          background: #333;
        }

        .wrapper{
          display: flex;
          position: relative;
        }

        .wrapper .sidebar{
          position: fixed;
          width: 200px;
          height: 100%;
          background: #222;
          padding: 0;
        }

        .wrapper .sidebar ul li{
          padding: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .wrapper .sidebar ul li a{
          color: #fff;
          display: block;
        }

        .wrapper .sidebar ul li:hover{
          background: #333;
        }

        .wrapper .sidebar ul li:hover a{
          color: #fff;
        }
        `}</style>
      </>
  )
}

export default Sidebar;
