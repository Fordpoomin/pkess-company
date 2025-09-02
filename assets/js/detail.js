const q = new URLSearchParams(location.search);
const category = decodeURIComponent(q.get("category") || "");
const subcategory = decodeURIComponent(q.get("subcategory") || "");
const detail = decodeURIComponent(q.get("detail") || "");

// Navbar + footer
$("#navbar-placeholder").load("../assets/components/navbar.html", function () {
    if (category) {
        $(`#navbar-placeholder .dropdown-menu a:contains("${category}")`)
            .first()
            .closest(".dropdown")
            .find("> .nav-link")
            .addClass("active text-warning fw-bold");
    }
});
$("#footer-placeholder").load("../assets/components/footer.html");

// Hero & breadcrumb
const heroTitle = document.getElementById("hero-title");
const heroSub = document.getElementById("hero-sub");
const bcCat = document.getElementById("bc-category");
const bcSub = document.getElementById("bc-subcategory");
const bcSubLi = bcSub.parentElement;
const bcDetail = document.getElementById("bc-detail");

heroTitle.textContent = detail || "Detail";
heroSub.textContent = subcategory
    ? `${category} • ${subcategory}`
    : `${category}`;
bcCat.textContent = category || "Category";
bcDetail.textContent = detail || "Detail";

if (subcategory) {
    bcCat.href = `./category.html?category=${encodeURIComponent(category)}`;
    bcSub.textContent = subcategory;
    bcSub.href = `./category.html?category=${encodeURIComponent(
        category
    )}&subcategory=${encodeURIComponent(subcategory)}`;
    bcSubLi.style.removeProperty("display");
} else {
    bcCat.href = `./category.html?category=${encodeURIComponent(category)}`;
    bcSubLi.style.display = "none";
}

// ---------- Load DETAIL_DATA from JSON ----------
function getDetailData(DETAIL_DATA, cat, sub, name) {
    const byCat = DETAIL_DATA?.[cat] || {};
    const bySub = byCat?.[sub] ?? byCat?.[""] ?? {};
    return bySub?.[name];
}

async function initDetail() {
    try {
        const res = await fetch("../data/detail.json", {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load detail.json");
        const DETAIL_DATA = await res.json();

        const data = getDetailData(DETAIL_DATA, category, subcategory, detail);
        const imgEl = document.getElementById("detail-image");
        const titleEl = document.getElementById("detail-title");
        const contentEl = document.getElementById("detail-content");
        const imageRow = document.getElementById("image-row");

        if (data) {
            titleEl.textContent = detail;
            imgEl.src =
                data.imgs && data.imgs[0]
                    ? data.imgs[0]
                    : "../assets/images/products/placeholder.png";
            imgEl.alt = detail;
            contentEl.innerHTML = data.html;

            if (Array.isArray(data.imgs) && data.imgs.length > 1) {
                let html = `<div class="row mt-4 rounded m-0">`;
                data.imgs.slice(1).forEach((src) => {
                    html += `<div class="col-12 px-0"><img src="${src}" class="img-fluid w-100" alt="${detail}"></div>`;
                });
                html += `</div>`;
                imageRow.innerHTML = html;
            }
        } else {
            titleEl.textContent = detail || "Detail";
            imgEl.src = "../assets/images/products/placeholder.png";
            imgEl.alt = "no image";
            contentEl.innerHTML = `<p class="text-muted">Coming soon...</p>`;
        }
    } catch (err) {
        console.error(err);
        document.getElementById(
            "detail-content"
        ).innerHTML = `<div class="alert alert-danger">ไม่สามารถโหลดข้อมูลสินค้าได้</div>`;
        document.getElementById("detail-image").src =
            "../assets/images/products/placeholder.png";
    }
}

initDetail();
