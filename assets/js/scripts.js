// 1) ปิด Loader เมื่อหน้าโหลดเสร็จ (รวมภาพ)
window.addEventListener("load", () => {
    // ดีเลย์นิดหน่อยให้เฟดสวยขึ้น
    setTimeout(() => document.body.classList.add("loaded"), 200);
});

// 2) Reveal Animation: เฟดขึ้นเมื่อใกล้เข้าหน้าจอ + ไล่ดีเลย์ทีละนิด
document.addEventListener("DOMContentLoaded", () => {
    const items = Array.from(document.querySelectorAll(".reveal"));

    // กำหนด delay ไล่ลำดับ (60ms ต่อชิ้น)
    items.forEach((el, idx) =>
        el.style.setProperty("--delay", idx * 60 + "ms")
    );

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    // ถ้าอยากให้โชว์ครั้งเดียวแล้วหยุด observe:
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
});

// 3) ไฮไลต์ลิงก์เมนูที่ active (โค้ดเดิม)
document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.href;
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        if (link.href && currentUrl.includes(link.href))
            link.classList.add("active");
    });
});
