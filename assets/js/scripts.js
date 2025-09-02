// assets/js/scripts.js

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
                    // โชว์ครั้งเดียวแล้วหยุด observe
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
});

// 3) ไฮไลต์เมนูตามพารามิเตอร์ (ทำงานหลัง navbar ถูก .load() แล้ว)
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const sub = params.get("subcategory");
    const det = params.get("detail");
    const enc = (s) => (s ? encodeURIComponent(s) : null);

    function whenNavbarReady(cb) {
        const host = document.getElementById("navbar-placeholder");
        if (!host) return;
        if (host.querySelector(".navbar")) return cb();
        const mo = new MutationObserver(() => {
            if (host.querySelector(".navbar")) {
                mo.disconnect();
                cb();
            }
        });
        mo.observe(host, { childList: true, subtree: true });
    }

    function activateLink(a) {
        if (!a) return;
        // เคลียร์สภาวะเดิมในเมนูระดับเดียวกัน
        a.closest(".dropdown-menu")
            ?.querySelectorAll(".dropdown-item")
            .forEach((el) => el.classList.remove("active"));

        // ทำหัวข้อที่แมตช์ให้เหลือง/หนา (ห้ามใส่ .active เดี๋ยวถูก css สีอื่นทับ)
        a.classList.add("active");

        // ปุ่มบนสุด "Product" ให้ active + เหลือง + หนา
        const top = a
            .closest(".dropdown")
            ?.querySelector(".nav-link.dropdown-toggle");
        top?.classList.add("active", "text-warning", "fw-bold");

    }

    function run() {
        const root = document.getElementById("navbar-placeholder");
        if (!root) return;

        let selector = null;

        if (cat && sub) {
            // หน้า category + subcategory -> ไฮไลต์รายการย่อยจริง ๆ เท่านั้น
            selector = `.dropdown-menu a[href*="category=${enc(
                cat
            )}"][href*="subcategory=${enc(sub)}"]`;
        } else if (cat && det) {
            // หน้า category + detail -> ไฮไลต์รายการ detail เท่านั้น (เช่น BMS -> Cell Watch)
            selector = `.dropdown-menu a[href*="category=${enc(
                cat
            )}"][href*="detail=${enc(det)}"]`;
        } else if (cat) {
            // หน้า category อย่างเดียว -> ไฮไลต์ "หัวข้อใหญ่" ทางซ้าย
            // (ตัดลิงก์ที่เป็น sub/detail ออก และบังคับเป็นปุ่มหัวข้อด้วย .dropdown-toggle)
            selector =
                `.dropdown-menu a.dropdown-item.dropdown-toggle[href*="category=${enc(
                    cat
                )}"]` + `:not([href*="subcategory="]):not([href*="detail="])`;
        } else {
            // หน้า Home
            if (
                location.pathname.endsWith("/index.html") ||
                location.pathname === "/" ||
                location.pathname === ""
            ) {
                const home = root.querySelector(
                    '.navbar-nav .nav-link[href$="index.html"]'
                );
                home?.classList.add("active", "text-warning", "fw-bold");
            }
            return;
        }

        const a = root.querySelector(selector);
        activateLink(a);
    }

    whenNavbarReady(run);
});

// 4) Global <img> fallback: ถ้ารูปเสีย ให้ใช้ /assets/images/placeholder.png
document.addEventListener("DOMContentLoaded", () => {
    const FALLBACK_SRC = "/assets/images/placeholder.png";

    // ผูก onerror ให้รูปทีละตัว (กันลูปด้วย data-flag)
    function applyFallback(img) {
        if (!img || img.dataset.fallbackApplied === "1") return;
        img.onerror = () => {
            if (img.dataset.fallbackShown === "1") return; // กัน trigger ซ้ำ
            img.dataset.fallbackShown = "1";
            // กัน browser พยายามโหลดจาก srcset ต่อแล้ว error วน
            if (img.srcset) img.srcset = "";
            img.src = FALLBACK_SRC;
            if (!img.alt) img.alt = "image not available";
        };
        img.dataset.fallbackApplied = "1";
    }

    // รูปที่มีอยู่บนหน้าแล้ว
    document.querySelectorAll("img").forEach(applyFallback);

    // จับ error แบบ capture เผื่อบางรูปยังไม่ได้ผูก handler
    document.addEventListener(
        "error",
        (e) => {
            const el = e.target;
            if (el?.tagName === "IMG" && el.dataset.fallbackShown !== "1") {
                if (el.srcset) el.srcset = "";
                el.src = FALLBACK_SRC;
                el.dataset.fallbackShown = "1";
                if (!el.alt) el.alt = "image not available";
            }
        },
        true
    );

    // เฝ้าดู DOM เผื่อมีรูปถูกเพิ่มภายหลัง (เช่น โหลดผ่าน JS)
    const mo = new MutationObserver((muts) => {
        muts.forEach((m) => {
            m.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return; // ไม่ใช่ element
                if (node.tagName === "IMG") {
                    applyFallback(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll("img").forEach(applyFallback);
                }
            });
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
});
