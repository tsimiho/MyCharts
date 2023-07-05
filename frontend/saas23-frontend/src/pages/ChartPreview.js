import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useEffect,useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import csvtojson from 'csvtojson';
import socket from "../components/WebSocket.js";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChartPreview({ user, setUser, userdata, setUserdata }) {
    HighchartsExporting(Highcharts);
    HighchartsAccessibility(Highcharts);
    Sankey(Highcharts);
    HighchartsDependencyWheel(Highcharts);
    HighchartsNetworkgraph(Highcharts);
    const location = useLocation();
    const [save,setSave] = useState(true);
    var jsonData=[];
    const options = {};


    useEffect(() => {
        try {
            jsonData = JSON.parse(
            decodeURIComponent(new URLSearchParams(location.search).get("jsonData"))
            );
        } catch (error) {
            console.error("Error decoding jsonData:", error);
            jsonData = [[]];
        }
        Object.entries(jsonData[0]).forEach(([key, value]) => {
            options[key] = JSON.parse(value);
        });
        console.log(options);
    }, []);

    const savechart = () => {
        // Create the chart on the according microservice
        if (options.chart.hasOwnProperty("type")) {
            console.log(options.chart.type);
            if (options.chart.type === "bar") {
                axios.post("http://localhost:9001/api/create/basicColumn", {
                    email: userdata.email,
                    data: options,
                });
            } else if (options.chart.type === "networkgraph") {
                console.log("hereskjsdfhsakjhfalskdfhsakldjfh");
                axios.post("http://localhost:9001/api/create/networkGraph", {
                    email: userdata.email,
                    data: options,
                });
            } else if (options.chart.type === "dependencywheel") {
                axios.post("http://localhost:9001/api/create/dependencyWheel", {
                    email: userdata.email,
                    data: options,
                });
            } else if (options.chart.type === "line") {
                if (options.hasOwnProperty("annotations")) {
                    axios.post(
                        "http://localhost:9001/api/create/lineWithAnnotations",
                        {
                            email: userdata.email,
                            data: options,
                        }
                    );
                } else {
                    console.log("Here");
                    axios.post("http://localhost:9001/api/create/linechart", {
                        email: userdata.email,
                        data: options,
                    });
                }
            }
        }
        userdata.quotas -= 1;
        console.log(userdata);
        setUserdata(userdata);
        localStorage.removeItem("userdata");
        localStorage.setItem("userdata", JSON.stringify(userdata));
        toast.success("Your diagram has been successfully added!", {
            position: "top-left",
            autoClose: 5000,
        });
        setSave(false);
        //   // get the new user data
        //   axios.post("http://localhost:9001/api/login", {
        //     email: userdata.email,
        // });
    };

    return (
        <div className="background">
            <div className="wrapper">
                <img src="/logo.png" alt="Logo" />
                <h1 className="title"> MyCharts App</h1>
            </div>
            <div className="containerpreview">
                <h1 className="titleuser">
                    {" "}
                    This is what your chart will look like!
                </h1>
                <div className="highcharts-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
                <div className="buttonsuser">
                    {save ? (
                        <button
                            className="mainbutton"
                            onClick={() => savechart()}
                        >
                            Save chart
                        </button>
                    ) : (
                        <Link to="/user">
                            <button className="mainbutton">Return</button>
                        </Link>
                    )}
                    &nbsp; &nbsp;
                    <Link to="/newchart">
                        <button className="mainbutton">Cancel</button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChartPreview;
