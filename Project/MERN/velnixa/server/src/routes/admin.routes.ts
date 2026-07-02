import { Router } from 'express';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { createProductController, deleteOneUser, deleteProductController, getAllUsersController, getOneUserData, getProductController, updateProductController} from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const adminRoutes = Router();

//  Create product
adminRoutes.post("/product/create", authMiddleware ,adminMiddleware,createProductController)

//  Update product
adminRoutes.put("/product/:id", authMiddleware, adminMiddleware, updateProductController)

//  Delete product
adminRoutes.delete("/product/:id", authMiddleware, adminMiddleware, deleteProductController)

//  Get all products
adminRoutes.get("/products", authMiddleware, adminMiddleware, getProductController)

//  Get all users
adminRoutes.get("/users", authMiddleware, adminMiddleware, getAllUsersController)

//  Get one user
adminRoutes.get("/user/:id", authMiddleware, adminMiddleware, getOneUserData);

//  Delete one user
adminRoutes.delete("/user/:id", authMiddleware, adminMiddleware, deleteOneUser)

export default adminRoutes;