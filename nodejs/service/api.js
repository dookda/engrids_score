const express = require('express');
const app = express.Router();
const pg = require('pg');
const xlsx = require('xlsx');
const db = require("./db").db;

const multer = require("multer");

// const axios = require('axios');

let insetXlsxtoDb = (fname, pid, sub_code, sub_name, sub_sect) => {
    const workbook = xlsx.readFile('uploads/' + fname);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 6, raw: true });

    data.forEach(r => {
        let student_id = r["รหัสนักศึกษา"] ? r["รหัสนักศึกษา"] : null;
        let firstname_th = r["ชื่อ - นามสกุล"] ? r["ชื่อ - นามสกุล"] : null;
        let lastname_th = r["__EMPTY"] ? r["__EMPTY"] : null;
        let score1 = r["1"] ? r["1"] : null;
        let score2 = r["2"] ? r["2"] : null;
        let score3 = r["3"] ? r["3"] : null;
        let score4 = r["4"] ? r["4"] : null;
        let score5 = r["5"] ? r["5"] : null;
        let score6 = r["6"] ? r["6"] : null;
        let sql = `INSERT INTO score(pid, sub_code, sub_name, sub_sect, student_id,firstname_th, lastname_th, score1, score2, score3, score4, score5, score6, dt)
                    VALUES('${pid}','${sub_code}','${sub_name}','${sub_sect}','${student_id}','${firstname_th}','${lastname_th}',${score1},${score2},${score3},${score4},${score5},${score6},now())`;
        console.log(sql);
        db.query(sql).then(() => console.log("insert ok"));
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, "a" + new Date().valueOf() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    let pid = "a" + new Date().valueOf();
    let { sub_code } = req.body;
    let { sub_name } = req.body;
    let { sub_sect } = req.body;
    insetXlsxtoDb(req.file.filename, pid, sub_code, sub_name, sub_sect);
    // res.status(200);
    res.redirect('http://localhost/')
});

app.get("/api/getdata", (req, res) => {
    const sql = `SELECT * FROM ndvi ORDER BY dd DESC`;
    console.log(sql);
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        });
    });
});

module.exports = app;