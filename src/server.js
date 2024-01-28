import express from "express";
import configViewEngine from "../../Blog/src/config/viewEngine";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

configViewEngine(app);

app.get("/", (req, res) => {
    res.render("home");
    }
);

app.get("/about", (req, res) => {
    res.render("about");
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);

