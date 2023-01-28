
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
const itaccounttype_TH = getCookie("score_itaccounttype_th");
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
    document.cookie = "score_code=; max-age=0; path=/;";
    document.cookie = "score_firstname_TH=; max-age=0; path=/;";
    document.cookie = "score_lastname_TH=; max-age=0; path=/;";
    document.cookie = "score_student_id=; max-age=0; path=/;";
    document.cookie = "score_cmuitaccount=; max-age=0; path=/;";
    document.cookie = "score_itaccounttype_th=; max-age=0; path=/;";
    document.cookie = "score_auth=; max-age=0; path=/;";
    document.cookie = "score_organization_name_TH=; max-age=0; path=/;";
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

if (code && itaccounttype_TH == "บุคลากร") {

    const currentUrl = new URL(window.location.href);
    const param = currentUrl.searchParams.get("status");

    const statusModal = new bootstrap.Modal('#statusInfo', {
        keyboard: false
    })



    document.getElementById("lecturer_fname").value = firstname_TH;
    document.getElementById("lecturer_lname").value = lastname_TH;
    document.getElementById("lecturer_account").value = itaccounttype_TH;

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
    gotoLogout();
    gotoLogin();
}


