import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { IResponse } from "../types/type";

export const getDataProductController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsBySection("data");
    
    return res.status(200).json({
      success: true,
      message: "Data Product fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
      data: null,
    } as IResponse);
  }
};

export const getPopularProductController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsBySection("popular");
    
    return res.status(200).json({
      success: true,
      message: "Popular product fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch popular products",
      data: null,
    } as IResponse);
  }
};

export const getMenProductController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsBySection("men");
    
    return res.status(200).json({
      success: true,
      message: "Men section product fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch men products",
      data: null,
    } as IResponse);
  }
};

export const getWomenProductController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsBySection("women");
    
    return res.status(200).json({
      success: true,
      message: "Women section product fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch women products",
      data: null,
    } as IResponse);
  }
};

export const getKidsProductController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductsBySection("kids");
    
    return res.status(200).json({
      success: true,
      message: "Kids section product fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch kids products",
      data: null,
    } as IResponse);
  }
};

export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    
    if (!category || !["MEN", "WOMEN", "KIDS"].includes(category.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be MEN, WOMEN, or KIDS",
      } as IResponse);
    }
    
    const products = await productService.getProductsByCategory(category.toUpperCase());
    
    return res.status(200).json({
      success: true,
      message: "Fetched all successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    if (error.message === "No products found in this category") {
      return res.status(404).json({
        success: false,
        message: error.message,
      } as IResponse);
    }
    
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products by category",
      data: null,
    } as IResponse);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id as string);
    
    return res.status(200).json({
      success: true,
      message: "Product found successfully",
      data: product,
    } as IResponse);
  } catch (error: any) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
        data: null,
      } as IResponse);
    }
    
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
      data: null,
    } as IResponse);
  }
};

export const getNewArrivalProduct = async (req: Request, res: Response) => {
  try {
    const products = await productService.getNewArrivals();
    
    return res.status(200).json({
      success: true,
      message: "Fetched products successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch new arrivals",
      data: null,
    } as IResponse);
  }
};

export const getHomePageProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getHomePageProducts();
    
    return res.status(200).json({
      success: true,
      message: "Home page products fetched successfully",
      data: products,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch home page products",
      data: null,
    } as IResponse);
  }
};