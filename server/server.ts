import express from "express";

const app = express();

app.use(express.static("client"));
app.use(express.static("client/pages"));

console.log("http://localhost:8080");

app.listen(8080);
