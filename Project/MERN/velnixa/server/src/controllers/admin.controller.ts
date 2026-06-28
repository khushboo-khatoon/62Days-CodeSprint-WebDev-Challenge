import { Request, Response } from "express";
import { adminService } from "../services/admin.service";
import { IResponse } from "../types/type";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, image, rating, section } = req.body;

    const product = await adminService.createProduct({
      name,
      description,
      price,
      category,
      image,
      rating,
      section
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while creating product"
    } as IResponse);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await adminService.updateProduct(id as string, updateData);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while updating the product"
    } as IResponse);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await adminService.deleteProduct(id as string);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while deleting the product"
    } as IResponse);
  }
};

export const getProductController = async (req: Request, res: Response) => {
  try {
    const products = await adminService.getAllProducts();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while fetching products"
    } as IResponse);
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while fetching users"
    } as IResponse);
  }
};

export const getOneUserData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminService.getUserById(id as string);

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user
    } as IResponse);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "User not found"
    } as IResponse);
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id as string);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while deleting the user"
    } as IResponse);
  }
};

// Optional: Extra endpoints
export const getAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await adminService.getUsersByRole('admin');

    return res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: admins
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while fetching admins"
    } as IResponse);
  }
};

export const getUsersOnlyController = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getUsersByRole('user');

    return res.status(200).json({
      success: true,
      message: "Regular users fetched successfully",
      data: users
    } as IResponse);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Error while fetching users"
    } as IResponse);
  }
};