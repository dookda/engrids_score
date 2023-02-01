const express = require('express');
const app = express.Router();
const xlsx = require('xlsx');
const XLSX = require('xlsx');
const db = require("./db").db;
const axios = require('axios');
const qs = require('qs');
const crypto = require('crypto');
const multer = require("multer");
const fs = require('fs');


// Oauth CMU
const loginMiddleware = (req, res, next) => {
    const data = {
        code: req.body.code,
        redirect_uri: "http://localhost/login/index.html",
        client_id: "vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz",
        client_secret: "g07dxSNJN48n6WXk6d7RGWNgZ1UkuXJJGECQnf2B",
        grant_type: "authorization_code"
    };

    const url = "https://oauth.cmu.ac.th/v1/GetToken.aspx"
    const headers = { 'content-type': 'application/x-www-form-urlencoded' }

    axios.post(url, qs.stringify(data), headers).then((r) => {
        res.status(200).json(r.data.access_token);

    }).catch((error) => {
        req.status = "valid";
    })
}

app.post("/scoreapi/gettoken", loginMiddleware, (req, res) => {
    res.status(200).json(req.status)
})

let getUserinfo = (req, res, next) => {
    const { token } = req.body
    let config = {
        method: 'get',
        url: 'https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Cookie': 'BIGipServermisapi_pool=536964618.20480.0000'
        }
    }; 3
    axios(config).then(resp => {
        req.info = resp;
        next();
    })
}

app.post("/scoreapi/getinfo", getUserinfo, (req, res) => {
    res.status(200).json({
        info: req.info.data
    });
})

let insetXlsxtoDb = (fname, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect) => {
    return new Promise((resolve, reject) => {
        try {
            const workbook = xlsx.readFile('uploads/' + fname);
            // const workbook = XLSX.readFile('./uploads/test.xlsx');
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            var range = XLSX.utils.decode_range(sheet['!ref']);
            for (var rowNum = range.s.r + 6; rowNum <= range.e.r; rowNum++) {
                var rowValues = [];
                for (var colNum = range.s.c; colNum <= range.e.c; colNum++) {
                    var cellAddress = XLSX.utils.encode_cell({ c: colNum, r: rowNum });
                    var cell = sheet[cellAddress];
                    var cellValue = cell ? cell.v : null;
                    rowValues.push(cellValue);
                }
                // console.log(rowValues, rowNum);
                if (rowNum > 6) {
                    let sql = `INSERT INTO score(lecturer_fname, lecturer_lname, lecturer_account,pid, sub_code, sub_name, sub_sect, student_id,firstname_th, lastname_th, score1, score2, score3, score4, score5, score6, dt)
                                VALUES('${lecturer_fname}','${lecturer_lname}','${lecturer_account}','${pid}','${sub_code}','${sub_name}','${sub_sect}',
                                '${rowValues[1]}','${rowValues[2]}','${rowValues[3]}',${rowValues[4]},${rowValues[5]},${rowValues[6]},${rowValues[7]},${rowValues[8]},${rowValues[9]},now())`;
                    db.query(sql).then(() => console.log("insert ok"));
                    // console.log(sql);
                } else {
                    let sql = `INSERT INTO score_header(lecturer_fname, lecturer_lname, lecturer_account,pid, sub_code, sub_name, sub_sect, student_id,firstname_th, lastname_th, score1, score2, score3, score4, score5, score6, dt)
                    VALUES('${lecturer_fname}','${lecturer_lname}','${lecturer_account}','${pid}','${sub_code}','${sub_name}','${sub_sect}',
                    '${rowValues[1]}','${rowValues[2]}','${rowValues[3]}','${rowValues[4]}','${rowValues[5]}','${rowValues[6]}','${rowValues[7]}','${rowValues[8]}','${rowValues[9]}',now())`;
                    db.query(sql).then(() => console.log("insert ok"));
                    // console.log(sql);
                }
            }

            // remove excel
            fs.unlinkSync(workbook);

            resolve("success")
        } catch (error) {
            resolve("error")
        }
    })
}

