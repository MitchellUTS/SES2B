import Link from 'next/link';
import { useState } from 'react';
const axios = require('axios').default;

const Sidebar = ({ user, loading = false }) => {
  const [admin, setAdmin] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  if (typeof window !== 'undefined') {
    if (!loading && user) {
      if (!isLoading && typeof admin.admin === 'undefined') {
        axios.get("/api/users/" + user.sub)
          .then(function (response) {
            console.log(response.data);
            setIsLoading(false);
            setAdmin(response.data);
          })
          .catch(function (error) {
            setIsLoading(false);
            console.log(error);
          });
        setIsLoading(true);
      }
    } 
  }

  return (
    <>
    <div className="wrapper">
      <div className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          {(typeof window !== 'undefined') && admin.admin && (
            <li><a href="/admin">Admin</a></li>
          )}
          <li><a href="/profile">Profile</a></li>
          {/* <li><a href="/create">Create</a></li>
          <li><a href="/modify">Modify</a></li> */}
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
          position: sticky;
        }

        body{
          background: #333;
        }

        .wrapper{
          display: flex;
          position: sticky;
          top: 0;
          height: 100%;
        }

        .wrapper .sidebar{
          position: absolute;
          float: left;
          height: calc(100vh);
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

        @media only screen and (max-width: 1080px) {
          .wrapper .sidebar{
            width: 0px;
          }

          .wrapper .sidebar ul li{
            display: none;
          }
        }
        `}</style>
      </>
  )
}

export default Sidebar;
