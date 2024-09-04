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
    $("#list").empty();
    axios.post("/p4000/scoreapi/courselist", { token, lecturer_account }).then(r => {
        // console.log(r);

        document.getElementById("username").innerHTML = `${r.data.info.firstname_TH} ${r.data.info.lastname_TH}`;

        $("#list").append(`<option value="0">กรุณาคลิกเลือกรายวิชาที่ต้องการตรวจสอบ</option>`)

        if (token && r.data.info.itaccounttype_TH == "บุคลากร") {
            r.data.data.map(e => {
                // console.log(e)
                if (e.sub_code !== null) {
                    $("#list").append(`<option value='{"sub_code":"${e.sub_code}","sub_sect":"${e.sub_sect}","sub_name":"${e.sub_name}"}'>${e.sub_code} ${e.sub_name} ตอน ${e.sub_sect}</option>`)

                }
            });
        }
    })
}




var modal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false,
    backdrop: 'static'
})

var modalselect = new bootstrap.Modal(document.getElementById('modalselect'), {
    keyboard: false,
    backdrop: 'static'
})

let modalConfirm = () => {
    const confirmlist = document.getElementById("list").value
    const confirmJson = JSON.parse(confirmlist)
    // console.log(confirmJson.sub_code)
    if (confirmJson.sub_code !== undefined) {
        document.getElementById("subname").innerHTML = confirmJson.sub_code + " " + confirmJson.sub_name + " " + "ตอน" + " " + confirmJson.sub_sect
        modal.show();
    } else if (confirmJson.sub_code == undefined) {
        document.getElementById("check").innerHTML = 'ลบ'
        modalselect.show();
    }

}

let deleteCourse = () => {
    const deletelist = document.getElementById("list").value
    const deleteJson = JSON.parse(deletelist)
    console.log(deleteJson.sub_code)
    axios.post("/p4000/scoreapi/deletecourse", { token, lecturer_account, sub_code: deleteJson.sub_code }).then(r => {
        modal.hide();
        refreshPage();
    })
}

let table = $('#table').DataTable();
let showCourseHeader = (sub_code, sub_sect) => {
    // console.log(table);
    axios.post("/p4000/scoreapi/getdata_header", { token, lecturer_account, sub_code: sub_code, sub_sect: sub_sect }).then(r => {
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

let showCourse = () => {
    const list = document.getElementById("list").value
    const listJson = JSON.parse(list)
    console.log(listJson.sub_code)
    if (listJson) {
        showCourse1(listJson.sub_code, listJson.sub_sect)
    } else {
        document.getElementById("check").innerHTML = 'ตรวจสอบ'
        modalselect.show();
    }
}


let showCourse1 = (sub_code, sub_sect) => {

    $('#table').DataTable().destroy()
    $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/p4000/scoreapi/getdata',
            data: { token, lecturer_account, sub_code: sub_code, sub_sect: sub_sect },
            dataSrc: 'data',
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

    showCourseHeader(sub_code, sub_sect);


}

$(document).ready(function () {
    if (token) {
        showList();
        // getList();

    } else {
        // $('#profile').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
        gotoLogin();
    }
});

