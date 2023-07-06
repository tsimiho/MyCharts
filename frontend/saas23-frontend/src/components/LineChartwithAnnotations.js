import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Annotations from "highcharts/modules/annotations";
Annotations(Highcharts);

const LineChartWithAnnotations = ({ height, opts = null }) => {
    const options = opts
        ? opts
        : {
              chart: {
                  type: "line",
                  height: height,
              },
              title: {
                  text: "Line Chart with Annotations",
              },
              xAxis: {
                categories: ["Apples","Bananas","Oranges"]
              },
              yAxis: {
                  title: {
                      text: "Fruit Eatenn",
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
              exporting: {
                  enabled: false,
              },
              annotations: [
                  {
                      labelOptions: {
                          //shape: "connector",
                          verticalAlign: 'top',
                          y:10,
                          justify: true,
                          crop: true,
                          style: {
                              fontSize: "1em",
                              textOutline: "0.1px white",
                          },
                      },
                      labels: [
                          {
                              point: {
                                 xAxis: 0,
                                  yAxis: 0,
                                  x: 0,
                                  y: 5,
                                  
                              },
                              text: "John was really hungry",
                          },
                          {
                              point: {
                                  x: 2,
                                  y: 4,
                                  xAxis: 0,
                                  yAxis: 0,
                              },
                              text: "Jane was pretty hungry too",
                          },
                      ],
                  },
              ],
          };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChartWithAnnotations;
