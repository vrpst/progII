import { Midi } from "@tonejs/midi";
import fs from "fs";
import path from "path";
declare const __dirname: string;

const midiData = fs.readFileSync(path.resolve(__dirname, "test.mid"));
const midi = new Midi(midiData);

for (const { notes } of midi.tracks) {
    console.log([
        ...notes.map((note) => [note.time, note.duration, note.pitch]),
    ]);
}
