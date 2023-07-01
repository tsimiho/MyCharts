import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import Sankey from 'highcharts/modules/sankey'
import axios from 'axios'
import Highcharts from 'highcharts';

function MyCharts({user, setUser}) {
    const [i, setI] = useState(0);
    const types = ['bar', 'line'];
    const data = [
        ['n. of charts', '10'],
        ['available credits','128'],
        ['last login', '19-07-2022']
      ]
    
      const rows = data.map((row, index) => {
        const cells = row.map((cell, cellIndex) => {
          return <td key={cellIndex}>{cell}</td>;
        });
        return <tr key={index}>{cells}</tr>;
      });

  if(Object.keys(user).length == 0) return <Navigate replace to="/"/>; 
  else return (
    <div className='background'>
      <div className='wrapper'>
        <img src="/logo.png" alt="Logo"/>
        <h1 className='title'> MyCharts App</h1>
      </div>
      <div className='containermycharts'>
        <h1 className='title'> Account: <span style={{ color: 'lightcoral' }}>{user.email}</span></h1>
        <div className='buttonsmycharts'>
            <Link to='/user'>
            <button className='mainbutton'>My Account</button>
            </Link>
            <Link to='/user'>
            <button className='mainbutton'>Log out</button>
            </Link>
        </div>
      </div><br/>
      <div className='containermy'>
        <div className='table'>
        <table className='tablemycharts'>
            <thead>
            <tr>
                <th>Type</th>
                <th>Chart name</th>
                <th>Created on</th>
                <th>Download</th>
            </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
        </table>
        </div>
        <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                  chart: {
                      type: types[i%2],
                      height: 250
                  },
                  title: {
                      text: 'My Chart'
                  },
                  xAxis: {
                      categories: ['Apples', 'Bananas', 'Oranges']
                  },
                  yAxis: {
                      title: {
                      text: 'Fruit Eaten'
                      }
                  },
                  series: [{
                      name: 'Jane',
                      data: [1, 0, 4]
                  }, {
                      name: 'John',
                      data: [5, 7, 3]
                  }],
                  }}
              />
      </div>
    </div>
  );
}

export default MyCharts;
