import "./modules/theme.js"
import "./modules/chart.js"
import {supabase , getImageUrl} from "./cofig/supabase.js"

const addProductModal = document.querySelector("#add-product-modal")
const addBlogModal = document.querySelector("#add-blog-modal")
const addProductForm = document.querySelector("#add-product-form")
const addBlogForm = document.querySelector("#add-blog-form")
const addProductBtn = document.querySelector(".add-product-btn")
const addBlogBtn = document.querySelector(".add-blog-btn")
const productImage = document.querySelector("#product-image")
const productTitle = document.querySelector("#product-title")
const productCategory = document.querySelector("#product-category")
const productPrice = document.querySelector("#product-price")
const productDiscount = document.querySelector("#product-discount")
const productStock = document.querySelector("#product-stock")
const productColor = document.querySelector("#product-color")
const productDescription = document.querySelector("#product-description")
const closeProductModalBtns = document.querySelectorAll(".close-product-modal")
const blogImage = document.querySelector("#blog-image")
const blogTitle = document.querySelector("#blog-title")
const blogCategory = document.querySelector("#blog-category")
const blogAuthor = document.querySelector("#blog-author")
const blogExcerpt = document.querySelector("#blog-excerpt")
const blogContent = document.querySelector("#blog-content")
const blogStatus = document.querySelector("#blog-status")
const blogTags = document.querySelector("#blog-tags")
const closeBlogModalBtns = document.querySelectorAll(".close-blog-modal")
const productContainer = document.querySelector(".product-container")
const blogContainer = document.querySelector(".blog-container")
const userContainer = document.querySelector(".user-container")
const deleteConfirmModal = document.querySelector("#delete-confirm-modal")
const deleteConfirmMessage = document.querySelector("#delete-confirm-message")
const confirmDeleteBtn = document.querySelector("#confirm-delete-btn")
const cancelDeleteBtn = document.querySelector("#cancel-delete-btn")
const productsPagination = document.querySelector(".products-pagination");
const blogsPagination = document.querySelector(".blogs-pagination");
const usersPagination = document.querySelector(".users-pagination");
const editModal = document.querySelector("#edit-modal")
const editModalTitle = document.querySelector("#edit-modal-title")
const editForm = document.querySelector("#edit-form")
const editFields = document.querySelector("#edit-fields")
const closeEditModalBtn = document.querySelector("#close-edit-modal")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const userRole = document.querySelector(".user-role")
const authRequiredModal = document.querySelector("#auth-required-modal")
const closeAuthModalBtn = document.querySelector("#close-auth-modal")

let allProducts = [];
let allBlogs = [];
let allUsers = [];

let pendingDelete = null
let editingItem = null

const paginationState = {
    products: {
        currentPage: 1,
        perPage: 5,
    },
    blogs: {
        currentPage: 1,
        perPage: 5,
    },
    users: {
        currentPage: 1,
        perPage: 5,
    },
}

