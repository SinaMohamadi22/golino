const filterShopSection = document.querySelector(".filter-shop-section");

const filterTemplate = `
    <article class="filter-content dark:text-white font-iranyekan w-full">

        <div>
            <aside class="text-222223 dark:text-white font-medium">
                جستجو
            </aside>

            <aside>
                <input
                    class="product-search w-full lg:w-9/10 my-2 border-E1E1E1 border outline-FEE3E8 text-737373 font-normal p-2.5 rounded-lg bg-white text-sm leading-1.5"
                    type="search"
                    placeholder="جستجو ..."
                >
            </aside>
        </div>

        <div>
            <aside>
                قیمت
            </aside>

            <aside>
                <div class="relative w-full h-5 py-5">

                    <input
                        id="minPrice"
                        type="range"
                        min="0"
                        max="18000000"
                        value="0"
                        class="range-input w-full"
                    >

                    <input
                        id="maxPrice"
                        type="range"
                        min="0"
                        max="18000000"
                        value="18000000"
                        class="range-input w-full"
                    >

                </div>
            </aside>

            <aside class="lg:pl-4 text-sm text-151515 dark:text-white font-normal text-center">

                <span class="values-min">
                    0
                </span>

                <span class="values-suffix">
                    تومان
                </span>

                —

                <span class="values-max">
                    18،000،000
                </span>

                <span class="values-suffix">
                    تومان
                </span>

            </aside>
        </div>

        <div class="relative">

            <aside class="pb-2 mt-5 font-iranyekan font-semibold">
                انتخاب گل
            </aside>

            <button
                id="flowerSelect"
                type="button"
                class="flex justify-between w-full lg:w-9/10 p-2.5 rounded-lg border border-737373 text-737373 text-sm font-semibold font-iranyekan text-right"
            >
                <span class="flower-selected">
                    انتخاب...
                </span>

                <svg
                    id="flowerSelect-icon"
                    class="size-4 text-222223 font-bold transition-all"
                >
                    <use href="#chevron-down"></use>
                </svg>
            </button>

            <div
                id="flowerOptions"
                class="hidden absolute top-full right-0 mt-1 w-full lg:w-9/10 bg-white dark:bg-zinc-700 border text-737373 dark:text-white *:hover:bg-FEE3E8 *:hover:text-black border-737373 rounded-lg shadow-lg z-50 overflow-hidden"
            >

                <div
                    class="flower-option p-2.5 cursor-pointer font-iranyekan text-sm"
                    data-value=""
                >
                    انتخاب...
                </div>

                <div
                    class="flower-option p-2.5 cursor-pointer font-iranyekan text-sm"
                    data-value="آلستر"
                >
                    آلستر
                </div>

                <div
                    class="flower-option p-2.5 cursor-pointer font-iranyekan text-sm"
                    data-value="انتریوم"
                >
                    انتریوم
                </div>

                <div
                    class="flower-option p-2.5 cursor-pointer font-iranyekan text-sm"
                    data-value="داوودی"
                >
                    داوودی
                </div>

                <div
                    class="flower-option p-2.5 cursor-pointer font-iranyekan text-sm"
                    data-value="رز"
                >
                    رز
                </div>

            </div>

        </div>

        <div class="font-iranyekan mt-5">

            <aside>
                دسته بندی
            </aside>

            <aside>

                <ul class="flex flex-col gap-3 mt-2.5">

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="باکس گل"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                باکس گل
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="جام گل"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                جام گل
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="دسته گل"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                دسته گل
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="سبد گل"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                سبد گل
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="گل آپارتمانی"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                گل آپارتمانی
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden category-filter"
                                value="گل آرایی"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                گل آرایی
                            </span>

                        </label>
                    </li>

                </ul>

            </aside>

        </div>

        <div class="font-iranyekan py-2.5 mt-3">

            <aside>
                مناسبت
            </aside>

            <aside>

                <ul class="flex flex-col gap-3 mt-2.5">

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden occasion-filter"
                                value="ترحیم"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                ترحیم
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden occasion-filter"
                                value="هدیه"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                هدیه
                            </span>

                        </label>
                    </li>

                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input
                                type="checkbox"
                                class="peer hidden occasion-filter"
                                value="تسلیت"
                            >

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full peer-checked:bg-red peer-checked:border-red after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:font-bold after:text-white after:content-['✓'] after:hidden peer-checked:after:block"
                            ></span>

                            <span>
                                تسلیت
                            </span>

                        </label>
                    </li>

                </ul>

            </aside>

        </div>

    </article>
`;

