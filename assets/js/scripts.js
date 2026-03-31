// assets/js/scripts.js

// 1) ปิด Loader เมื่อหน้าโหลดเสร็จ (รวมภาพ)
window.addEventListener("load", () => {
    // ดีเลย์นิดหน่อยให้เฟดสวยขึ้น
    setTimeout(() => document.body.classList.add("loaded"), 200);
});

// 2) Reveal Animation: เฟดขึ้นเมื่อใกล้เข้าหน้าจอ + ไล่ดีเลย์ทีละนิด
function initRevealAnimation() {
    const items = Array.from(document.querySelectorAll(".reveal"));

    if (items.length === 0) return; // ไม่มี reveal elements

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
}

// Trigger reveal animation after DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRevealAnimation);
} else {
    initRevealAnimation();
}

// Re-trigger when page content changes (dynamic loading)
window.addEventListener("page-loaded", initRevealAnimation);

// 3) ไฮไลต์เมนูตามพารามิเตอร์ (Desktop + Mobile)
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

  function clearAll(root) {
    root.querySelectorAll(
      ".dropdown-menu a, .offcanvas a.nav-link, .offcanvas a.dropdown-item"
    ).forEach((el) => el.classList.remove("active", "fw-bold"));
    // เคลียร์หัว "Product" (Desktop)
    const prod = root.querySelector("#productDropdown");
    prod?.classList.remove("active", "fw-bold");
  }

  function highlightAnchor(a, root) {
    if (!a) return false;

    clearAll(root);

    // ไฮไลต์เฉพาะตัวที่ตรง (ใช้สีเหลือง/หนา)
    a.classList.add("text-warning", "fw-bold");

    // ดันหัว "Product" (เฉพาะ Desktop) ให้เป็น active + เหลือง
    const topProduct =
      a.closest(".dropdown")?.querySelector("#productDropdown") ||
      root.querySelector("#productDropdown");
    if (topProduct) topProduct.classList.add("active", "fw-bold");

    return true;
  }

  function run() {
    const root = document.getElementById("navbar-placeholder");
    if (!root) return;

    // จัดลำดับความจำเพาะของ selector (หาใน Desktop + Mobile พร้อมกัน)
    const sel = [];
    if (cat && sub) {
      // 1) category + subcategory
      sel.push(
        `.navbar .dropdown-menu a[href*="category=${enc(cat)}"][href*="subcategory=${enc(sub)}"]`,
        `.offcanvas a[href*="category=${enc(cat)}"][href*="subcategory=${enc(sub)}"]`
      );
    } else if (cat && det) {
      // 2) category + detail
      sel.push(
        `.navbar .dropdown-menu a[href*="category=${enc(cat)}"][href*="detail=${enc(det)}"]`,
        `.offcanvas a[href*="category=${enc(cat)}"][href*="detail=${enc(det)}"]`
      );
    } else if (cat) {
      // 3) category อย่างเดียว (หัวข้อใหญ่)
      sel.push(
        // Desktop: เอาเฉพาะหัวข้อใหญ่ (dropdown-toggle) และตัด sub/detail ออก
        `.navbar .dropdown-menu a.dropdown-item.dropdown-toggle[href*="category=${enc(cat)}"]:not([href*="subcategory="]):not([href*="detail="])`,
        // Mobile: เอา link หัวข้อใหญ่เหมือนกัน (ไม่มี sub/detail)
        `.offcanvas a[href*="category=${enc(cat)}"]:not([href*="subcategory="]):not([href*="detail="])`
      );
    } else {
      // 4) Home (ไม่มี path หรือ index.html)
      const p = location.pathname.replace(/\/+$/, "");
      const isHome =
        p === "" || p === "/" || /\/index(\.html)?$/.test(p);

      if (isHome) {
        clearAll(root);
        // Desktop Home
        const homeDesktop =
          root.querySelector('.navbar .nav-link[href="../"]') ||
          root.querySelector('.navbar .nav-link[href="/"]') ||
          root.querySelector('.navbar .nav-link[href$="index.html"]');
        homeDesktop?.classList.add("active", "fw-bold");

        // Mobile Home
        const homeMobile =
          root.querySelector('.offcanvas .nav-link[href="../"]') ||
          root.querySelector('.offcanvas .nav-link[href="/"]') ||
          root.querySelector('.offcanvas .nav-link[href$="index.html"]');
        homeMobile?.classList.add("active", "fw-bold");
      }
      return;
    }

    // ไล่เช็คตามลำดับจนเจออันแรกที่แมตช์
    for (const s of sel) {
      const a = root.querySelector(s);
      if (highlightAnchor(a, root)) break;
    }
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
