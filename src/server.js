import express from "express";
import  { v4} from "uuid";

const app = express();

app.use(express.json());

app.get("/task", (req, res) => {
    res.json([]);
});

app.post("/task", (req, res) => {
    const {title, task} = req.body;

    if(!title || !task){
        return res.status(400).json("error")
    }

    return res.json({
        id: v4(),
        title,
        task
    });
});

export default app;