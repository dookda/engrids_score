
let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const token = getCookie("score_token");
const lecturer_account = getCookie("score_cmuitaccount");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
        '&redirect_uri=https://engrids.soc.cmu.ac.th/p4000/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=score'
    window.location.href = url;
}

let gotoLogout = () => {
    document.cookie = "score_token=; max-age=0; path=/;";
    document.cookie = "score_cmuitaccount=; max-age=0; path=/;";
    gotoIndex()
}

let gotoInput = () => {
    location.href = "https://engrids.soc.cmu.ac.th/p4000/input/index.html";
}

let gotoIndex = () => {
    location.href = "https://engrids.soc.cmu.ac.th/p4000/index.html";
}

let gotoReport = () => {
    location.href = "https://engrids.soc.cmu.ac.th/p4000/report/index.html";
}

$.extend(true, $.fn.dataTable.defaults, {
    "language": {
        "sProcessing": "กำลังดำเนินการ...",
        "sLengthMenu": "แสดง_MENU_ แถว",
        "sZeroRecords": "ไม่พบข้อมูล",
        "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
        "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
        "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
        "sInfoPostFix": "",
        "sSearch": "ค้นหา:",
        "sUrl": "",
        "oPaginate": {
            "sFirst": "เริ่มต้น",
            "sPrevious": "ก่อนหน้า",
            "sNext": "ถัดไป",
            "sLast": "สุดท้าย"
        },
        "emptyTable": "ไม่พบข้อมูล..."
    }
});



if (token) {
    axios.post("/p4000/scoreapi/getscore", { token }).then(r => {
        // var sub_code;
        r.data.data.forEach(async (i, k) => {
            // console.log(i, k)
            document.getElementById("scorelist").innerHTML += `<p></p>
            <div class="col-12 ">
                        <div class="icon-box2">
                            <div class="icon"><i class="bi bi-book"></i></div> <br>
                            <h4 class="title">${i.sub_code} ${i.sub_name}</h4>
                            <div class="lable">คะแนนเก็บ รายวิชา ${i.sub_code} ${i.sub_name} section ${i.sub_sect} </div>
                            <br>
                            <div class="table-responsive">
                        <table id="table${k}" class="display expandable-table" style="width:100%; border: 1px">
                            <thead>
                                <tr>
                                    <th>รหัสนักศึกษา</th>
                                    <th class="col-2"> ชื่อ - นามสกุล</th>
                                    <th><span id="score1_${k}"></span></th>
                                    <th><span id="score2_${k}"></span></th>
                                    <th><span id="score3_${k}"></span></th>
                                    <th><span id="score4_${k}"></span></th>
                                    <th><span id="score5_${k}"></span></th>
                                    <th><span id="score6_${k}"></span></th>
                                </tr>
                                <tr>
                                    <td>${i.student_id}</td>
                                    <td>${i.firstname_th} &nbsp;${i.lastname_th}</td>
                                    <td>${i.score1 ? i.score1 : ""}</td>
                                    <td>${i.score2 ? i.score2 : ""}</td>
                                    <td>${i.score3 ? i.score3 : ""}</td>
                                    <td>${i.score4 ? i.score4 : ""}</td>
                                    <td>${i.score5 ? i.score5 : ""}</td>
                                    <td>${i.score6 ? i.score6 : ""}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                        </div>  
                    </div>`

            // sub_code = i.sub_code
            await axios.post("/p4000/scoreapi/getscore_header", { token, sub_code: i.sub_code, sub_sect: i.sub_sect }).then(r => {
                // console.log(r)
                r.data.data.forEach((i) => {
                    // console.log(i, i.score1, k)
                    document.getElementById(`score1_${k}`).innerHTML = i.score1 !== "null" ? i.score1 : "";
                    document.getElementById(`score2_${k}`).innerHTML = i.score2 !== "null" ? i.score2 : "";
                    document.getElementById(`score3_${k}`).innerHTML = i.score3 !== "null" ? i.score3 : "";
                    document.getElementById(`score4_${k}`).innerHTML = i.score4 !== "null" ? i.score4 : "";
                    document.getElementById(`score5_${k}`).innerHTML = i.score5 !== "null" ? i.score5 : "";
                    document.getElementById(`score6_${k}`).innerHTML = i.score6 !== "null" ? i.score6 : "";
                })

            })
        });

        if (r.data.data == "") {
            document.getElementById("scorelist").innerHTML += ` <div class="col-12 col-lg-12">
    <div class="icon-box2">
        <div class=""> <img src="./../assets/img/not-found1.png" width="60px"></div> <br>
        <h1 class="title2">ไม่พบข้อมูล</h1>
        <div class="lable" style="font-size: 18px;">ไม่พบข้อมูลคะแนนรายวิชาของท่าน กรุณาเข้าตรวจสอบคะแนนใหม่อีกครั้ง
        </div>
        <br>
    </div>
</div>`
        }

        if (r.data.info.itaccounttype_TH == "บุคลากร") {
            document.getElementById("profile").innerHTML = `
                <ul class="navbar">
                <a class="getstarted scrollto" href="#"> ${r.data.info.firstname_TH} ${r.data.info.lastname_TH} </a>
                <li><a class="nav-link scrollto" href="#" onclick="gotoInput()">กรอกคะแนน</a></li>
                <li><a class="nav-link scrollto" href="#" onclick="gotoReport()">ตรวจสอบคะแนน</a></li>
                <li><a class="nav-link scrollto" href="#" onclick="gotoLogout()"><span><i class="bx bx-log-out"
                style="font-size: larger;"></i>&nbsp;ออกจากระบบ</span></a></li>

            </ul>`
        } else {
            document.getElementById("profile").innerHTML = `
                <ul class="navbar">
                <a class="getstarted scrollto" href="#"> ${r.data.info.firstname_TH} ${r.data.info.lastname_TH} </a>
                <li><a class="nav-link scrollto" href="#" onclick="gotoLogout()"><span><i class="bx bx-log-out"
                style="font-size: larger;"></i>&nbsp;ออกจากระบบ</span></a></li>
            </ul>`
        }
    });

} else {
    document.getElementById("profile").innerHTML = `
    <ul class="navbar">
    <li><a class="getstarted scrollto" href="#" onclick="gotoLogin()" id="profile"> <span><i class="bx bx-log-in"
    style="font-size: larger;"></i> &nbsp; เข้าสู่ระบบ</span></a></li>
    </ul>`
    document.getElementById("scorelist").innerHTML += ` <div class="col-12 col-lg-12">
    <div class="icon-box2">
        <div class="icon"><i class="bx bx-log-in" style="font-size: 42px;"></i></div>
        <h1 class="title2">กรุณาเข้าสู่ระบบ</h1>
        <div class="lable" style="font-size: 18px;">กรุณาเข้าสู่ระบบเพื่อตรวจสอบคะแนนของท่าน
        </div>
        <br>
    </div>
</div>`
}

