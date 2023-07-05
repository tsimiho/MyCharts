import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";

import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import NewChart from "./pages/NewChart";
import LoginPage from "./pages/LoginPage";
import ChartPreview from "./pages/ChartPreview";
import BuyCredits from "./pages/BuyCredits";
import MyCharts from "./pages/MyCharts";
import MyCharts2 from "./pages/MyCharts";
import Confirmation from "./pages/ConfirmationPage";

// ClientID: 919864012907-eihr65v77jminklnqd7j61r2bf6q2pdt.apps.googleusercontent.com
// ClientSecret: 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

function App() {
    const [user, setUser] = useState({});
    const [userdata, setUserdata] = useState({});
    const [newuser, setNewuser] = useState(true);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <MainPage
                            newuser={newuser}
                            setNewuser={setNewuser}
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route
                    exact
                    path="/user"
                    element={
                        <UserPage
                            newuser={newuser}
                            setNewuser={setNewuser}
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route
                    exact
                    path="/confirmation"
                    element={
                        <Confirmation
                            newuser={newuser}
                            setNewuser={setNewuser}
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route
                    exact
                    path="/newchart"
                    element={
                        <NewChart
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route
                    exact
                    path="/newchart/preview"
                    element={
                        <ChartPreview
                            newuser={newuser}
                            setNewuser={setNewuser}
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route exact path="/login" element={<LoginPage />} />
                <Route
                    exact
                    path="/purchasecredits"
                    element={
                        <BuyCredits
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
                <Route
                    exact
                    path="/mycharts"
                    element={
                        <MyCharts
                            user={user}
                            setUser={setUser}
                            userdata={userdata}
                            setUserdata={setUserdata}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
