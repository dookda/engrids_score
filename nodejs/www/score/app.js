
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
table = $('#table').DataTable({
    ajax: {
        type: 'POST',
        url: '/scoreapi/getscore',
        data: { token },
        dataSrc: 'data',
        // cache: true,
        destroy: true
    },
    columns: [
        { data: 'student_id' },
        { data: 'firstname_th' },
        { data: 'lastname_th' },
        { data: 'score1' },
        { data: 'score2' },
        { data: 'score3' },
        { data: 'score4' },
        { data: 'score5' },
        { data: 'score6' }
    ],
    scrollX: true,
    searching: false,
    bLengthChange: false,
    bInfo: false,
    bPaginate: false,
    columnDefs: [
        { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ],

});


if (token) {
    axios.post("/scoreapi/getscore", { token }).then(r => {
        r.data.data.forEach(i => {
            // console.log(i)
            document.getElementById("scorelist").innerHTML = `
            <div class="col-12 col-lg-12">
                        <div class="icon-box2">
                            <div class="icon"><i class="bi bi-book"></i></div> <br>
                            <h4 class="title">${i.sub_code} ${i.sub_name}</h4>
                            <div class="lable">คะแนนเก็บ รายวิชา ${i.sub_code} ${i.sub_name} section ${i.sub_sect} </div>
                            <br>
                            <div class="lable"> ครั้งที่ 1 : ${i.score1}  คะแนน</div>
                            <br>
                            <div class="table-responsive">
                                <table id="table2" class="display expandable-table" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>รหัสนักศึกษา</th>
                                            <th>ชื่อ</th>
                                            <th>นามสกุล</th>
                                            <th>ครั้งที่ 1</th>
                                            <th>ครั้งที่ 2</th>
                                            <th>ครั้งที่ 3</th>
                                            <th>ครั้งที่ 4</th>
                                            <th>ครั้งที่ 5</th>
                                            <th>ครั้งที่ 6</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>  
                    </div>`

            $('#table2').DataTable({
                ajax: {
                    type: 'POST',
                    url: '/scoreapi/getscore',
                    data: { token },
                    dataSrc: 'data',
                    // cache: true,
                    destroy: true
                },
                columns: [
                    { data: 'student_id' },
                    { data: 'firstname_th' },
                    { data: 'lastname_th' },
                    { data: 'score1' },
                    { data: 'score2' },
                    { data: 'score3' },
                    { data: 'score4' },
                    { data: 'score5' },
                    { data: 'score6' }
                ],
                scrollX: true,
                searching: false,
                bLengthChange: false,
                bInfo: false,
                bPaginate: false,
                columnDefs: [
                    { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
                ],

            });

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

