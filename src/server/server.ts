import express, { Express } from "express";
import path from "path";
const __dirname = import.meta.dirname;

const app: Express = express();

console.log(__dirname, "AHAHAHA")
app.use(express.static(path.join(__dirname, "audio")));
app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "client/pages/")));


app.listen(8080, () => console.log("http://localhost:8080"));

app.get('/api/sound', function(req, resp){ // serve the midi file
    console.log(req.query)
    const level: string = String(req.query.level) 
    const phrase: string = String(req.query.phrase)
    console.log(level, phrase)
    let sound_path: string = ""
    sound_path = sound_path.concat('./audio/', level, '/', phrase, '.wav')
    console.log(sound_path)
    resp.sendFile(path.join(__dirname, sound_path))
})

app.get('/api/midi', function(req, resp){ // serve the midi file
    console.log(req.query)
    const level: number = Number(req.query.level) 
    const phrase: number = Number(req.query.phrase)
    let midi_path: string = ""
    midi_path = midi_path.concat('./audio/', level.toString(), '/', phrase.toString(), '.mid')
    console.log(midi_path)
    resp.sendFile(path.join(__dirname, midi_path))
})