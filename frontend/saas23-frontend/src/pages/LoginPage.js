import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState } from 'react';

function LoginPage() {
  const Login = () => {
    const responseGoogle = (response) => {
      console.log(response);
    };
  }
  return (
    <div className='background'>
      <div className='wrapper2'>
        <img src="/logo.png" alt="Logo"/>
        <h1 className='title'> MyCharts App</h1>
      </div>
    </div>
  );
}

export default LoginPage;
