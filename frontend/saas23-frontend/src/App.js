import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, {useState} from 'react';

import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import NewChart from './pages/NewChart'
import LoginPage from './pages/LoginPage'

// ClientID: 919864012907-eihr65v77jminklnqd7j61r2bf6q2pdt.apps.googleusercontent.com
// ClientSecret: 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


function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage user={user} setUser={setUser}/>} />
        <Route exact path="/user" element={<UserPage user={user} setUser={setUser}/>} />
        <Route exact path="/newchart" element={<NewChart />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;