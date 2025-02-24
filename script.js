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
    let searchResults = document.getElementById("searchResults");
    let searchInput = document.getElementById("searchInput");

    // Ensure modal is hidden when page loads
    modal.style.display = "none";  
    searchResults.innerHTML = ""; // Ensure results are clear on page load

    // Show modal on search button click
    document.getElementById("searchBtn").addEventListener("click", function () {
        modal.style.display = "flex";  // Show the modal
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";

        // Clear search input and results on opening the modal
        searchInput.value = "";
        searchResults.innerHTML = "";
    });

    // Close modal on close button click
    document.getElementById("closeSearch").addEventListener("click", function () {
        modal.style.display = "none";  // Hide the modal
    });

    // Close modal if clicked outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Handle search functionality
    document.getElementById("searchSubmit").addEventListener("click", function () {
        let searchQuery = searchInput.value.toLowerCase();
        let sections = document.querySelectorAll("section"); // Get all sections
        let found = false;

        // Clear previous results
        searchResults.innerHTML = "";

        sections.forEach(section => {
            if (section.innerText.toLowerCase().includes(searchQuery)) {
                let resultItem = document.createElement("div");  // Create a new div for each result
                resultItem.innerHTML = `<a href="#${section.id}">${section.querySelector("h2")?.innerText || section.id}</a>`;
                resultItem.style.margin = "5px 0"; // Add some spacing between results
                searchResults.appendChild(resultItem); // Append result item to results container
                found = true;
            }
        });

        if (!found) {
            searchResults.innerHTML = "<div>No results found</div>"; // Show message if no results
        }
    });
});

// เมื่อคลิก hamburger จะเปิด/ปิดเมนู
document.getElementById("hamburgerBtn").addEventListener("click", function() {
    let navMenu = document.querySelector("header nav");
    navMenu.classList.toggle("active");
});
