import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";


const DepWheelmy = ({options}) => {
  HighchartsExporting(Highcharts);
  HighchartsAccessibility(Highcharts);
  Sankey(Highcharts);
  HighchartsDependencyWheel(Highcharts);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DepWheelmy;