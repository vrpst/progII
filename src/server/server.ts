import express, { Express } from "express";
import path from "path";
const __dirname = import.meta.dirname;

const app: Express = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "client/pages/")));

app.listen(8080, () => console.log("http://localhost:8080"));
