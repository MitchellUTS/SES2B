import Link from 'next/link';

const Sidebar = props => {
  
  return (
    <>
    <div className="wrapper">
      <div className="sidebar">
        <ul>

          <li><Link href="/tests"><a>Tests</a></Link></li>
          <li><Link href="/list"><a>Admin</a></Link></li>
          <li><Link href="/create"><a>Create</a></Link></li>
          <li><Link href="/modify"><a>Modify</a></Link></li>
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
          position: absolute;
          height: 100%;
        }

        .wrapper .sidebar{
          position: absolute;
          float: left;
          height: 100%;
          width: 200px;
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
