import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import WebSocket from "ws";

function UserPage({ user, setUser, userdata, setUserdata }) {
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedUserdata = localStorage.getItem("userdata");
        if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setUser(userObject);
            const userdataObject = JSON.parse(storedUserdata);
            console.log(userdataObject);
            setUserdata(userdataObject);
            // Set a timeout to indicate data availability after 1 second
            // setTimeout(() => {
            // }, 3000)
        } else {
            setUser({});
        }
    }, [setUser,setUserdata]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userdata", JSON.stringify(userdata));
      }, [user, userdata]);

      const diagramsCount = userdata.diagrams ? userdata.diagrams.length : 0;
      const availableCredits = userdata.quotas || "";
      const lastLogin = userdata.lastLogin ? userdata.lastLogin.split("T")[0] : "";
    
      const data = [
        ["n. of charts", diagramsCount],
        ["available credits", availableCredits],
        ["last login", lastLogin],
      ];
    

    const rows = data.map((row, index) => {
        const cells = row.map((cell, cellIndex) => {
            return <td key={cellIndex}>{cell}</td>;
        });
        return <tr key={index}>{cells}</tr>;
    });

    function logout() {
        setUser({});
        localStorage.removeItem("user");
    }

    if (Object.keys(user).length === 0) return <Navigate replace to="/" />;
    else
        return (
            <div className="background">
                <div className="wrapper">
                    <img src="/logo.png" alt="Logo" />
                    <h1 className="title"> MyCharts App</h1>
                    <button className="logout" onClick={logout}>
                        Log out
                    </button>
                </div>
                <div className="container">
                    <h1 className="title"> Hello {user.name}</h1>
                    <table className="data">
                        <tbody>{rows}</tbody>
                    </table>
                    <div className="buttonsuser">
                        <Link to="/mycharts">
                            <button className="mainbutton">My charts</button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to="/newchart">
                            <button className="mainbutton">New chart</button>
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to="/purchasecredits">
                            <button className="mainbutton">Buy credits</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default UserPage;
