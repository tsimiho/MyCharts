import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import socket from "../components/WebSocket.js";
import axios from "axios";

function UserPage({
    newuser,
    setNewuser,
    user,
    setUser,
    userdata,
    setUserdata,
}) {
    var data = [
        ["Number of Charts", userdata.diagrams ? userdata.diagrams.length : ""],
        ["Available Credits", userdata.quotas],
        [
            "Last Login",
            userdata.lastLogin ? userdata.lastLogin.slice(0, 10) : "",
        ],
    ];

    const [loading, setLoading] = useState(true); // New loading state
    const [loggedOut, setLoggedOut] = useState(false); // New loading state

    const rows = data.map((row, index) => {
        const cells = row.map((cell, cellIndex) => {
            return <td key={cellIndex}>{cell}</td>;
        });
        return <tr key={index}>{cells}</tr>;
    });

    function logout() {
        // setUser({});
        // setNewuser(true);
        setUserdata({});
        // localStorage.removeItem("user");
        localStorage.removeItem("userdata");
        // localStorage.removeItem("newuser");
        setLoggedOut(true);
    }

    const updateuserdata = (data) => {
        data = JSON.parse(data);
        console.log(data);
        setUserdata(data);
        localStorage.setItem("userdata", JSON.stringify(data));
    };

    useEffect(() => {
        socket.onmessage = ({ data }) => {
            console.log("message");
            updateuserdata(data);
        };

        axios.post("http://localhost:9001/api/login", {
            email: userdata.email,
        });

        // const storedUser = localStorage.getItem("user");
        const storedUserdata = localStorage.getItem("userdata");

        try {
            // setUser(JSON.parse(storedUser));
            setUserdata(JSON.parse(storedUserdata));
            // setNewuser(localStorage.getItem("newuser"));
        } catch (error) {
            // setUser(null);
            setUserdata(null);
        }
        // const storedUser = localStorage.getItem("user");
        // if (storedUser) {
        //     const userObject = JSON.parse(storedUser);
        //     setUser(userObject);
        // } else {
        //     console.log("here");
        //     setUser({});
        // }
        // setUserdata(JSON.parse(localStorage.getItem("userdata")));
        // setNewuser(localStorage.getItem("newuser"));

        setLoading(false); // Set loading to false after data fetching completes
    }, []);

    if (loggedOut === true) {
        return <Navigate replace to="/" />;
    }

    if (loading) {
        return <div></div>;
    }

    // if (newuser === true) return <Navigate replace to="/" />;
    // else
    return (
        <div className="background">
            <div className="wrapper">
                <img src="/logo.png" alt="Logo" />
                <h1 className="title"> MyCharts App</h1>
                <button className="logout" onClick={() => logout()}>
                    Log out
                </button>
            </div>
            <div className="container">
                <h1 className="title"> Hello {userdata.email}</h1>
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
