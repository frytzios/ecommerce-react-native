import { Router } from "express";
import { addAddress , getAddress , updateAddress , deleteAddress , addToWishlist , removeFromWishlist, getWishlist } from "../controllers/user.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const router = Router();

router.use(protectRoute);

// addres routers
router.post('/addresses',  addAddress);
router.get('/addresses',  getAddress);
router.put('/addresses/:addressId',  updateAddress);
router.delete('/addresses/:addressId',  deleteAddress);

//wishlist routess
router.post('/wishlist',  addToWishlist)
router.delete('/wishlist/:productId',  removeFromWishlist);
router.get('/wishlist' , getWishlist);
export default router;