const renderPagination = ({
    container,
    items,
    state,
    renderItems,
}) => {
    const totalPages = Math.ceil(items.length / state.perPage);

    if (totalPages > 0 && state.currentPage > totalPages) {
        state.currentPage = totalPages;
    }

    const startIndex = (state.currentPage - 1) * state.perPage;
    const paginatedItems = items.slice(
        startIndex,
        startIndex + state.perPage
    );

    renderItems(paginatedItems);

    if (!container) return;

    container.innerHTML = "";

    if (totalPages <= 1) return;

    const buttonBaseClass =
        "size-7 sm:size-8 rounded-lg border border-border-light dark:border-[#3B424D] text-text-primary dark:text-[#F1F3F5] hover:bg-border-soft dark:hover:text-4B4B4B transition";

    const activeButtonClass =
        "size-7 sm:size-8 rounded-lg bg-FF6781 text-white";

    const arrowButtonClass =
        "flex items-center justify-center size-7 sm:size-8 rounded-lg border border-border-light dark:border-[#3B424D] text-text-primary dark:text-[#F1F3F5] dark:hover:text-4B4B4B hover:bg-border-soft transition";

    // ساخت دکمه فلش
    const createArrowButton = (direction) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = arrowButtonClass;
        button.setAttribute(
            "aria-label",
            direction === "prev" ? "صفحه قبلی" : "صفحه بعدی"
        );

        button.innerHTML = `
            <svg class="size-4 ${direction === "next" ? "rotate-180" : ""}">
                <use href="#chevron-right"></use>
            </svg>
        `;

        const isDisabled =
            direction === "prev"
                ? state.currentPage === 1
                : state.currentPage === totalPages;

        button.disabled = isDisabled;

        button.addEventListener("click", () => {
            if (isDisabled) return;

            state.currentPage += direction === "prev" ? -1 : 1;

            renderPagination({
                container,
                items,
                state,
                renderItems,
            });
        });

        return button;
    };

    // دکمه قبلی
    container.append(createArrowButton("prev"));

    // تعیین شماره صفحات قابل نمایش
    let pages = [];

    if (totalPages <= 7) {
        pages = Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    } else if (state.currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (state.currentPage >= totalPages - 3) {
        pages = [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    } else {
        pages = [
            1,
            "...",
            state.currentPage - 1,
            state.currentPage,
            state.currentPage + 1,
            "...",
            totalPages,
        ];
    }

    // ساخت شماره صفحات
    pages.forEach((page) => {
        if (page === "...") {
            const dots = document.createElement("span");

            dots.className =
                "flex items-center justify-center size-7 sm:size-8 text-text-primary dark:text-[#F1F3F5] dark:hover:text-4B4B4B";

            dots.textContent = "...";
            container.append(dots);

            return;
        }

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = page;
        button.className =
            page === state.currentPage
                ? activeButtonClass
                : buttonBaseClass;

        button.setAttribute(
            "aria-current",
            page === state.currentPage ? "page" : "false"
        );

        button.addEventListener("click", () => {
            state.currentPage = page;

            renderPagination({
                container,
                items,
                state,
                renderItems,
            });
        });

        container.append(button);
    });

    // دکمه بعدی
    container.append(createArrowButton("next"));
}

const showProductModalHandler = async () => {
    if (!(await requireAuth())) return

    addProductModal.classList.remove("hidden")
}

const showBlogModalHandler = async () => {
    if (!(await requireAuth())) return

    addBlogModal.classList.remove("hidden")
}

const hideProductModalHandler = () => {
    addProductModal.classList.add("hidden")
}

const hideBlogModalHandler = () => {
    addBlogModal.classList.add("hidden")
}

const checkAdminRole = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        userRole.textContent = "کاربر عادی"
        return false
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

    if (profileError) {
        console.error("Error fetching user role:", profileError)
        userRole.textContent = "کاربر عادی"
        return false
    }

    const isAdmin = profile?.role === "admin"

    userRole.textContent = isAdmin ? "مدیر سایت" : "کاربر عادی"

    return isAdmin
}

const showAuthModal = () => {
    authRequiredModal.classList.remove("hidden")
    authRequiredModal.classList.add("flex")
}

const hideAuthModal = () => {
    authRequiredModal.classList.add("hidden")
    authRequiredModal.classList.remove("flex")
}

const requireAuth = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        showAuthModal()
        return false
    }

    return true
}

const initProductsList = async () => {
    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        console.error("Error fetching products:", error);
        return;
    }

    allProducts = data ?? [];
    paginationState.products.currentPage = 1;

    renderPagination({
        container: productsPagination,
        items: allProducts,
        state: paginationState.products,
        renderItems: productsList,
    });
}

const initBlogsList = async () => {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error("Error fetching blogs:", error)
        return;
    }

    allBlogs = data ?? [];
    paginationState.blogs.currentPage = 1

    renderPagination({
        container: blogsPagination,
        items: allBlogs,
        state: paginationState.blogs,
        renderItems: blogsList,
    })
}

const initUsersList = async () => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, is_active, created_at")
        .order("created_at", {
            ascending: false,
        })

    if (error) {
        console.error("Error fetching users:", error)
        return
    }

    allUsers = data ?? []
    paginationState.users.currentPage = 1

    renderPagination({
        container: usersPagination,
        items: allUsers,
        state: paginationState.users,
        renderItems: usersList,
    })
}

