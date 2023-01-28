
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')
const state = urlParams.get('state')

let setCookie = (code, firstname_TH, lastname_TH, student_id, organization_name_TH, cmuitaccount, itaccounttype_th, auth, minute) => {
    const d = new Date();
    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    d.setTime(d.getTime() + (minute * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "score_code=" + code + ";" + expires + ";path=/";
    document.cookie = "score_firstname_TH=" + firstname_TH + ";" + expires + ";path=/";
    document.cookie = "score_lastname_TH=" + lastname_TH + ";" + expires + ";path=/";
    document.cookie = "score_student_id=" + student_id + ";" + expires + ";path=/";
    document.cookie = "score_cmuitaccount=" + cmuitaccount + ";" + expires + ";path=/";
    document.cookie = "score_itaccounttype_th=" + itaccounttype_th + ";" + expires + ";path=/";
    document.cookie = "score_auth=" + auth + ";" + expires + ";path=/";
    document.cookie = "score_organization_name_TH=" + organization_name_TH + ";" + expires + ";path=/";
}

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});

if (code) {
    console.log(code);
    axios.post('/scoreapi/gettoken', { code }).then(r => {
        console.log(r);
        // setCookie(code, r.data.data.firstname_TH, r.data.data.lastname_TH, r.data.data.student_id, r.data.data.organization_name_TH, r.data.data.cmuitaccount, r.data.data.itaccounttype_TH, r.data.auth, 30)
        // window.location.replace("./../" + state);
    })
}