let allProducts = [];
let selectedFlower = "";

function renderFilter(isDesktop) {

    const oldFilter =
        filterShopSection.querySelector(".filter-wrapper");

    if (oldFilter) {
        oldFilter.remove();
    }

    const wrapper =
        document.createElement(isDesktop ? "div" : "details");

    wrapper.className = isDesktop
        ? "filter-wrapper w-full lg:w-25/100 shrink-0"
        : "filter-wrapper w-full";

    if (!isDesktop) {

        wrapper.innerHTML = `
            <summary class="flex bg-white dark:bg-zinc-600 border text-151515 dark:text-white gap-x-2 border-E1E1E1 p-2.5 rounded-xl items-center cursor-pointer font-iranyekan font-semibold py-3">

                <aside>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#151515"
                            d="M10 19h4v-2h-4zm-4-6h12v-2H6zM3 5v2h18V5z"
                        ></path>
                    </svg>
                </aside>

                <span>
                    فیلتر محصولات
                </span>

            </summary>

            ${filterTemplate}
        `;

    } else {

        wrapper.innerHTML = filterTemplate;

    }

    filterShopSection.prepend(wrapper);

    initializeFilters();
}

function initializeFilters() {

    const filterWrapper =
        filterShopSection.querySelector(".filter-wrapper");

    if (!filterWrapper) return;

    const flowerSelect =
        filterWrapper.querySelector("#flowerSelect");

    const flowerSelectIcon =
        filterWrapper.querySelector("#flowerSelect-icon");

    const flowerOptions =
        filterWrapper.querySelector("#flowerOptions");

    if (
        flowerSelect &&
        flowerSelectIcon &&
        flowerOptions
    ) {

        flowerSelect.addEventListener("click", () => {

            flowerOptions.classList.toggle("hidden");

            flowerSelectIcon.classList.toggle("rotate-180");

        });

        const flowerItems =
            flowerOptions.querySelectorAll(".flower-option");

        flowerItems.forEach((item) => {

            item.addEventListener("click", () => {

                selectedFlower =
                    item.dataset.value || "";

                const selectedText =
                    item.textContent.trim();

                const selectedElement =
                    flowerSelect.querySelector(".flower-selected");

                selectedElement.textContent =
                    selectedText;

                flowerOptions.classList.add("hidden");

                flowerSelectIcon.classList.remove(
                    "rotate-180"
                );

                applyFilters();

            });

        });

    }

    const searchInput =
        filterWrapper.querySelector(".product-search");

    searchInput?.addEventListener("input", () => {

        applyFilters();

    });

    const minPrice =
        filterWrapper.querySelector("#minPrice");

    const maxPrice =
        filterWrapper.querySelector("#maxPrice");

    minPrice?.addEventListener("input", () => {

        updatePriceValues();

        applyFilters();

    });

    maxPrice?.addEventListener("input", () => {

        updatePriceValues();

        applyFilters();

    });

    const categoryFilters =
        filterWrapper.querySelectorAll(".category-filter");

    categoryFilters.forEach((checkbox) => {

        checkbox.addEventListener("change", () => {

            applyFilters();

        });

    });

    const occasionFilters =
        filterWrapper.querySelectorAll(".occasion-filter");

    occasionFilters.forEach((checkbox) => {

        checkbox.addEventListener("change", () => {

            applyFilters();

        });

    });

    updatePriceValues();
}

function getSelectedCategories() {

    const wrapper =
        filterShopSection.querySelector(".filter-wrapper");

    if (!wrapper) return [];

    return [
        ...wrapper.querySelectorAll(".category-filter:checked")
    ].map((checkbox) => checkbox.value);
}

function getSelectedOccasions() {

    const wrapper =
        filterShopSection.querySelector(".filter-wrapper");

    if (!wrapper) return [];

    return [
        ...wrapper.querySelectorAll(".occasion-filter:checked")
    ].map((checkbox) => checkbox.value);
}

function hasTag(product, tag) {

    if (!tag) return true;

    if (!Array.isArray(product.tags)) {
        return false;
    }

    return product.tags.some((item) => {

        return String(item).trim() ===
            String(tag).trim();

    });
}