const productsList = (products) => {
    productContainer.innerHTML = ""
    products.forEach((product) => {
            productContainer.insertAdjacentHTML("beforeend",
        `
            <div class="grid h-16.25 grid-cols-[.65fr_1.4fr_1fr_.65fr_.55fr] gap-1 items-center text-center text-[9px] sm:text-xs font-medium text-text-primary dark:text-[#F1F3F5] py-3 border-b border-border-light dark:border-[#3B424D]">
                <span class="flex justify-center min-w-0">
                    <img class="size-7 sm:size-10 rounded-lg object-cover" src="${getImageUrl(product.image)}"  alt="${product.title}">
                </span>
                <span class="min-w-0 break-words">${product.title}</span>
                <span class="min-w-0 break-words">${product.price.toLocaleString("fa-IR")}</span>
                <span class="min-w-0 rounded-full bg-green-200 dark:bg-green-900/40 text-success dark:text-green-300 px-0.5 py-1 break-words">${ product.is_active ? "فعال" : "غیرفعال"}</span>
                <span class="flex min-w-0 items-center justify-center gap-0.5">
                    <button
                        type="button"
                        class="delete-product-btn"
                        data-id="${product.id}"
                        aria-label="حذف محصول"
                    >
                        <svg class="size-5 shrink-0 text-FF6781">
                            <use href="#trash"></use>
                        </svg>
                    </button>

                    <button
                        type="button"
                        class="edit-product-btn"
                        data-id="${product.id}"
                        aria-label="ویرایش محصول"
                    >
                        <svg class="size-5 shrink-0 text-FF6781">
                            <use href="#rewrite"></use>
                        </svg>
                    </button>
                </span>
            </div>
        `
    )
    })
}

const blogsList = (blogs) => {
    blogContainer.innerHTML = ""
    blogs.forEach((blog) => {
        blogContainer.insertAdjacentHTML("beforeend",
            `
                <div class="grid h-16.25 grid-cols-[.65fr_1.4fr_1fr_.65fr_.55fr] gap-1 items-center text-center text-[9px] sm:text-xs font-medium text-text-primary dark:text-[#F1F3F5] py-3 border-b border-border-light dark:border-[#3B424D]">
                    <span class="flex justify-center min-w-0">
                        <img class="size-7 sm:size-10 rounded-lg object-cover" src="${getImageUrl(blog.image)}" alt="${blog.title}">
                    </span>
                    <span class="min-w-0 break-words">${blog.title}</span>
                    <span class="min-w-0 break-words">${new Date(blog.created_at).toLocaleDateString("fa-IR")}</span>
                    <span class="min-w-0 rounded-full bg-green-200 dark:bg-green-900/40 text-success dark:text-green-300 px-0.5 py-1 break-words">${blog.is_active ? "فعال" : "غیرفعال"}</span>
                    <span class="flex min-w-0 items-center justify-center gap-0.5">
                        <button
                            type="button"
                            class="delete-blog-btn"
                            data-id="${blog.id}"
                            aria-label="حذف بلاگ"
                        >
                            <svg class="size-5 shrink-0 text-FF6781">
                                <use href="#trash"></use>
                            </svg>
                        </button>

                        <button
                            type="button"
                            class="edit-blog-btn"
                            data-id="${blog.id}"
                            aria-label="ویرایش بلاگ"
                        >
                            <svg class="size-5 shrink-0 text-FF6781">
                                <use href="#rewrite"></use>
                            </svg>
                        </button>
                    </span>
                </div>
            `
        )
    })
}

