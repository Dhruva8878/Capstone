import express from "express";
import user from "./routes/user.router.js"
import course from "./routes/course.router.js"
import modules from "./routes/module.router.js"
import material from "./routes/material.router.js";
import cors from "cors";

import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user" , user);
app.use("/course" , course);
app.use("/module" , modules);
app.use("/material" , material);

app.listen(3001,"192.168.88.72");

console.log("server invoked at link http://192.168.88.72:3001");