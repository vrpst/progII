import express, { Express, Request, Response } from "express";
import path from "path";
const __dirname = import.meta.dirname;
import { renderToPipeableStream } from "react-dom/server";
import Index from "../index.js";

const app: Express = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "client/pages/")));

app.get("/", (_req: Request, res: Response) => {
    const { pipe } = renderToPipeableStream(<Index />, {
        onShellReady() {
            pipe(res);
        },
    });
});

app.listen(8080, () => console.log("http://localhost:8080"));
