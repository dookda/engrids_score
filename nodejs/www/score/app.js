
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
        '&redirect_uri=http://localhost/login/index.html' +
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
    location.href = "./../input/index.html";
}

let gotoIndex = () => {
    location.href = "./../index.html";
}

let gotoReport = () => {
    location.href = "./../report/index.html";
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
    axios.post("/scoreapi/getscore", { token }).then(r => {
        // var sub_code;
        r.data.data.forEach(async (i, k) => {
            // console.log(i, k)
            document.getElementById("scorelist").innerHTML += `<p></p>
            <div class="col-12 col-lg-12">
                        <div class="icon-box2">
                            <div class="icon"><i class="bi bi-book"></i></div> <br>
                            <h4 class="title">${i.sub_code} ${i.sub_name}</h4>
                            <div class="lable">คะแนนเก็บ รายวิชา ${i.sub_code} ${i.sub_name} section ${i.sub_sect} </div>
                            <br>
                            <div class="table-responsive">
                        <table id="table${k}" class="display expandable-table" style="width:100%">
                            <thead>
                                <tr>
                                    <th>รหัสนักศึกษา</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th><span id="score1_${k}"></span></th>
                                    <th><span id="score2_${k}"></span></th>
                                    <th><span id="score3_${k}"></span></th>
                                    <th><span id="score4_${k}"></span></th>
                                    <th><span id="score5_${k}"></span></th>
                                    <th><span id="score6_${k}"></span></th>
                                </tr>
                                <tr>
                                    <td>${i.student_id}</td>
                                    <td>${i.firstname_th}</td>
                                    <td>${i.lastname_th}</td>
                                    <td>${i.score1}</td>
                                    <td>${i.score2}</td>
                                    <td>${i.score3}</td>
                                    <td>${i.score4}</td>
                                    <td>${i.score5}</td>
                                    <td>${i.score6}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                        </div>  
                    </div>`

            // sub_code = i.sub_code
            await axios.post("/scoreapi/getscore_header", { token, sub_code: i.sub_code }).then(r => {
                // console.log(r)
                r.data.data.forEach((i, k) => {
                    console.log(i, i.score1, k)
                    document.getElementById(`score1_${k}`).innerHTML = i.score1;
                    document.getElementById(`score2_${k}`).innerHTML = i.score2;
                    document.getElementById(`score3_${k}`).innerHTML = i.score3;
                    document.getElementById(`score4_${k}`).innerHTML = i.score4;
                    document.getElementById(`score5_${k}`).innerHTML = i.score5;
                    document.getElementById(`score6_${k}`).innerHTML = i.score6;
                })

            })
        });

        if (r.data.info.itaccounttype_TH !== "บุคลากร") {
            document.getElementById("profile").innerHTML = `
                <ul class="navbar">
                <a class="getstarted scrollto" href="#"> ${r.data.info.firstname_TH} ${r.data.info.lastname_TH} </a>
                <li><a class="nav-link scrollto" href="#" onclick="gotoInput()">กรอกคะแนน</a></li>
                <li><a class="nav-link scrollto" href="#" onclick="gotoReport()">ดูคะแนน</a></li>
                
                <li><a class="nav-link scrollto" href="#" onclick="gotoLogout()"> <i class="bx bx-log-out"
                style="font-size: larger;"></i> &nbsp; ออกจากระบบ</a></li>

            </ul>`
        } else {
            document.getElementById("profile").innerHTML = `<a class="getstarted scrollto" href="#"> ${r.data.info.firstname_TH} ${r.data.info.lastname_TH} </a>
                <ul class="navbar">
                <li><a class="nav-link scrollto" href="#" onclick="gotoLogout()"> <i class="bx bx-log-out"
                style="font-size: larger;"></i> &nbsp; ออกจากระบบ</a></li>
            </ul>`
        }
    });

} else {
    document.getElementById("profile").innerHTML = `
    <ul class="navbar">
    <li><a class="getstarted scrollto" href="#" onclick="gotoLogin()" id="profile"> <i class="bx bx-log-out"
    style="font-size: larger;"></i> &nbsp; เข้าสู่ระบบ</a></li>
    </ul>`
}

