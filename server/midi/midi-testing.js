import pkg from "@tonejs/midi";
const { Midi } = pkg;

import fs from "fs";
import path from "path";
const __dirname = import.meta.dirname;

const midiData = fs.readFileSync(path.resolve(__dirname, "test.mid"));
const midi = new Midi(midiData);

for (const { notes } of midi.tracks) {
    console.log([
        ...notes.map((note) => [note.time, note.duration, note.pitch]),
    ]);
}

// midi.tracks.forEach((track) => {
//     //notes are an array
//     const notes = track.notes;
//     notes.forEach((note) => {
//         //note.midi, note.time, note.duration, note.name
//         console.log(note.time, "\t", note.duration, "\t", note.pitch);
//     });
//     return { time: note.time };
//
//     //the track also has a channel and instrument
//     //track.instrument.name
// });
//

