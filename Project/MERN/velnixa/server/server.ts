import app from "./src/app";
import { connectDb } from "./src/config/db";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();