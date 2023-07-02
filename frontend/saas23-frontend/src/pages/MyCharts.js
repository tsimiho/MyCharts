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

function MyCharts({ user, setUser }) {
    const [chartData, setChartData] = useState(null);
    const types = ["bar", "line"];
    var [loggedin, setLoggedin] = useState(1);
    const data = [
        ["line", "First","cwc"],
        ["line", "Second","cwc"],
        ["line", "Third","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
        ["line", "First","cwc"],
    ];

    const rows = data.map((row, index) => {
        const cells = row.map((cell, cellIndex) => {
            return <td key={cellIndex}>{cell}</td>;
        });
        return <tr key={index}>{cells}</tr>;
    });

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      console.log(user);
      if (!storedUser) {
        setLoggedin(0)
      }
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


    if (loggedin === 0) return <Navigate replace to="/" />;
    else return (
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
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Chart name</th>
                                    <th>Created on</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                              {data.map((rows) => (
                              <tr key={rows[0]} onClick={() => handleRowClick(rows)}>
                                <td>{rows[0]}</td>
                                <td> {rows[1]}</td>
                                <td> {rows[2]}</td>
                                <td>
                                  <Link to={'/'}>
                                    <button> View </button>
                                  </Link>&nbsp;&nbsp;
                                  <button > Delete </button><br/>
                                  <Link to={'/'}>
                                    <button> Stats </button>
                                  </Link>&nbsp;&nbsp;
                                  <button > Reset </button>                
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
                                Press a chart to view
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        );
}

export default MyCharts;
