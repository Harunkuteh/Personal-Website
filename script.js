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

document.getElementById("searchBtn").addEventListener("click", function () {
    let modal = document.getElementById("searchModal");

    // แสดง modal และให้แน่ใจว่ามันอยู่ตรงกลาง
    modal.style.display = "flex";  
    modal.style.alignItems = "center";  
    modal.style.justifyContent = "center";  

    // ล้างค่าช่องค้นหาและผลลัพธ์
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
});

document.getElementById("closeSearch").addEventListener("click", function () {
    document.getElementById("searchModal").style.display = "none";
});

window.onclick = function (event) {
    let modal = document.getElementById("searchModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// ฟังก์ชันการค้นหา
document.getElementById("searchSubmit").addEventListener("click", function () {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let sections = document.querySelectorAll("section"); 
    let resultsList = document.getElementById("searchResults");
    
    // ล้างผลลัพธ์เก่าออกก่อน
    resultsList.innerHTML = "";

    let found = false;
    sections.forEach(section => {
        if (section.innerText.toLowerCase().includes(searchQuery)) {
            let resultItem = document.createElement("div");  
            resultItem.innerHTML = `<a href="#${section.id}">${section.querySelector("h2")?.innerText || section.id}</a>`;
            resultItem.style.margin = "5px 0"; // ปรับระยะห่างระหว่างผลลัพธ์
            resultsList.appendChild(resultItem);
            found = true;
        }
    });

    if (!found) {
        resultsList.innerHTML = "<div>No results found</div>";
    }
});
