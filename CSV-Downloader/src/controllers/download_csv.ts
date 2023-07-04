import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const download_csv = async (req: Request, res: Response) => {
    const parameter = req.query.param; // Accessing the parameter
    console.log(parameter);
    const filePath = path.join(__dirname, "../csv_files/"+parameter+".csv");

    res.setHeader("Content-Disposition", 'attachment; filename="descriptiontemplate.csv"');
    res.sendFile(filePath);
};

export default download_csv;
