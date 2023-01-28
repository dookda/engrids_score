
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

const code = getCookie("score_code");
const firstname_TH = getCookie("score_firstname_TH");
const lastname_TH = getCookie("score_lastname_TH");
const student_id = getCookie("score_student_id");
const organization_name_TH = getCookie("score_organization_name_TH");
const cmuitaccount = getCookie("score_cmuitaccount");
const auth = getCookie("score_auth");

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
    document.cookie = "open_code=; max-age=0; path=/;";
    document.cookie = "open_firstname_TH=; max-age=0; path=/;";
    document.cookie = "open_lastname_TH=; max-age=0; path=/;";
    document.cookie = "open_student_id=; max-age=0; path=/;";
    document.cookie = "open_auth=; max-age=0; path=/;";
    document.cookie = "open_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

let gotoIndex = () => {
    location.href = "./index.html";
}



let showList = () => {
    axios.post("/scoreapi/courselist").then(r => {
        r.data.data.forEach(e => {
            document.getElementById("list").innerHTML += `<div class="card mt-1 mb-2">
            <div class="card-body">
                <div class="row"> 
                    <div class="col-sm-6 align-self-center">
                        <span class="card-text ">รายวิชา ${e.sub_code} ${e.sub_name}</span>
                    </div>
                    <div class="col-sm-6">
                        <button class="btn btn-success m-1" onclick="showCourse('${e.sub_code}')">แสดงคะแนน</button>
                        <button class="btn btn-warning m-1" onclick="deleteCourse('${e.sub_code}')">ลบ</button>
                    </div>
                </div>
            </div>
          </div>`
        });
    })
}

let deleteCourse = (sub_code) => {
    axios.post("/scoreapi/deletecourse", { sub_code }).then(r => {
        location.reload();
    })
}

let table = $('#table').DataTable();
let showCourse = (sub_code) => {
    $('#table').DataTable().destroy()

    var table = $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/scoreapi/getdata',
            data: { sub_code: sub_code },
            dataSrc: 'data',
            // cache: true,
            destroy: true
        },
        columns: [
            { data: 'pid' },
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
            { data: 'dt' }
        ],
        "order": [[1, 'asc']],
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": true,
        select: {
            style: 'os',
            selector: 'td:first-child'
        }
        // dom: 'Bfrtip',
        // buttons: [
        //     'excel', 'print'
        // ],
        // responsive: true,
        // scrollX: true,
        // order: [[5, 'asc']],
    });
}



$(document).ready(function () {
    if (code) {
        showList();
    } else {
        // $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
        gotoLogin();
    }
});