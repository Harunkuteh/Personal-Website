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


document.addEventListener('DOMContentLoaded', function() {
    const popularItems = document.querySelectorAll('.popular-item');
    
    // ตัวอย่างการเปลี่ยนแปลงเนื้อหาหลังจากโหลด
    popularItems.forEach((item, index) => {
        item.querySelector('p').innerText = `Updated Description for Item ${index + 1}`;
    });
});

// ฟังก์ชันเพิ่มจำนวนผู้ชมในแต่ละ section
function updateVisitorCount(sectionId) {
    let visitors = localStorage.getItem(sectionId);
    visitors = visitors ? parseInt(visitors) : 0;
    visitors += 1;
    localStorage.setItem(sectionId, visitors);
    document.getElementById(`${sectionId}-visitors`).textContent = visitors;
}

// ฟังก์ชันติดตามการเข้าชม
function setupVisitorTracking() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            const sectionId = link.getAttribute('href').substring(1);
            updateVisitorCount(sectionId);
        });
    });
}

// ฟังก์ชันดึงข้อมูล Section ที่มีคนดูมากที่สุด
function getMostPopularSection() {
    const sections = ["home", "about", "portfolio", "skills", "contact"];
    let mostPopular = { id: null, views: 0 };

    sections.forEach(section => {
        let views = localStorage.getItem(section) ? parseInt(localStorage.getItem(section)) : 0;
        if (views > mostPopular.views) {
            mostPopular.id = section;
            mostPopular.views = views;
        }
    });

    return mostPopular;
}

// ฟังก์ชันดึง 3 อันดับแรกของ Section ที่มีคนดูมากที่สุด
function getTopThreePopularSections() {
    let sections = ["home", "about", "portfolio", "skills", "contact"];
    let sectionViews = [];

    // ดึงข้อมูลจาก localStorage และเก็บใน array
    sections.forEach(section => {
        let views = localStorage.getItem(section) ? parseInt(localStorage.getItem(section)) : 0;
        sectionViews.push({ id: section, views: views });
    });

    // เรียงลำดับจากมากไปน้อย
    sectionViews.sort((a, b) => b.views - a.views);
    
    // เอาแค่ 3 อันดับแรก
    return sectionViews.slice(0, 3);
}


// ฟังก์ชันแสดง 3 อันดับยอดนิยม
function showMostPopular() {
    let topSections = getTopThreePopularSections(); // ฟังก์ชันที่ดึงข้อมูล 3 อันดับ
    let popularResults = document.getElementById("popularResults");

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (topSections.length > 0 && topSections[0].views > 0) {
        popularResults.innerHTML = topSections.map((section, index) =>
            `<div class="popular-section">
                <div class="rank">${index + 1}</div>
                <a href="#${section.id}" onclick="scrollToSection('${section.id}')">
                    ${section.id.toUpperCase()}
                </a>
                <div class="views">${section.views} views</div>
            </div>`
        ).join("");
    } else {
        popularResults.innerHTML = "ยังไม่มีข้อมูลการเข้าชม";
    }
}



// ฟังก์ชันเลื่อนหน้าไปยัง Section ที่คลิก
function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// โหลดข้อมูล The Most Popular เมื่อหน้าเว็บโหลด
document.addEventListener('DOMContentLoaded', function () {
    setupVisitorTracking();
    ["home", "about", "portfolio", "skills", "contacts"].forEach(updateVisitorCount);
    
    // แสดง The Most Popular
    showMostPopular();
});


// เปิด Modal เมื่อคลิกปุ่ม "The Most Popular"
document.getElementById("popularBtn").addEventListener("click", function() {
    document.getElementById("popularModal").style.display = "flex";
    showMostPopular();
});

// ปิด Modal
document.getElementById("closePopular").addEventListener("click", function() {
    document.getElementById("popularModal").style.display = "none";
});

// ปิด Modal เมื่อคลิกข้างนอก
window.onclick = function(event) {
    let modal = document.getElementById("popularModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

