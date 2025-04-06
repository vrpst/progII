import express, { Express } from "express";
import path from "path";
const __dirname = import.meta.dirname;

const app: Express = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "client/pages/")));

app.listen(8080, () => console.log("http://localhost:8080"));

app.get('/api/audio/', function(req, resp){ // serve the midi file
    console.log(req.query)
    const level: number = Number(req.query.level) 
    const phrase: number = Number(req.query.phrase)
    let audio_path: string = ""
    audio_path = audio_path.concat('./audio/', level.toString(), '/', phrase.toString(), '.mid')
    console.log(audio_path)
    resp.sendFile(path.join(__dirname, audio_path))
})
