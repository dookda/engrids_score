
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
    document.cookie = "score_token=; max-age=0; path=/;";
    document.cookie = "score_cmuitaccount=; max-age=0; path=/;";
    gotoIndex()
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

let gotoIndex = () => {
    location.href = "./index.html";
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

if (token) {
    axios.post('/scoreapi/getinfo', { token }).then(r => {
        // console.log(r);
        document.getElementById("username").innerHTML = `${r.data.info.firstname_TH} ${r.data.info.lastname_TH}`;

        if (token && r.data.info.itaccounttype_TH == "บุคลากร") {
            const currentUrl = new URL(window.location.href);
            const param = currentUrl.searchParams.get("status");

            const statusModal = new bootstrap.Modal('#statusInfo', {
                keyboard: false
            })

            document.getElementById("lecturer_fname").value = r.data.info.firstname_TH;
            document.getElementById("lecturer_lname").value = r.data.info.lastname_TH;
            document.getElementById("lecturer_account").value = r.data.info.cmuitaccount;

            if (param == "success") {
                document.getElementById("statusText").innerHTML = "อัพโหลดข้อมูลสำเร็จ";
                statusModal.show();
            } else if (param == "invalidform") {
                document.getElementById("statusText").innerHTML = "ฟอร์ม excel ไม่ถูกต้อง";
                statusModal.show();
            } else if (param == "error") {
                document.getElementById("statusText").innerHTML = "เกิดข้อผิดพลาด กรุณาลองใหม่";
                statusModal.show();
            } else {
                console.log("ok");
            }
        } else {
            gotoLogin();
        }
    })
} else {
    gotoLogin();
}


