import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import Sankey from 'highcharts/modules/sankey'

function NewChart() {
  const [i, setI] = useState(0);
  const types = ['bar', 'line'];

  const changeI = (plus) => {
    if(plus) {
        var n = i + 1;
        setI(n); 
    } else if(!plus) {
        var n = i - 1;
        setI(n);
    }
  }

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
        <button class="arrow-button-left" onClick={() => changeI(false)}></button>
        <button class="arrow-button" onClick={() => changeI(true)}></button><br/><br/>
        <div className="letters">
            <label> Select File </label>
            <input  id="file" type="file" name="file" />
        </div>
        <div className='buttonsuser'>
            <button className='mainbutton'>Upload and create chart</button> &nbsp; &nbsp;
            <button className='mainbutton'>Cancel</button> 
        </div>
      </div>
    </div>
  );
}

export default NewChart;
