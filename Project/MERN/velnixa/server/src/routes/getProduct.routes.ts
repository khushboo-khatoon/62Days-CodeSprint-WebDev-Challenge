import { Router } from "express";
import { getDataProductController, getKidsProductController, getMenProductController, getNewArrivalProduct, 
  getPopularProductController, getProductByCategory, getProductById, getWomenProductController,
  getHomePageProducts  } from "../controllers/product.controller";

const getProductRoutes = Router();

getProductRoutes.get("/data", getDataProductController);
getProductRoutes.get("/popular", getPopularProductController);
getProductRoutes.get("/men", getMenProductController);
getProductRoutes.get("/women", getWomenProductController);
getProductRoutes.get("/kids", getKidsProductController);
getProductRoutes.get("/filter", getProductByCategory);
getProductRoutes.get("/new-arrivals", getNewArrivalProduct);
getProductRoutes.get("/home", getHomePageProducts);  // Optional: sab ek saath
getProductRoutes.get("/:id", getProductById);

export default getProductRoutes;