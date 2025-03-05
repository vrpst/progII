import express from "express";

const app = express();

app.use(express.static("client"));

console.log("https://localhost:8080");

app.listen(8080);