function getFilteredProducts() {

    const wrapper =
        filterShopSection.querySelector(".filter-wrapper");

    if (!wrapper) {
        return allProducts;
    }

    const searchInput =
        wrapper.querySelector(".product-search");

    const searchValue =
        searchInput?.value.trim().toLowerCase() || "";

    const minPrice =
        Number(
            wrapper.querySelector("#minPrice")?.value || 0
        );

    const maxPrice =
        Number(
            wrapper.querySelector("#maxPrice")?.value ||
            18000000
        );

    const selectedCategories =
        getSelectedCategories();

    const selectedOccasions =
        getSelectedOccasions();

    return allProducts.filter((product) => {

        const title =
            String(product.title || "").toLowerCase();

        const matchesSearch =
            !searchValue ||
            title.includes(searchValue);

        if (!matchesSearch) {
            return false;
        }

        const price =
            Number(product.price) || 0;

        const matchesPrice =
            price >= minPrice &&
            price <= maxPrice;

        if (!matchesPrice) {
            return false;
        }

        const matchesFlower =
            !selectedFlower ||
            hasTag(product, selectedFlower);

        if (!matchesFlower) {
            return false;
        }

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        if (!matchesCategory) {
            return false;
        }

        const matchesOccasion =
            selectedOccasions.length === 0 ||
            selectedOccasions.some((occasion) => {
                return hasTag(product, occasion);
            });

        if (!matchesOccasion) {
            return false;
        }

        return true;

    });
}

function sortProducts(products) {

    const sortingSelect =
        document.querySelector(".sorting-select");

    const sortValue =
        sortingSelect?.value || "";

    const sortedProducts =
        [...products];

    switch (sortValue) {

        case "popular":

            sortedProducts.sort((a, b) => {

                return Number(b.rating || 0) -
                    Number(a.rating || 0);

            });

            break;

        case "expensive":

            sortedProducts.sort((a, b) => {

                return Number(b.price || 0) -
                    Number(a.price || 0);

            });

            break;

        case "cheap":

            sortedProducts.sort((a, b) => {

                return Number(a.price || 0) -
                    Number(b.price || 0);

            });

            break;

    }

    return sortedProducts;
}

function renderFilteredProducts(productsToShow) {

    const productContainer =
        document.querySelector(".product-container");

    if (!productContainer) return;

    const sortedProducts =
        sortProducts(productsToShow);

    const productCards =
        [
            ...productContainer.querySelectorAll(".product-card")
        ];

    const cardsMap =
        new Map();

    productCards.forEach((card) => {

        cardsMap.set(
            String(card.dataset.id),
            card
        );

    });

    productCards.forEach((card) => {

        card.classList.add("hidden");

    });

    sortedProducts.forEach((product) => {

        const card =
            cardsMap.get(String(product.id));

        if (!card) return;

        card.classList.remove("hidden");

        productContainer.appendChild(card);

    });
}

function applyFilters() {

    if (!allProducts.length) return;

    const filteredProducts =
        getFilteredProducts();

    renderFilteredProducts(filteredProducts);
}

function updatePriceValues() {

    const wrapper =
        filterShopSection.querySelector(".filter-wrapper");

    if (!wrapper) return;

    const minInput =
        wrapper.querySelector("#minPrice");

    const maxInput =
        wrapper.querySelector("#maxPrice");

    if (!minInput || !maxInput) return;

    let min =
        Number(minInput.value);

    let max =
        Number(maxInput.value);

    if (min > max) {

        if (document.activeElement === minInput) {

            min = max;

            minInput.value = max;

        } else {

            max = min;

            maxInput.value = min;

        }

    }

    const minText =
        wrapper.querySelector(".values-min");

    const maxText =
        wrapper.querySelector(".values-max");

    if (minText) {

        minText.textContent =
            min.toLocaleString("fa-IR");

    }

    if (maxText) {

        maxText.textContent =
            max.toLocaleString("fa-IR");

    }
}

if (window.products?.length) {

    allProducts =
        window.products;

}

document.addEventListener("productsLoaded", (event) => {

    allProducts =
        event.detail || [];

    applyFilters();

});

const sortingSelect =
    document.querySelector(".sorting-select");

sortingSelect?.addEventListener("change", () => {

    applyFilters();

});

const mediaQuery =
    window.matchMedia("(min-width: 768px)");

renderFilter(mediaQuery.matches);

mediaQuery.addEventListener("change", (event) => {

    selectedFlower = "";

    renderFilter(event.matches);

    if (allProducts.length) {
        applyFilters();
    }

});