const usersList = (users) => {
    userContainer.innerHTML = ""

    users.forEach((user) => {
        const userRow = document.createElement("div")

        userRow.className =
            "grid h-16.25 grid-cols-[1.1fr_1.35fr_1fr_.65fr_.55fr] gap-1 items-center text-center text-[9px] sm:text-xs font-medium text-text-primary dark:text-[#F1F3F5] py-3 border-b border-border-light dark:border-[#3B424D]"

        const name = document.createElement("span")
        name.className = "min-w-0 break-words"
        name.textContent = user.full_name || "بدون نام"

        const phone = document.createElement("span")
        phone.className = "min-w-0 break-words"
        phone.textContent = user.phone || "بدون شماره"

        const createdAt = document.createElement("span")
        createdAt.className = "min-w-0 break-words"
        createdAt.textContent = user.created_at
            ? new Date(user.created_at).toLocaleDateString("fa-IR")
            : "-"

        const status = document.createElement("span")

        status.className = `
            min-w-0 rounded-full px-0.5 py-1 break-words
            ${
                user.is_active
                    ? "bg-green-200 dark:bg-green-900/40 text-success dark:text-green-300"
                    : "bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-300"
            }
        `

        status.textContent = user.is_active ? "فعال" : "غیرفعال"

        const operations = document.createElement("span")
        operations.className = "flex min-w-0 items-center justify-center gap-0.5"

        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "delete-user-btn"
        deleteBtn.dataset.id = user.id
        deleteBtn.setAttribute("aria-label", "حذف کاربر")

        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        deleteIcon.setAttribute("class", "size-4 sm:size-5 shrink-0 text-FF6781")

        const deleteUse = document.createElementNS("http://www.w3.org/2000/svg", "use")
        deleteUse.setAttribute("href", "#trash")

        deleteIcon.append(deleteUse)
        deleteBtn.append(deleteIcon)

        const editBtn = document.createElement("button")
        editBtn.type = "button"
        editBtn.className = "edit-user-btn"
        editBtn.dataset.id = user.id
        editBtn.setAttribute("aria-label", "ویرایش کاربر")

        const editIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        editIcon.setAttribute("class", "size-4 sm:size-5 shrink-0 text-FF6781")

        const editUse = document.createElementNS("http://www.w3.org/2000/svg", "use")
        editUse.setAttribute("href", "#rewrite")

        editIcon.append(editUse)
        editBtn.append(editIcon)

        operations.append(deleteBtn, editBtn)

        userRow.append(name, phone, createdAt, status, operations)
        userContainer.append(userRow)
    })
}

const uploadImage = async (file, folder) => {
    if (!file) {
        throw new Error("لطفاً تصویر را انتخاب کن")
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("فایل انتخاب‌شده باید تصویر باشد")
    }

    const fileExtension = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExtension}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, {
            upsert: false
        })

    if (uploadError) {
        throw uploadError
    }

    const { data } = supabase.storage
        .from("products")
        .getPublicUrl(filePath)

    return data.publicUrl
}

const escapeHTML = (value = "") => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

const createEditField = ({
    name,
    label,
    value = "",
    type = "text",
    required = false,
    fullWidth = false,
    options = []
}) => {
    const wrapper = document.createElement("div")

    wrapper.className = fullWidth ? "sm:col-span-2" : ""

    const fieldLabel = document.createElement("label")
    fieldLabel.className = "mb-2 block text-sm font-medium"
    fieldLabel.textContent = label

    let input

    if (type === "textarea") {
        input = document.createElement("textarea")
        input.rows = 4
        input.value = value ?? ""
    } else if (type === "select") {
        input = document.createElement("select")

        options.forEach((option) => {
            const optionElement = document.createElement("option")
            optionElement.value = option.value
            optionElement.textContent = option.label
            input.append(optionElement)
        })

        input.value = value ?? ""
    } else {
        input = document.createElement("input")
        input.type = type

        if (type !== "file" && type !== "checkbox") {
            input.value = value ?? ""
        }

        if (type === "checkbox") {
            input.checked = Boolean(value)
        }
    }

    input.name = name
    input.className =
        "w-full rounded-xl border border-border-light bg-transparent px-3 py-2.5 text-sm outline-none focus:border-FF6781"

    if (required) input.required = true

    if (type === "file") {
        input.accept = "image/*"
    }

    if (type === "number") {
        input.min = "0"
    }

    fieldLabel.htmlFor = `edit-${name}`
    input.id = `edit-${name}`

    wrapper.append(fieldLabel, input)
    editFields.append(wrapper)
}

