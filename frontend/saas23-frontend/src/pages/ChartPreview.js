import '../style/UserPage.css';
import {Link,Navigate,useParams} from 'react-router-dom'
import React, { useEffect,useState } from 'react';
import Highcharts from 'highcharts';
import FileUpload from '../components/FileUpload.js'
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import Sankey from 'highcharts/modules/sankey'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import csvtojson from 'csvtojson';

function ChartPreview() {
  const location = useLocation();
  const jsonData = JSON.parse(
    decodeURIComponent(new URLSearchParams(location.search).get("jsonData"))
  );
  console.log(jsonData[0])
  const options = {
    title: JSON.parse(jsonData[0].title),
    subtitle: JSON.parse(jsonData[0].subtitle),
    xAxis: JSON.parse(jsonData[0].xAxis),
    yAxis: JSON.parse(jsonData[0].yAxis),
    legend: JSON.parse(jsonData[0].legend),
    series: JSON.parse(jsonData[0].series),
  };
  return (
    <div className="background">
      {/* Your JSX code for the component */}
      {jsonData.length > 0 && (
        <div>
          <h2>CSV to JSON Conversion Result:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </div>
  );
}

export default ChartPreview;