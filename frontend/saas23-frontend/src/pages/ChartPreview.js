import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import FileUpload from '../components/FileUpload.js'
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import Sankey from 'highcharts/modules/sankey'
import axios from 'axios'

function ChartPreview() {

  return (
    <div className='background'>
      <div className='wrapper2'>
        <img src="/logo.png" alt="Logo"/>
        <h1 className='title'> MyCharts App</h1>
      </div>
      <div className='container1'>
        <Link to='/user'>
          <button className='logout'>Back</button>
        </Link> 
      </div>
      <div className='containernew'>
        <h1 className='titleuser'> Let's create your own chart!</h1>
        <div className='container1'>
          <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                  chart: {
                      type: "bar",
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

        <div className='buttonsuser'>
          <Link to="/newchart">
            <button className="mainbutton">Cancel</button>
          </Link>       
        </div>
      </div>
    </div>
  );
}

export default ChartPreview;
