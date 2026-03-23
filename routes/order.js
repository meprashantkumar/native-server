import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  getAllOrders,
  getAllOrdersAdmin,
  getMyOrder,
  getStats,
  newOrderCod,
  updateStatus,
} from "../controller/order.js";

const router = express.Router();

router.post("/order/new/cod", isAuth, newOrderCod);
router.get("/order/all", isAuth, getAllOrders);
router.get("/order/admin/all", isAuth, getAllOrdersAdmin);
router.get("/order/:id", isAuth, getMyOrder);
router.post("/order/:id", isAuth, updateStatus);
router.get("/stats", isAuth, getStats);

export default router;
