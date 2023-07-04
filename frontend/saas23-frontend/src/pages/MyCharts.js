import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";
import axios from "axios";
import Highcharts from "highcharts";
import socket from "../components/WebSocket";

HighchartsExporting(Highcharts); // Initialize the exporting module

function MyCharts({ user, setUser, userdata, setUserdata }) {
    socket.onmessage = ({ data }) => {
        const { diagram, action } = JSON.parse(data);

        console.log(action, diagram);

        if (action === "display") {
            handleRowClick(diagram);
        } else if (action === "pdf") {
            // download pdf
            // downloadChart(chart, "application/pdf");
            console.log("data", data);
        } else if (action === "png") {
            // download png
            downloadChart(diagram, "image/png");
        } else if (action === "svg") {
            // download svg
            downloadChart(diagram, "image/svg+xml");
        } else if (action === "html") {
            // download html
            downloadChart(diagram, "text/html");
        }
    };

    const downloadChart = (chartopt, type) => {
        const chartConfig = {
            type,
            options: chartopt,
        };
        HighchartsExporting(Highcharts); // Initialize the exporting module
        Highcharts.chart("export-container", chartConfig, function (chart) {
            chart.exportChart({
                type,
                filename: "my_chart",
            });
        });
    };

    const [chartData, setChartData] = useState(null);
    var [loggedin, setLoggedin] = useState(1);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedUserdata = localStorage.getItem("userdata");
        setUser(JSON.parse(storedUser));
        setUserdata(JSON.parse(storedUserdata));
        console.log(user);
        console.log(userdata);
        if (!storedUser) {
            setLoggedin(0);
        }

        console.log(userdata.diagrams);
    }, []);

    function handleRowClick(rows) {
        // Assuming `rows` contains the chart data for the clicked row

        setChartData({
            chart: {
                type: "bar",
                height: 250,
            },
            title: {
                text: "My Chart",
            },
            xAxis: {
                categories: ["Apples", "Bananas", "Oranges"],
            },
            yAxis: {
                title: {
                    text: "Fruit Eaten",
                },
            },
            series: [
                {
                    name: "Jane",
                    data: [1, 0, 4],
                },
                {
                    name: "John",
                    data: [5, 7, 3],
                },
            ],
        });

        // Use the chart data in your application (e.g., set it to state)
        // Example: setChartData(chartData);
        // Replace `setChartData` with the appropriate state setter function in your code
    }

    const requestChart = async (type, id, action) => {
        console.log(
            "http://localhost:9001/api/request/" +
                type +
                "/" +
                id +
                "/" +
                action
        );
        await axios.get(
            "http://localhost:9001/api/request/" +
                type +
                "/" +
                id +
                "/" +
                action
        );
    };

    if (loggedin === 0) return <Navigate replace to="/" />;
    else
        return (
            <div className="background">
                <div className="wrapper">
                    <img src="/logo.png" alt="Logo" />
                    <h1 className="title"> MyCharts App</h1>
                </div>
                <div className="containermycharts">
                    <h1 className="title">
                        {" "}
                        Account:{" "}
                        <span style={{ color: "lightcoral" }}>
                            {user.email}
                        </span>
                    </h1>
                    <div className="buttonsmycharts">
                        <Link to="/user">
                            <button className="mainbutton">My Account</button>
                        </Link>
                        <Link to="/user">
                            <button className="mainbutton">Log out</button>
                        </Link>
                    </div>
                </div>
                <br />
                <div className="containermy">
                    <div className="table-container">
                        <table className="tablemycharts">
                            <thead
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <tr>
                                    <th>Type</th>
                                    <th>Chart Name</th>
                                    <th>Created On</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.diagrams.map((rows) => (
                                    <tr
                                        key={rows["DiagramID"]}
                                        onClick={() =>
                                            requestChart(
                                                rows["Type"],
                                                rows["DiagramID"],
                                                "display"
                                            )
                                        }
                                    >
                                        <td>{rows["Type"]}</td>
                                        <td>{rows["Name"]}</td>
                                        <td>
                                            {rows["Created_On"].slice(0, 10)}
                                        </td>
                                        <td class="button-cell">
                                            <button
                                                class="download"
                                                onClick={() =>
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "pdf"
                                                    )
                                                }
                                            >
                                                pdf
                                            </button>
                                            <button
                                                class="download"
                                                onClick={() =>
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "png"
                                                    )
                                                }
                                            >
                                                {" "}
                                                png{" "}
                                            </button>
                                            <br />
                                            <button
                                                class="download"
                                                onClick={() =>
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "svg"
                                                    )
                                                }
                                            >
                                                {" "}
                                                svg{" "}
                                            </button>
                                            <button
                                                class="download"
                                                onClick={() =>
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "html"
                                                    )
                                                }
                                            >
                                                {" "}
                                                html{" "}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {chartData ? (
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartData}
                        />
                    ) : (
                        <div className="no-chart-container">
                            <div className="no-chart-box">
                                Press a chart to preview
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default MyCharts;
