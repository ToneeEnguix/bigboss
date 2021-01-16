const URL =
  window.location.hostname === `localhost`
    ? `http://localhost:4000`
    : `https://bigbosscompetitions.com`;

const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "big-boss-competitions";
const NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = "bbt00kul";
const NEXT_PUBLIC_CLOUDINARY_KEY = "775334544597853";
const CLOUDINARY_SECRET = "4K-yJpKviBSrMeVllihf7cmuF2U";

export {
  URL,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  NEXT_PUBLIC_CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
