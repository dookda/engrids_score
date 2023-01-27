let showList = () => {
    axios.post("/api/courselist").then(r => {
        r.data.data.forEach(e => {
            document.getElementById("list").innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">รายวิชา ${e.sub_code} ${e.sub_name}</p>
                <button class="btn btn-success m-1" onclick="showCourse('${e.sub_code}')">แสดง</button>
                <button class="btn btn-warning m-1" onclick="deleteCourse('${e.sub_code}')">ลบ</button>
            </div>
          </div>`
        });
    })
}

let gotoInput = () => {
    location.href = "./../input/index.html";
}

let deleteCourse = (sub_code) => {
    axios.post("/api/deletecourse", { sub_code }).then(r => {
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