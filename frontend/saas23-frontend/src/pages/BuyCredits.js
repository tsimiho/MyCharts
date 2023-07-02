import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function BuyCredits({ user, setUser, userdata, setUserdata }) {
    const [number, setNumber] = useState(0);

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
        axios.post("http://localhost:9001/api/quotas", {
            email: user.email,
            quotas: number,
        });
        console.log(number);
    };

    if (Object.keys(user).length === 0) return <Navigate replace to="/" />;
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
                            {user.quotas}
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
                    {/* <div className="buttonsuser">
                        <button className="mainbutton">5 credits</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="mainbutton">10 credits</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="mainbutton">20 credits</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="mainbutton">50 credits</button>
                    </div> */}
                    <div className="buttonsuser">
                        <button
                            className="mainbutton"
                            onClick={() => AddTokens(number)}
                        >
                            Add Tokens
                        </button> &nbsp; &nbsp;
                        <Link to="/user">
                            <button className="mainbutton">Cancel</button>
                        </Link> 
                   </div>
                </div>
            </div>
        );
}

export default BuyCredits;
