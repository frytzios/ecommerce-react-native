import {v2 as cloudinary} from "cloudinary"  

import {ENV} from "./env.js";

cloudinary.config({
    cloud_name:ENV.CLOUDUNARY_CLOUD_NAME,
    api_key:ENV.CLOUDUNARY_API_KEY,
    api_secret:ENV.CLOUDUNARY_API_SECRET,
});

export default cloudinary;