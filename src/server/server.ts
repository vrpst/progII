import express, { Express } from "express";

const app: Express = express();

app.use(express.static("../client"));
app.use(express.static("../client/pages/"));

app.listen(8080, () => console.log("http://localhost:8080"));
