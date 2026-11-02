
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const SUPABASE_URL = "https://nldmtwggyobypqntjawy.supabase.co";
const SUPABASE_KEY = "sb_publishable_8YASRjBzyuZc7Gw4LTyCLg_7ZA2B_Vp";

export const getImageUrl = (image, folder = "") => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  const imagePath = folder
    ? `${folder}/${image}`
    : image;

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(imagePath);

  return data.publicUrl;
};

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);