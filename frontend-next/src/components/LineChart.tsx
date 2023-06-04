import React, { useRef, useCallback, forwardRef, RefObject } from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

Chart.register(CategoryScale);

interface LineChartProps {
  type: number;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
  title: string;
}

const LineChart = forwardRef<HTMLCanvasElement, LineChartProps>(
  ({ type, chartData, title }, ref) => {
    const downloadImage = useCallback(() => {
      const link = document.createElement("a");
      link.download = "chartimage.png";
      link.href = (ref as RefObject<HTMLCanvasElement>)?.current?.toDataURL("image/png") || "";
      link.click();
    }, [ref]);

    const downloadPDF = useCallback(() => {
      const input = window.document.getElementsByClassName(
        "chart-container"
      )[0];

      html2canvas(input as HTMLElement).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "pt");
        pdf.addImage(
          img,
          "png",
          50,
          50,
          input.clientWidth,
          input.clientHeight
        );
        pdf.save("chart.pdf");
      });
    }, []);

    return (
      <div>
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>{title}</h2>
          {type === 0 ? (
            <Line
              ref={ref as RefObject<any>}
              data={chartData}
              options={{
                plugins: {
                  /*title: {
display: true,
text: title
},*/
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          ) : (
              <Bar
                ref={ref as RefObject<any>}
                data={chartData}
                options={{
                  plugins: {
                    /*title: {
display: true,
text: title
},*/
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            )}
        </div>
        <div className="buttonsuser">
          <button className="mainbutton" onClick={downloadImage}>
            Download as image
          </button>
          &nbsp;&nbsp;
          <button className="mainbutton" onClick={downloadPDF}>
            Download as pdf
          </button>
        </div>
      </div>
    );
  }
);

LineChart.displayName = 'LineChart';

export default LineChart;
