// ดึงค่าจำนวนครั้งที่เคยเข้าเว็บจาก localStorage
let visitCount = localStorage.getItem("page_visits");

// ถ้ายังไม่มีค่า ให้ตั้งต้นเป็น 1
if (!visitCount) {
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}

// บันทึกค่าใหม่ใน localStorage
localStorage.setItem("page_visits", visitCount);

// อัปเดตตัวเลขในหน้าเว็บ
document.getElementById("visitorCounter").innerText = "Visitors: " + visitCount;

// Go to Top Button Visibility
window.onscroll = function () {
    let goTopBtn = document.getElementById("goTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goTopBtn.style.display = "block";
    } else {
        goTopBtn.style.display = "none";
    }
};

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มปกติ
    var form = this;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById("successMessage").style.display = "block";
            form.reset(); // รีเซ็ตฟอร์มหลังจากส่งสำเร็จ
        } else {
            alert("There was an error. Please try again.");
        }
    }).catch(error => {
        alert("There was an error. Please try again.");
    });
});

    