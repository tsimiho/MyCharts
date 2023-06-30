import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function Table(props) {
    const { data } = props;
  
    // Dynamically generate rows and columns
    const rows = data.map((row, index) => {
      const cells = row.map((cell, cellIndex) => {
        return <td key={cellIndex}>{cell}</td>;
      });
      return <tr key={index}>{cells}</tr>;
    });
  
    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

function UserPage({user, setUser}) {
  const data = [
    ['n. of charts', '10'],
    ['available credits','128'],
    ['last login', '19-07-2022']
  ]

  const rows = data.map((row, index) => {
    const cells = row.map((cell, cellIndex) => {
      return <td key={cellIndex}>{cell}</td>;
    });
    return <tr key={index}>{cells}</tr>;
  });

  function logout() {
    setUser({});
  }

  if(Object.keys(user).length == 0) return <Navigate replace to="/"/>; 
  else return (
    <div className='background'>
      <div className='wrapper'>
        <img src="/logo.png" alt="Logo"/>
        <h1 className='title'> MyCharts App</h1>
        <button className='logout' onClick={logout}>Log out</button>
      </div>
      <div className='container'>
        <h1 className='title'> Hello {user.name}</h1>
        <table className='data'>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div className='buttonsuser'>
            <Link to='/'>
                <button className='mainbutton'>My charts</button>
            </Link> &nbsp;&nbsp;&nbsp;
            <Link to='/newchart'>
                <button className='mainbutton'>New chart</button>
            </Link> &nbsp;&nbsp;&nbsp;
            <Link to='/purchasecredits'>
                <button className='mainbutton'>Buy credits</button> 
            </Link> 
        </div>
      </div>
    </div>
  );
}

export default UserPage;
