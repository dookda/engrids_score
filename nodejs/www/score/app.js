let showList = () => {
    axios.post("/api/courselist").then(r => {
        r.data.data.forEach(e => {
            document.getElementById("list").innerHTML += `<button class="btn btn-success m-1" onclick="showTable('${e.sub_code}')">วิชา ${e.sub_code}</button>`
        });
    })
}

var table = $('#table').DataTable();
let showTable = (sub_code) => {
    $('#table').DataTable().destroy();
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