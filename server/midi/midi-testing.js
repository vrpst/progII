import pkg from '@tonejs/midi';
const { Midi } = pkg;

import fs from 'fs';

const midiData = fs.readFileSync("test.mid")
const midi = new Midi(midiData)

await midi.tracks.forEach(track => {  // taken from https://www.npmjs.com/package/@tonejs/midi?activeTab=readme  
    //notes are an array
    const notes = track.notes
    notes.forEach(note => {
      //note.midi, note.time, note.duration, note.name
    console.log(note.time, '\t', note.duration, '\t', note.pitch)
    })
  
    //the track also has a channel and instrument
    //track.instrument.name
  })