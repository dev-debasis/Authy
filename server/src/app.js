import express, { urlencoded } from "express";
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(urlencoded({
    extended: true,
}));

app.use(express.json());


app.use("/", (req, res) => {
    res.send("Test");
});

export {
    app
}