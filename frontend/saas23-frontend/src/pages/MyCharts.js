import "../style/UserPage.css";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";
import offlineExporting from "highcharts/modules/offline-exporting";
// import socket from "../components/WebSocket";
import ExportingModule from "highcharts/modules/exporting";
import ExportDataModule from "highcharts/modules/export-data";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import DependencyWheelChart from "../components/DependencyWheelChart";
import LineChart from "../components/LineChart";
import LineChartWithAnnotations from "../components/LineChartwithAnnotations";
import BarChart from "../components/BarChart";
import NetworkGraph from "../components/NetworkGraph";
import PolarChart from "../components/PolarChart";

function MyCharts({ user, setUser, userdata, setUserdata }) {
    const [chartData, setChartData] = useState(null);
    var [loggedin, setLoggedin] = useState(1);
    const [loading, setLoading] = useState(true);
    ExportingModule(Highcharts);
    ExportDataModule(Highcharts);
    offlineExporting(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsAccessibility(Highcharts);
    Sankey(Highcharts);
    HighchartsDependencyWheel(Highcharts);
    HighchartsNetworkgraph(Highcharts);

    const [chartComponent, setChartComponent] = useState(null);

    const displayChart = (options) => {
        if (options.chart.type === "bar") {
            setChartComponent(<BarChart height={"350"} opts={options} />);
        } else if (options.chart.type === "networkgraph") {
            setChartComponent(<NetworkGraph height={"350"} opts={options} />);
        } else if (options.chart.type === "dependencywheel") {
            console.log("dw", options);
            setChartComponent(
                <DependencyWheelChart height={"350"} opts={options} />
            );
        } else if (options.chart.type === "line") {
            if (options.hasOwnProperty("annotations")) {
                setChartComponent(
                    <LineChartWithAnnotations height={"350"} opts={options} />
                );
            } else {
                setChartComponent(<LineChart height={"350"} opts={options} />);
            }
        } else {
            setChartComponent(<PolarChart height={"350"} opts={options} />);
        }
    };

    const downloadChart = (chartOptions, fileType) => {
        const container = document.createElement("div");
        container.id = "chart-container";
        container.style.display = "none";
        document.body.appendChild(container);

        const filename = chartOptions.title.text.replace(/\s/g, "");

        const chart = Highcharts.chart(container, chartOptions);

        if (fileType === "html") {
            try {
                const svgMarkup = chart.getSVG();

                const htmlContent = `
              <html>
                <head>
                  <title>Chart</title>
                </head>
                <body>
                  ${svgMarkup}
                </body>
              </html>
            `;

                const blob = new Blob([htmlContent], { type: "text/html" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                link.click();

                // Clean up the URL object
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error exporting chart:", error);
            }
        } else {
            // Export the chart in other file formats
            chart.exportChartLocal({
                type: fileType,
                // filename: `chart.${fileType}`,
                filename: filename,
                sourceWidth: chartOptions.chart.width,
                sourceHeight: chartOptions.chart.height,
            });
        }

        // Destroy the chart
        chart.destroy();
        container.remove();
    };

    const requestChart = async (type, id, action) => {
        await axios.get(
            "http://localhost:9001/api/request/" +
                type +
                "/" +
                id +
                "/" +
                action
        );
    };

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8090");

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onmessage = ({ data }) => {
            console.log(data);
            const { diagram, action } = JSON.parse(data);
            console.log(diagram);
            HighchartsExporting(Highcharts);
            HighchartsAccessibility(Highcharts);
            Sankey(Highcharts);
            HighchartsDependencyWheel(Highcharts);
            HighchartsNetworkgraph(Highcharts);
            console.log(userdata);
            setChartData(diagram);

            if (action === "display") {
                displayChart(diagram);
            } else if (action === "pdf") {
                // download pdf
                downloadChart(diagram, "application/pdf");
            } else if (action === "png") {
                // download png
                downloadChart(diagram, "image/png");
            } else if (action === "svg") {
                // download svg
                downloadChart(diagram, "image/svg+xml");
            } else if (action === "html") {
                // download html
                downloadChart(diagram, "html");
            }
        };

        const storedUserdata = localStorage.getItem("userdata");

        try {
            setUserdata(JSON.parse(storedUserdata));
        } catch (error) {
            setUserdata(null);
        }

        setLoading(false);

        return () => {
            socket.close();
        };
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

                <div className="containermycharts">
                    <div className="title">
                        <Link to="/user">
                            <button className="logout">Back</button>
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
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "pdf"
                                                    );
                                                }}
                                            >
                                                pdf
                                            </button>
                                            <button
                                                class="download"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "png"
                                                    );
                                                }}
                                            >
                                                {" "}
                                                png{" "}
                                            </button>
                                            <br />
                                            <button
                                                class="download"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "svg"
                                                    );
                                                }}
                                            >
                                                {" "}
                                                svg{" "}
                                            </button>
                                            <button
                                                class="download"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    requestChart(
                                                        rows["Type"],
                                                        rows["DiagramID"],
                                                        "html"
                                                    );
                                                }}
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
                        chartComponent
                    ) : (
                        <div className="no-chart-container">
                            <div className="no-chart-box">
                                Press a chart to preview
                            </div>
                        </div>
                    )}
                </div>
                <div id="chart-container"></div>
            </div>
        );
}

export default MyCharts;
