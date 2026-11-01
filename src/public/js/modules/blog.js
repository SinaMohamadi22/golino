
import { supabase , getImageUrl } from "../cofig/supabase.js";

const blogContainer = document.querySelector(".blog-container");

const getBlogs = async () => {
  if (!blogContainer) return;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error fetching blogs:", error);
    return;
  }

  blogContainer.innerHTML = (data ?? [])
    .map(
      (blog) => `
        <article class="bg-white dark:bg-zinc-700 p-4.5 rounded-2xl items-center">
          <img
            class="w-full rounded-2xl"
            src="${getImageUrl(blog.image)}"
            alt="${blog.title}"
            loading="lazy"
          >

          <h4 class="py-4.5 h-30 font-iranyekan font-medium text-sm text-black-text dark:text-white">
            ${blog.title}
          </h4>

          <div class="flex justify-between items-center">
            <span class="text-low-red">
              ${new Date(blog.created_at).toLocaleDateString("fa-IR")}
            </span>

            <div class="flex bg-primary text-white rounded-2xl py-2 px-3.75 items-center text-center font-iranyekan text-sm font-normal">
              <a
                class="flex items-center gap-x-1 justify-center align-center"
                href="blog.html?slug=${encodeURIComponent(blog.slug)}"
              >
                ادامه مطلب
                <svg class="size-3.75 mt-1">
                  <use href="#arrow"></use>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
};

getBlogs();
