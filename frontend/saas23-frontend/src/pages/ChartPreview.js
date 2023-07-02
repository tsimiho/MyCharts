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

function ChartPreview({ user, setUser, userdata, setUserdata }) {
  const location = useLocation();
  const jsonData = JSON.parse(
    decodeURIComponent(new URLSearchParams(location.search).get("jsonData"))
  );
  const options = {};
  Object.entries(jsonData[0]).forEach(([key, value]) => {
    options[key] = JSON.parse(value);
  });

  const savechart = () => {
    console.log(userdata.email)
    axios.post("http://localhost:9001/api/create/linechart", {
            email: userdata.email,
            data: options, 
    });
  };

  return (
    <div className="background">
      {jsonData.length > 0 && (
        <div>
          <h2>CSV to JSON Conversion Result:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
      <Link to="/newchart">
          <button className="mainbutton" onClick={() => savechart()}>Save chart</button>
      </Link>
    </div>
  );
}

export default ChartPreview;