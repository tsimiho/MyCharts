// components/LineChart.js
import React, {useRef, useCallback} from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf"
const pdfConverter = require("jspdf");

Chart.register(CategoryScale);
function LineChart({ type, chartData, title }) {
  let ref = useRef(null);

  const downloadimage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chartimage.png";
    link.href = ref.current.toBase64Image();
    link.click();
  },[]);

  const downloadpdf = useCallback(() => {
    let input = window.document.getElementsByClassName("chart-container")[0];

    html2canvas(input).then(canvas => {
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
  })
})

  return (
    <div>
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        { type === 0 ? 
          <Line ref={ref}
          data={chartData}
          options={{
            plugins: {
              /*title: {
                display: true,
                text: title
              },*/
              legend: {
                display: false
              },
            }
          }}
          /> :
          <Bar ref={ref}
            data={chartData}
            options={{
              plugins: {
                /*title: {
                  display: true,
                  text: title
                },*/
                legend: {
                  display: false
                },
              }
            }}
          />
        }
        
      </div>
      <div className='buttonsuser'>
        <button className="mainbutton" onClick={downloadimage}> Download as image</button>&nbsp;&nbsp;
        <button className="mainbutton" onClick={downloadpdf}> Download as pdf</button>
      </div>
    </div>
  );
}
export default LineChart;
