import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ height, opts = null }) => {
    const options = opts
        ? opts
        : {
              chart: {
                  type: "column",
                  height: height,
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
              exporting: {
                  enabled: false,
              },
          };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
