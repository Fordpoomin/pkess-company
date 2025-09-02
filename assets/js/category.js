const q = new URLSearchParams(location.search);
const category = decodeURIComponent(q.get("category") || "");
const subcategory = decodeURIComponent(q.get("subcategory") || "");

// Navbar highlight
$("#navbar-placeholder").load("../assets/components/navbar.html", function () {
    $(`#navbar-placeholder .dropdown-menu a:contains("${category}")`)
        .first()
        .closest(".dropdown")
        .find("> .nav-link")
        .addClass("active text-warning fw-bold");
});
$("#footer-placeholder").load("../assets/components/footer.html");

// Breadcrumb + Hero
const bcCat = document.getElementById("bc-category");
const bcSub = document.getElementById("bc-subcategory");
const heroTitle = document.getElementById("hero-title");
const heroSub = document.getElementById("hero-sub");

if (subcategory) {
    heroTitle.textContent = subcategory;
    heroSub.textContent = category;
    bcCat.textContent = category || "Category";
    bcCat.href = `./category.html?category=${encodeURIComponent(category)}`;
    bcSub.textContent = subcategory;
} else {
    heroTitle.textContent = category || "Category";
    heroSub.textContent = "";
    bcCat.textContent = category || "Category";
    bcCat.href = `./category.html?category=${encodeURIComponent(category)}`;
    bcSub.parentElement.style.display = "none";
}

// ---------- Load from JSON ----------
const subGrid = document.getElementById("category-grid");
const directSection = document.getElementById("direct-items-section");
const directGrid = document.getElementById("direct-items-grid");
const subSection = document.getElementById("subcategory-section");
const subItemsSection = document.getElementById("sub-items-section");
const subItemsTitle = document.getElementById("sub-items-title");
const subItemsGrid = document.getElementById("sub-items-grid");

function cardHtml(it) {
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <a href="${it.link}" class="text-decoration-none text-dark d-block h-100">
          <div class="card-product">
            <div class="thumb"><img src="${it.img}" alt="${it.title}"></div>
            <div class="title"><span>${it.title}</span></div>
          </div>
        </a>
      </div>
    `;
}

async function initCategory() {
    try {
        const res = await fetch("../data/category.json", {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Cannot load category.json");
        const DATA = await res.json();

        const catData = DATA[category] || {};

        if (!subcategory) {
            // direct items (เช่น BMS)
            const directItems = catData._items || [];
            if (directItems.length) {
                directSection.style.display = "";
                directGrid.innerHTML = directItems.map(cardHtml).join("");
            }

            // subcategories
            const subs = Object.keys(catData).filter((k) => k !== "_items");
            if (subs.length) {
                subSection.style.display = "";
                subGrid.innerHTML = subs
                    .map((sub) => {
                        const first = catData[sub][0] || {};
                        const firstImg =
                            first.img ||
                            "../assets/images/products/placeholder.png";
                        const href = `./category.html?category=${encodeURIComponent(
                            category
                        )}&subcategory=${encodeURIComponent(sub)}`;
                        return `
              <div class="col-6 col-md-4 col-lg-3">
                <a href="${href}" class="text-decoration-none text-dark d-block h-100">
                  <div class="card-product">
                    <div class="thumb"><img src="${firstImg}" alt="${sub}"></div>
                    <div class="title"><span>${sub}</span></div>
                  </div>
                </a>
              </div>
            `;
                    })
                    .join("");
            }

            if (!directItems.length && (!subs || !subs.length)) {
                subSection.style.display = "";
                subGrid.innerHTML =
                    '<p class="text-muted text-center">No items found in this category.</p>';
            }
        } else {
            // subcategory items
            const items = catData[subcategory] || [];
            subItemsSection.style.display = "";
            subItemsTitle.textContent = subcategory;
            subItemsGrid.innerHTML = items.length
                ? items.map(cardHtml).join("")
                : '<p class="text-muted text-center">No items found in this subcategory.</p>';
        }
    } catch (err) {
        console.error(err);
        subSection.style.display = "";
        subGrid.innerHTML =
            '<div class="alert alert-danger">ไม่สามารถโหลดข้อมูลหมวดหมู่ได้</div>';
    }
}

initCategory();
