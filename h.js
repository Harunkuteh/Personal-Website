// ฟังก์ชันสำหรับเพิ่มจำนวนผู้ชมในแต่ละ section
function updateVisitorCount(sectionId) {
    // ดึงจำนวนผู้ชมจาก localStorage หรือใช้ 0 ถ้าไม่มีข้อมูล
    let visitors = localStorage.getItem(sectionId);
    visitors = visitors ? parseInt(visitors) : 0;

    // เพิ่มจำนวนผู้ชม
    visitors += 1;

    // บันทึกจำนวนผู้ชมใหม่กลับไปที่ localStorage
    localStorage.setItem(sectionId, visitors);

    // แสดงจำนวนผู้ชมในหน้าเว็บ
    document.getElementById(`${sectionId}-visitors`).textContent = visitors;
}

// ตรวจสอบว่าเมื่อผู้ใช้ไปที่ส่วนต่าง ๆ ของเว็บไซต์
document.addEventListener('DOMContentLoaded', function () {
    // อัปเดตจำนวนผู้ชมสำหรับแต่ละ section เมื่อโหลดหน้าเว็บ
    updateVisitorCount('home');
    updateVisitorCount('about');
    updateVisitorCount('portfolio');
    updateVisitorCount('skills');
    updateVisitorCount('contact');
});