const openEditModal = (type, item) => {
    editingItem = { type, id: item.id }
    editFields.replaceChildren()

    editModalTitle.textContent =
        type === "product" ? "ویرایش محصول" : "ویرایش بلاگ"

    if (type === "product") {
        createEditField({
            name: "title",
            label: "عنوان محصول",
            value: item.title,
            required: true
        })

        createEditField({
            name: "category",
            label: "دسته‌بندی",
            value: item.category,
            required: true
        })

        createEditField({
            name: "price",
            label: "قیمت",
            value: item.price,
            type: "number",
            required: true
        })

        createEditField({
            name: "discount",
            label: "درصد تخفیف",
            value: item.discount ?? 0,
            type: "number"
        })

        createEditField({
            name: "stock",
            label: "موجودی",
            value: item.stock ?? 0,
            type: "number"
        })

        createEditField({
            name: "color",
            label: "رنگ",
            value: item.color ?? ""
        })

        createEditField({
            name: "description",
            label: "توضیحات",
            value: item.description ?? "",
            type: "textarea",
            fullWidth: true
        })

        createEditField({
            name: "is_active",
            label: "محصول فعال باشد؟",
            value: item.is_active,
            type: "checkbox"
        })
    } else {
        createEditField({
            name: "title",
            label: "عنوان بلاگ",
            value: item.title,
            required: true
        })

        createEditField({
            name: "category",
            label: "دسته‌بندی",
            value: item.category,
            required: true
        })

        createEditField({
            name: "author",
            label: "نویسنده",
            value: item.author ?? ""
        })

        createEditField({
            name: "excerpt",
            label: "خلاصه بلاگ",
            value: item.excerpt ?? "",
            type: "textarea",
            fullWidth: true
        })

        createEditField({
            name: "content",
            label: "محتوای بلاگ",
            value: item.content ?? "",
            type: "textarea",
            required: true,
            fullWidth: true
        })

        createEditField({
            name: "status",
            label: "وضعیت انتشار",
            value: item.is_active ? "active" : "inactive",
            type: "select",
            options: [
                { value: "active", label: "فعال" },
                { value: "inactive", label: "غیرفعال" }
            ]
        })

        createEditField({
            name: "tags",
            label: "برچسب‌ها (با کاما جدا کن)",
            value: Array.isArray(item.tags) ? item.tags.join(", ") : "",
            fullWidth: true
        })
    }

    createEditField({
        name: "image",
        label: "انتخاب تصویر جدید (اختیاری)",
        type: "file",
        fullWidth: true
    })

    editModal.classList.remove("hidden")
}

const closeEditModal = () => {
    editModal.classList.add("hidden")
    editForm.reset()
    editFields.replaceChildren()
    editingItem = null
}

const editItemHandler = async (event) => {
    event.preventDefault()

    if (!(await requireAuth())) return
    if (!editingItem) return

    const submitBtn = editForm.querySelector('[type="submit"]')
    const { type, id } = editingItem

    const formData = new FormData(editForm)
    const getValue = (name) => String(formData.get(name) ?? "").trim()

    try {
        submitBtn.disabled = true
        submitBtn.textContent = "در حال ذخیره..."

        const imageFile = editForm.elements.image.files[0]
        const currentItems = type === "product" ? allProducts : allBlogs
        const currentItem = currentItems.find(
            (item) => String(item.id) === String(id)
        )

        if (!currentItem) {
            throw new Error("رکورد موردنظر در لیست پیدا نشد")
        }

        let imageUrl = currentItem.image

        if (imageFile) {
            imageUrl = await uploadImage(
                imageFile,
                type === "product" ? "products" : "blogs"
            )
        }

        let updateData

        if (type === "product") {
            const price = Number(getValue("price"))
            const discount = Number(getValue("discount") || 0)
            const stock = Number(getValue("stock") || 0)

            if (!Number.isFinite(price) || price < 0) {
                throw new Error("قیمت معتبر نیست")
            }

            if (!Number.isFinite(discount) || discount < 0) {
                throw new Error("تخفیف معتبر نیست")
            }

            if (!Number.isInteger(stock) || stock < 0) {
                throw new Error("موجودی باید یک عدد صحیح نامنفی باشد")
            }

            updateData = {
                image: imageUrl,
                title: getValue("title"),
                category: getValue("category"),
                price,
                discount,
                stock,
                color: getValue("color"),
                description: getValue("description"),
                is_active: editForm.elements.is_active.checked
            }
        } else {
            const title = getValue("title")

            if (!title || !getValue("content")) {
                throw new Error("عنوان و محتوای بلاگ الزامی هستند")
            }

            updateData = {
                image: imageUrl,
                title,
                slug: createSlug(title),
                category: getValue("category"),
                author: getValue("author"),
                excerpt: getValue("excerpt"),
                content: getValue("content"),
                is_active: getValue("status") === "active",
                tags: getValue("tags")
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
            }
        }

        if (!updateData.title || !updateData.category) {
            throw new Error("عنوان و دسته‌بندی الزامی هستند")
        }

        const table = type === "product" ? "products" : "blogs"

        const { error } = await supabase
            .from(table)
            .update(updateData)
            .eq("id", id)

        if (error) throw error

        closeEditModal()

        if (type === "product") {
            await initProductsList()
        } else {
            await initBlogsList()
        }

        alert("تغییرات با موفقیت ذخیره شد")
    } catch (error) {
        console.error("Error updating item:", error)
        alert(error.message || "ذخیره تغییرات با خطا مواجه شد")
    } finally {
        submitBtn.disabled = false
        submitBtn.textContent = "ذخیره تغییرات"
    }
}

