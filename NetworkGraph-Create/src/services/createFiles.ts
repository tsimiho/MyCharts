// import * as puppeteer from "puppeteer";
// import * as Highcharts from "highcharts";
// import ExportingModule from "highcharts/modules/exporting";
// import ExportingCSVModule from "highcharts/modules/export-data";
// import ExportingOfflineModule from "highcharts/modules/offline-exporting";
// import fs from "fs";

// // // Enable Highcharts exporting modules
// ExportingModule(Highcharts);
// // ExportingCSVModule(Highcharts);
// // ExportingOfflineModule(Highcharts);

// const create = async (chartData: Highcharts.Options) => {
//     try {
//         const chartOptions: Highcharts.Options = {
//             ...chartData,
//         };
//         const chart = Highcharts.chart("container", chartOptions);

//         const svg = chart.getSVG();

//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         const pngPromise = chart.exportChartLocal({
//             type: "image/png",
//             filename: "chart.png",
//         });

//         const htmlPromise = chart.exportChartLocal({
//             type: "image/svg+xml",
//             filename: "chart.html",
//         });

//         await page.setContent(svg);
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const pdfFile = await page.pdf();
//         const svgFile = await page.evaluate(() => document.body.innerHTML);
//         const [pngFile, htmlFile] = await Promise.all([
//             pngPromise,
//             htmlPromise,
//         ]);

//         // Need to save files
//         fs.writeFileSync("chart.pdf", pdfFile);
//         fs.writeFileSync("chart.svg", svgFile);

//         if (typeof pngFile === "string") {
//             fs.writeFileSync("chart.png", pngFile);
//         } else {
//             console.error("Invalid PNG file content.");
//         }

//         if (typeof htmlFile === "string") {
//             fs.writeFileSync("chart.html", htmlFile);
//         } else {
//             console.error("Invalid HTML file content.");
//         }
//         await browser.close();
//     } catch (error) {
//         console.error("Error generating and saving files:", error);
//     }
// };

// export default create;
