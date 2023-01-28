
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

const code = getCookie("open_code");
const firstname_TH = getCookie("open_firstname_TH");
const lastname_TH = getCookie("open_lastname_TH");
const student_id = getCookie("open_student_id");
const organization_name_TH = getCookie("open_organization_name_TH");
const cmuitaccount = getCookie("open_cmuitaccount");
const auth = getCookie("open_auth");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=input'
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

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let gotoAdmin = () => {
    location.href = './../admin/index.html';
}

let gotoManage_user = () => {
    location.href = "./../manage_user/index.html";
}

let gotoManage = () => {
    location.href = "./../manage/index.html";
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
        '&redirect_uri=http://localhost/login/index.html' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=dashboard'
    window.location.href = url;
};

let gotoIndex = () => {
    location.href = "./index.html";
}

if (code) {
    $('#profile').html(`
    <li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="ff-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
        <ul>
            <li><a href="#" onclick="gotoProfile()"><span class="ff-noto">โปรไฟล์</span> </a></li>
            <li><a href="#" onclick="gotoInput()"><span class="ff-noto">เพิ่มข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoManage()"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
            <li><a href="#" onclick="gotoLogout()"><span class="ff-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
        </ul>
    </li>`);
    if (auth == "admin") {
        $('#profile').html(`<li class="dropdown" > <a class="active" href="#" > <i class="bi bi-person-circle" style="font-size: 22px;"></i> <span class="ff-noto">&nbsp; ${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
            <ul>
                <li><a href="#" onclick="gotoProfile()"><span class="ff-noto">โปรไฟล์</span> </a></li>
                <li><a href="#" onclick="gotoInput()"><span class="ff-noto">เพิ่มข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoManage()"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
                <li><a href="#" onclick="gotoAdmin()"><span class="ff-noto">การจัดการผู้ใช้</span></a></li>
                <li><a href="#" onclick="gotoLogout()"><span class="ff-noto">ออกจากระบบ</span><i class="bi bi-door-closed" style="font-size: 18px;"></i></a></li>
            </ul>
        </li>`)
    }
    createid();
} else {
    $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin();
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
            url: '/api/getdata',
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
    showList()
});