const addProductHandler = async (event) => {
    event.preventDefault()
    if (!(await requireAuth())) return
    const submitBtn = addProductForm.querySelector('[type="submit"]')

    try {
        if (submitBtn) submitBtn.disabled = true

        const imageFile = productImage.files[0]
        const imageUrl = await uploadImage(imageFile, "products")

        const productData = {
            image: imageUrl,
            title: productTitle.value.trim(),
            category: productCategory.value,
            price: Number(productPrice.value),
            discount: Number(productDiscount.value) || 0,
            stock: Number(productStock.value) || 0,
            color: productColor.value.trim(),
            description: productDescription.value.trim(),
            is_active: true
        }

        if (!productData.title || !productData.category) {
            throw new Error("عنوان و دسته‌بندی محصول الزامی هستند")
        }

        if (!Number.isFinite(productData.price) || productData.price < 0) {
            throw new Error("قیمت محصول معتبر نیست")
        }

        const { error } = await supabase
            .from("products")
            .insert(productData)

        if (error) throw error

        addProductForm.reset()
        hideProductModalHandler()

        await initProductsList()

        alert("محصول با موفقیت اضافه شد")
    } catch (error) {
        console.error("Error adding product:", error)
        alert(error.message || "افزودن محصول با خطا مواجه شد")
    } finally {
        if (submitBtn) submitBtn.disabled = false
    }
}

const createSlug = (title) => {
    return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
        .replace(/-+/g, "-")
}

const addBlogHandler = async (event) => {
    event.preventDefault()
    if (!(await requireAuth())) return
    const submitBtn = addBlogForm.querySelector('[type="submit"]')

    try {
        if (submitBtn) submitBtn.disabled = true

        const imageFile = blogImage.files[0]
        const imageUrl = await uploadImage(imageFile, "blogs")

        const blogData = {
            image: imageUrl,
            title: blogTitle.value.trim(),
            slug: createSlug(blogTitle.value),
            category: blogCategory.value,
            author: blogAuthor.value.trim(),
            excerpt: blogExcerpt.value.trim(),
            content: blogContent.value.trim(),
            is_active: blogStatus.value === "active",
            tags: blogTags.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
        }

        if (!blogData.title || !blogData.content) {
            throw new Error("عنوان و محتوای بلاگ الزامی هستند")
        }

        const { error } = await supabase
            .from("blogs")
            .insert(blogData)

        if (error) throw error

        addBlogForm.reset()
        hideBlogModalHandler()

        await initBlogsList()

        alert("بلاگ با موفقیت اضافه شد")
    } catch (error) {
        console.error("Error adding blog:", error)
        alert(error.message || "افزودن بلاگ با خطا مواجه شد")
    } finally {
        if (submitBtn) submitBtn.disabled = false
    }
}

const showDeleteModal = (type, id) => {
    const deleteMessages = {
        product: "آیا از حذف این محصول مطمئن هستید؟",
        blog: "آیا از حذف این بلاگ مطمئن هستید؟",
        user: "آیا از حذف اطلاعات این کاربر مطمئن هستید؟"
    }

    pendingDelete = { type, id }

    deleteConfirmMessage.textContent = deleteMessages[type]
    deleteConfirmModal.classList.remove("hidden")
}

const hideDeleteModal = () => {
    deleteConfirmModal.classList.add("hidden")
    pendingDelete = null
}

