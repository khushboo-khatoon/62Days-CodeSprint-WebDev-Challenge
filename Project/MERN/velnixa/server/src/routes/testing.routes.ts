import {Router} from "express";

const HomeRoutes = Router();

HomeRoutes.get("/", (req, res) => {
    res.send('Server is working properly');
})

export default HomeRoutes