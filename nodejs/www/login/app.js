
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')
const state = urlParams.get('state')

let setCookie = (token, cmuitaccount, minute) => {
    const d = new Date();
    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    d.setTime(d.getTime() + (minute * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "score_token=" + token + ";" + expires + ";path=/";
    document.cookie = "score_cmuitaccount=" + cmuitaccount + ";" + expires + ";path=/";
}

let itcmuaccount = (token) => {
    axios.post("/scoreapi/getinfo", { token }).then(r => {
        console.log(r);
        setCookie(token, r.data.info.cmuitaccount, 10)
        window.location.replace("./../" + state);
    })
}

if (code) {
    axios.post('/scoreapi/gettoken', { code }).then(r => {
        itcmuaccount(r.data)
    })
}