const deleteItem = async (type, id) => {
    const tables = {
        product: "products",
        blog: "blogs",
        user: "profiles"
    }

    const { error, count } = await supabase
        .from(tables[type])
        .delete({ count: "exact" })
        .eq("id", id)

    if (error) throw error

    if (count === 0) {
        throw new Error("رکورد حذف نشد. ممکن است وجود نداشته باشد یا دسترسی حذف نداشته باشی.")
    }

    if (type === "product") {
        allProducts = allProducts.filter((item) => String(item.id) !== String(id))

        renderPagination({
            container: productsPagination,
            items: allProducts,
            state: paginationState.products,
            renderItems: productsList
        })
    }

    if (type === "blog") {
        allBlogs = allBlogs.filter((item) => String(item.id) !== String(id))

        renderPagination({
            container: blogsPagination,
            items: allBlogs,
            state: paginationState.blogs,
            renderItems: blogsList
        })
    }

    if (type === "user") {
        allUsers = allUsers.filter((item) => String(item.id) !== String(id))

        renderPagination({
            container: usersPagination,
            items: allUsers,
            state: paginationState.users,
            renderItems: usersList
        })
    }
}



closeAuthModalBtn.addEventListener("click", hideAuthModal)

authRequiredModal.addEventListener("click", (event) => {
    if (event.target === authRequiredModal) {
        hideAuthModal()
    }
})

productContainer.addEventListener("click", async (event) => {
    const editBtn = event.target.closest(".edit-product-btn")

    if (!editBtn) return

    if (!(await requireAuth())) return

    const product = allProducts.find(
        (item) => String(item.id) === editBtn.dataset.id
    )

    if (product) openEditModal("product", product)
})

blogContainer.addEventListener("click", async (event) => {
    const editBtn = event.target.closest(".edit-blog-btn")

    if (!editBtn) return

    if (!(await requireAuth())) return

    const blog = allBlogs.find(
        (item) => String(item.id) === editBtn.dataset.id
    )

    if (blog) openEditModal("blog", blog)
})

userContainer.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-user-btn")

    if (!deleteBtn) return

    showDeleteModal("user", deleteBtn.dataset.id)
})

cancelDeleteBtn.addEventListener("click", hideDeleteModal)

deleteConfirmModal.addEventListener("click", (event) => {
    if (event.target === deleteConfirmModal) {
        hideDeleteModal()
    }
})

confirmDeleteBtn.addEventListener("click", async () => {
    if (!pendingDelete) return

    if (!(await requireAuth())) return

    const { type, id } = pendingDelete

    confirmDeleteBtn.disabled = true
    confirmDeleteBtn.textContent = "در حال حذف..."

    try {
        await deleteItem(type, id)

        hideDeleteModal()
        alert("حذف با موفقیت انجام شد")
    } catch (error) {
        console.error("Error deleting item:", error)
        alert(error.message || "حذف با خطا مواجه شد")
    } finally {
        confirmDeleteBtn.disabled = false
        confirmDeleteBtn.textContent = "حذف کن"
    }
})
productContainer.addEventListener("click", async (event) => {
    const deleteBtn = event.target.closest(".delete-product-btn")

    if (!deleteBtn) return

    if (!(await requireAuth())) return

    showDeleteModal("product", deleteBtn.dataset.id)
})

blogContainer.addEventListener("click", async (event) => {
    const deleteBtn = event.target.closest(".delete-blog-btn")

    if (!deleteBtn) return

    if (!(await requireAuth())) return

    showDeleteModal("blog", deleteBtn.dataset.id)
})

editForm.addEventListener("submit", editItemHandler)

closeEditModalBtn.addEventListener("click", closeEditModal)
cancelEditBtn.addEventListener("click", closeEditModal)

editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
        closeEditModal()
    }
})
addProductBtn.addEventListener("click",showProductModalHandler)
addBlogBtn.addEventListener("click",showBlogModalHandler)
addProductForm.addEventListener("submit", addProductHandler)
addBlogForm.addEventListener("submit", addBlogHandler)
closeProductModalBtns.forEach((closeProductModalBtn) => {
    closeProductModalBtn.addEventListener("click",hideProductModalHandler)
})

closeBlogModalBtns.forEach((closeBlogModalBtn) => {
    closeBlogModalBtn.addEventListener("click",hideBlogModalHandler)
})

window.addEventListener("load", async () => {
    initProductsList()
    initBlogsList()
    const isAdmin = await checkAdminRole();

    if (isAdmin) {
        await initUsersList()
    }
})