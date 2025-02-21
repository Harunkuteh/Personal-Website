// Retrieve the visit count from localStorage
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

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการโหลดซ้ำ

    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            window.location.href = "thankyou.html"; // ไปยังหน้าขอบคุณ
        } else {
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    }).catch(error => {
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("searchModal");

    // Ensure modal is hidden when page loads
    modal.style.display = "none";  
});

document.getElementById("searchBtn").addEventListener("click", function () {
    let modal = document.getElementById("searchModal");

    // Show modal when button is clicked
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";

    // Clear search input and results
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
});

document.getElementById("closeSearch").addEventListener("click", function () {
    document.getElementById("searchModal").style.display = "none";
});

window.onclick = function (event) {
    let modal = document.getElementById("searchModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
