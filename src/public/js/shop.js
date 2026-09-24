const filterShopSection = document.querySelector(".filter-shop-section");
const filterTemplate = `
    <article class="filter-content dark:text-white font-iranyekan w-full">
        <div>
            <aside class="text-222223 dark:text-white font-medium">
                جستجو
            </aside>

            <aside>
                <input
                    class="w-full lg:w-9/10 my-2 border-E1E1E1 border outline-FEE3E8 text-737373 font-normal p-2.5 rounded-lg bg-white text-sm leading-1.5"
                    type="search"
                    placeholder="جستجو ..."
                >
            </aside>
        </div>


        <!-- قیمت -->
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
                        class="range-input"
                    >

                    <input
                        id="maxPrice"
                        type="range"
                        min="0"
                        max="18000000"
                        value="18000000"
                        class="range-input"
                    >

                </div>
            </aside>

            <aside
                class=" lg:pl-4 text-sm text-151515 dark:text-white font-normal text-center"
            >
                <span class="values-min">
                    900،000
                </span>

                <span class="values-suffix">
                    تومان
                </span>

                —

                <span class="values-prefix"></span>

                <span class="values-max">
                    18،000،000
                </span>

                <span class="values-suffix">
                    تومان
                </span>
            </aside>

        </div>


        <!-- انتخاب گل -->
        <div class="relative">

            <aside
                class="pb-2 mt-5 font-iranyekan font-semibold"
            >
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
                class="hidden absolute top-full right-0 mt-1 w-full lg:w-9/10 bg-white border text-737373 hover:text-black border-737373 rounded-lg shadow-lg z-50 overflow-hidden"
            >

                <div
                    class="flower-option p-2.5 hover:bg-FEE3E8 cursor-pointer font-iranyekan text-sm"
                >
                    انتخاب...
                </div>

                <div
                    class="flower-option p-2.5 hover:bg-FEE3E8 cursor-pointer font-iranyekan text-sm"
                >
                    آلستر
                </div>

                <div
                    class="flower-option p-2.5 hover:bg-FEE3E8 cursor-pointer font-iranyekan text-sm"
                >
                    انتریوم
                </div>

                <div
                    class="flower-option p-2.5 hover:bg-FEE3E8 cursor-pointer font-iranyekan text-sm"
                >
                    داوودی
                </div>

                <div
                    class="flower-option p-2.5 hover:bg-FEE3E8 cursor-pointer font-iranyekan text-sm"
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

                            <input type="checkbox" class="peer hidden">
                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                باکس گل
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="peer hidden">
                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                جام گل
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">
                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                دسته گل
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                سبد گل
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                گل آپارتمانی
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-xs
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
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

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                ترحیم
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                عرض تبریک
                            </span>

                        </label>
                    </li>


                    <li class="font-medium leading-3.5 text-sm hover:text-red cursor-pointer">
                        <label class="flex items-center gap-2 cursor-pointer">

                            <input type="checkbox" class="peer hidden">

                            <span
                                class="relative block size-4.5 border border-gray-400 rounded-full
                                peer-checked:bg-red
                                peer-checked:border-red
                                after:absolute after:left-1/2 after:top-1/2
                                after:-translate-x-1/2 after:-translate-y-1/2
                                after:text-sm after:font-bold after:text-white
                                after:content-['✓']
                                after:hidden
                                peer-checked:after:block"
                            ></span>

                            <span>
                                عرض تسلیت
                            </span>

                        </label>
                    </li>

                </ul>

            </aside>

        </div>

    </article>
`;
function renderFilter(isDesktop) {
    const oldFilter = filterShopSection.querySelector(".filter-wrapper");
    if (oldFilter) {
        oldFilter.remove();
    }
    const wrapper = document.createElement(
        isDesktop ? "div" : "details"
    );
    wrapper.className = "filter-wrapper";
    if (!isDesktop) {
        wrapper.innerHTML = `
            <summary class="flex bg-white dark:bg-zinc-600 border text-151515 dark:text-white gap-x-2 border-E1E1E1 p-2.5 rounded-xl items-center cursor-pointer font-iranyekan font-semibold py-3">
                <aside>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24">
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
    }
    else {
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
        !flowerSelect || !flowerSelectIcon || !flowerOptions
    ) {
        return;
    }

    flowerSelect.addEventListener("click", () => {

        flowerOptions.classList.toggle("hidden");
        flowerSelectIcon.classList.toggle("rotate-180");

    });

    const flowerItems =
        flowerOptions.querySelectorAll(".flower-option");
        flowerItems.forEach((item) => {
            item.addEventListener("click", () => {
                const selectedText =
                    item.textContent.trim();
                const selectedElement =
                    flowerSelect.querySelector(".flower-selected");
                    selectedElement.textContent = selectedText;
                    flowerOptions.classList.add("hidden");
                    flowerSelectIcon.classList.remove("rotate-180");
            });
        });
    }

const mediaQuery =
    window.matchMedia("(min-width: 768px)");
    renderFilter(mediaQuery.matches);

mediaQuery.addEventListener("change", (event) => {

    renderFilter(event.matches);

});