import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  getAllOrders,
  getAllOrdersAdmin,
  getMyOrder,
  getStats,
  newOrderCod,
  // newOrderOnline,
  updateStatus,
  // verifyPayment,
} from "../controller/order.js";

const router = express.Router();

router.post("/order/new/cod", isAuth, newOrderCod);
router.get("/order/all", isAuth, getAllOrders);
router.get("/order/admin/all", isAuth, getAllOrdersAdmin);
router.get("/order/:id", isAuth, getMyOrder);
router.post("/order/:id", isAuth, updateStatus);
router.get("/stats", isAuth, getStats);
// router.post("/order/new/online", isAuth, newOrderOnline);
// router.post("/order/verify/payment", isAuth, verifyPayment);

export default router;
