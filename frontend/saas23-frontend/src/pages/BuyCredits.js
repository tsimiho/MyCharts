import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import socket from "../components/WebSocket";

function BuyCredits({ user, setUser, userdata, setUserdata }) {
    const [number, setNumber] = useState(0);
    var [loggedin, setLoggedin] = useState(1);
    const [loading, setLoading] = useState(true); // New loading state

    const updateQuotas = (data) => {
        userdata.quotas = parseInt(data);
        console.log(userdata.quotas);
        setUserdata(userdata);
        localStorage.setItem("userdata", JSON.stringify(userdata));
        setNumber(0);
    };

    const handleDecrement = () => {
        if (number > 0) setNumber(number - 5);
    };

    const handleIncrement = () => {
        setNumber(number + 5);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/\D/g, "");
        const parsedValue = parseInt(sanitizedValue, 10);
        const newValue = isNaN(parsedValue) ? "" : parsedValue.toString();
        setNumber(newValue);
    };

    const AddTokens = () => {
        axios.post(`http://192.168.1.227:9001/api/quotas`, {
            email: user.email,
            quotas: parseInt(number),
        });
        console.log(number);
    };

    useEffect(() => {
        socket.onmessage = ({ data }) => {
            updateQuotas(data);
        };

        const storedUserdata = localStorage.getItem("userdata");

        try {
            setUserdata(JSON.parse(storedUserdata));
        } catch (error) {
            setUserdata(null);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div></div>;
    }

    if (loggedin === 0) return <Navigate replace to="/" />;
    else
        return (
            <div className="background">
                <div className="wrapper">
                    <img src="/logo.png" alt="Logo" />
                    <h1 className="title"> MyCharts App</h1>
                </div>

                <div className="container">
                    <h1 className="title">
                        {" "}
                        You are logged in as{" "}
                        <span style={{ color: "lightcoral" }}>
                            {user.email}
                        </span>
                    </h1>
                    <h1 className="title">
                        {" "}
                        You have{" "}
                        <span style={{ color: "lightcoral" }}>
                            {userdata.quotas}
                        </span>{" "}
                        tokens
                    </h1>
                    <div className="buttonsuser">
                        <button
                            className="mainbutton"
                            onClick={handleDecrement}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={number}
                            onChange={handleInputChange}
                            className="numberInput"
                            style={{
                                width: `${
                                    (number.toString().length + 1) * 10
                                }px`,
                            }}
                        />
                        <button
                            className="mainbutton"
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                    <div className="buttonsuser">
                        <button
                            className="mainbutton"
                            onClick={() => AddTokens(number)}
                        >
                            Add Tokens
                        </button>{" "}
                        &nbsp; &nbsp;
                        <Link to="/user">
                            <button className="mainbutton">Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default BuyCredits;
