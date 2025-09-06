import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on: http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.log("Database Connection Failed: ", error);
});