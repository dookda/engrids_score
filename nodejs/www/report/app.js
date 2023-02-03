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
        '&state=report'
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

let showList = () => {
    axios.post("/scoreapi/courselist", { token, lecturer_account }).then(r => {
        document.getElementById("username").innerHTML = `${r.data.info.firstname_TH} ${r.data.info.lastname_TH}`;

        if (token && r.data.info.itaccounttype_TH !== "บุคลากร") {
            r.data.data.forEach(e => {
                document.getElementById("list").innerHTML += `<div class=" mt-1 mb-2">
                <div class="card-body card-a" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;">
                    <div class="row"> 
                        <div class="col-sm-5 align-self-center">
                            <span class="card-text">รายวิชา: <b> ${e.sub_code} ${e.sub_name} </b></span>
                        </div>
                        <div class="col-sm-7">
                            <button class="btn btn-rscore m-1" onclick="showCourse('${e.sub_code}')">แสดงคะแนน</button>
                            <button class="btn btn-delt m-1" onclick="modalConfirm('${e.sub_code}', '${e.sub_name}')">ลบ</button>
                        </div>
                    </div>
                </div>
              </div>`
            });
        }
    })
}

var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false,
    backdrop: 'static'
})

let modalConfirm = (sub_code, sub_name) => {
    document.getElementById("sub_code").value = sub_code
    document.getElementById("subname").innerHTML = sub_code + " " + sub_name
    modal.show();
}

let deleteCourse = () => {
    let sub_code = document.getElementById("sub_code").value;
    axios.post("/scoreapi/deletecourse", { token, lecturer_account, sub_code }).then(r => {
        modal.hide();
        refreshPage();
    })
}

let table = $('#table').DataTable();
let showCourseHeader = (sub_code) => {
    // console.log(table);
    axios.post("/scoreapi/getdata_header", { token, lecturer_account, sub_code: sub_code }).then(r => {
        var i = 0;
        for (const [key, value] of Object.entries(r.data.data[0])) {
            // console.log(`${key}: ${value}`);
            if (i > 6 && i < 13) {
                $('#table').DataTable().columns(i - 1).header().to$().text(value);
            }
            i++;
        }
    })
}


let showCourse = (sub_code) => {
    $('#table').DataTable().destroy()
    $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/scoreapi/getdata',
            data: { token, lecturer_account, sub_code: sub_code },
            dataSrc: 'data',
            // cache: true,
            destroy: true
        },
        columns: [
            { data: 'sub_code' },
            { data: 'sub_name' },
            { data: 'sub_sect' },
            { data: 'student_id' },
            { data: 'firstname_th' },
            { data: 'lastname_th' },
            { data: 'score1' },
            { data: 'score2' },
            { data: 'score3' },
            { data: 'score4' },
            { data: 'score5' },
            { data: 'score6' },
            { data: 'date' }
        ],
        "order": [[1, 'asc']],
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": true,
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        "scrollX": true,
        columnDefs: [
            { className: 'text-center', targets: [6, 7, 8, 9, 10, 11] },
        ],
        // dom: 'Bfrtip',
        // buttons: [
        //     'excel', 'print'
        // ],
        // responsive: true,
        // scrollX: true,
        // order: [[5, 'asc']],

    });

    showCourseHeader(sub_code);
}

$(document).ready(function () {
    if (token) {
        showList();
    } else {
        // $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
        gotoLogin();
    }
});