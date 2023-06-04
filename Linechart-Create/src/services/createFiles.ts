import * as puppeteer from "puppeteer";
import * as Highcharts from "highcharts";
import ExportingModule from "highcharts/modules/exporting";
import ExportingCSVModule from "highcharts/modules/export-data";
import ExportingOfflineModule from "highcharts/modules/offline-exporting";

// Enable Highcharts exporting modules
ExportingModule(Highcharts);
ExportingCSVModule(Highcharts);
ExportingOfflineModule(Highcharts);
// Enable Highcharts exporting module
ExportingModule(Highcharts);

async function create(chartData: Highcharts.Options) {
    try {
        const chartOptions: Highcharts.Options = {
            ...chartData,
        };
        const chart = Highcharts.chart("container", chartOptions);

        const svg = chart.getSVG();

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const pngPromise = chart.exportChartLocal({
            type: "image/png",
            filename: "chart.png",
        });

        const htmlPromise = chart.exportChartLocal({
            type: "image/svg+xml",
            filename: "chart.html",
        });

        await page.setContent(svg);
        await new Promise((resolve) => setTimeout(resolve, 1000)); 

        const pdfFile = await page.pdf();
        const svgFile = await page.evaluate(() => document.body.innerHTML);
        const [pngFile, htmlFile] = await Promise.all([
            pngPromise,
            htmlPromise,
        ]);

        // Need to save files

        await browser.close();
    } catch (error) {
        console.error("Error generating and saving files:", error);
    }
}

export default create;
