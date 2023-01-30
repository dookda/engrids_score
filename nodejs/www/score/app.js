
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

if (token) {
    axios.post("/scoreapi/getscore", { token }).then(r => {
        r.data.data.forEach(i => {
            document.getElementById("scorelist").innerHTML = `<div class="card mb-2">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <div class="lable">คะแนนเก็บ รายวิชา ${i.sub_code} ${i.sub_name} section ${i.sub_sect} : ${i.score1}  คะแนน</div>
                    </div>
                </div>
            </div>`
        });

        if (r.data.info.itaccounttype_TH == "บุคลากร") {
            document.getElementById("profile").innerHTML = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false"> <span class="form-label">${r.data.info.firstname_TH} ${r.data.info.lastname_TH}</span></a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="gotoInput()">กรอกคะแนน</a></li>
                <li><a class="dropdown-item" href="#" onclick="gotoReport()">ดูคะแนน</a></li>
                <li><a class="dropdown-item" href="#" onclick="gotoLogout()">logout</a></li>
        </ul>`
        } else {
            document.getElementById("profile").innerHTML = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false"> <span class="form-label">${r.data.info.firstname_TH} ${r.data.info.lastname_TH}</span></a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="gotoLogout()">logout</a></li>
            </ul>`
        }

    });
} else {
    document.getElementById("profile").innerHTML = `<button class="btn btn-info" onclick="gotoLogin()" >เข้าสู่ระบบ</button>`
}