// upload
let insetXlsxtoDb2 = (fname, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect) => {
    const workbook = xlsx.readFile('uploads/' + fname);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(sheet, { range: 6, raw: true });
    return new Promise((resolve, reject) => {
        if (data[0]["ที่"], data[0]["รหัสนักศึกษา"]) {
            try {
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
                    let sql = `INSERT INTO score(lecturer_fname, lecturer_lname, lecturer_account,pid, sub_code, sub_name, sub_sect, student_id,firstname_th, lastname_th, score1, score2, score3, score4, score5, score6, dt)
                    VALUES('${lecturer_fname}','${lecturer_lname}','${lecturer_account}','${pid}','${sub_code}','${sub_name}','${sub_sect}','${student_id}','${firstname_th}','${lastname_th}',${score1},${score2},${score3},${score4},${score5},${score6},now())`;
                    // console.log(sql);
                    db.query(sql).then(() => console.log("insert ok"));
                });
                resolve("success")
            } catch (error) {
                resolve("error")
            }
        } else {
            resolve("invalidform")
        }
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
app.post("/scoreapi/upload", upload.single("file"), (req, res) => {
    let pid = "a" + new Date().valueOf();
    let { lecturer_fname, lecturer_lname, lecturer_account, sub_code, sub_name, sub_sect } = req.body;
    insetXlsxtoDb(req.file.filename, lecturer_fname, lecturer_lname, lecturer_account, pid, sub_code, sub_name, sub_sect).then(r => {
        if (r == "success") {
            res.redirect('http://localhost/report/index.html')
        } else {
            res.redirect('http://localhost/input/index.html?status=' + r)
        }
    });
});


app.post("/scoreapi/courselist", getUserinfo, (req, res) => {
    const { lecturer_account } = req.body;
    const sql = `SELECT DISTINCT sub_code, sub_name FROM score WHERE lecturer_account='${lecturer_account}' `;

    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows,
            info: req.info.data
        });
    });
});

app.post("/scoreapi/getdata_header", getUserinfo, (req, res) => {
    const { lecturer_account, sub_code } = req.body;

    const sql = `SELECT pid,sub_code,sub_name,sub_sect,student_id,firstname_th,lastname_th,score1,score2,score3,score4,score5,score6,dt FROM score_header WHERE lecturer_account='${lecturer_account}' AND sub_code='${sub_code}'`;
    db.query(sql).then(r => {
        res.status(200).json({ data: r.rows });
    });
});

app.post("/scoreapi/getdata", getUserinfo, (req, res) => {
    const { lecturer_account, sub_code } = req.body;

    const sql = `SELECT *,   TO_CHAR(dt, 'DD-MM-YYYY') as date  FROM score WHERE lecturer_account='${lecturer_account}' AND sub_code='${sub_code}'`;
    db.query(sql).then(r => {
        res.status(200).json({ data: r.rows });
    });
});


app.post("/scoreapi/getscore", getUserinfo, (req, res) => {
    // const { lecturer_account, sub_code } = req.body;
    // console.log(req.info.data);
    // const sql = `SELECT * FROM score WHERE student_id='${req.info.data.student_id}'`;
    const sql = `SELECT * FROM score WHERE student_id='${req.info.data.student_id}'`;
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows,
            info: req.info.data
        });
    });
});

app.post("/scoreapi/getscore_header", getUserinfo, (req, res) => {
    const { sub_code } = req.body;
    // console.log(req.info.data);
    // const sql = `SELECT * FROM score WHERE student_id='${req.info.data.student_id}'`;
    const sql = `SELECT * FROM score_header WHERE sub_code='${sub_code}'`;
    console.log(sql);
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows,
            info: req.info.data
        });
    });
});

app.post("/scoreapi/deletecourse", getUserinfo, (req, res) => {
    const { lecturer_account, sub_code } = req.body
    const sql = `DELETE FROM score WHERE lecturer_account='${lecturer_account}' AND sub_code='${sub_code}'`;

    db.query(sql).then(r => {
        res.status(200).json({ data: "remove success" });
    });
});

module.exports = app;