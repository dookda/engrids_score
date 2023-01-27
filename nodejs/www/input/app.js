
const currentUrl = new URL(window.location.href);
const param = currentUrl.searchParams.get("status");

const statusModal = new bootstrap.Modal('#statusInfo', {
    keyboard: false
})


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
    // $("#statusInfo").on("show.bs.modal")
    console.log("ok");
}
