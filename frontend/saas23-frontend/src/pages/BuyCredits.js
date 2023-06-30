import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function BuyCredits({user, setUser}) {
  

  if(Object.keys(user).length == 0) return <Navigate replace to="/"/>; 
  else return (
    <div className='background'>
      <div className='wrapper'>
        <img src="/logo.png" alt="Logo"/>
        <h1 className='title'> MyCharts App</h1>
      </div>
      <div className='container'>
        <h1 className='title'> You are logged in as <span style={{ color: 'lightcoral' }}>{user.email}</span></h1>
        
        <div className='buttonsuser'>
            <button className='mainbutton'>5 credits</button>&nbsp;&nbsp;&nbsp;
            <button className='mainbutton'>10 credits</button>&nbsp;&nbsp;&nbsp;
            <button className='mainbutton'>20 credits</button>&nbsp;&nbsp;&nbsp;
            <button className='mainbutton'>50 credits</button> 
        </div>
        <div className='buttonsuser'>
            <Link to='/user'>
                <button className='mainbutton'>Cancel</button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyCredits;
