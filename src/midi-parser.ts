import { Midi } from "@tonejs/midi";
import { Note } from "@tonejs/midi/dist/Note";

interface MidiData {
    pitch: string;
    duration: number;
    time: number;
}

Midi.fromUrl("test.mid").then((midi) => {
    const notes_array: Note[][] = midi.tracks.map((track) => track.notes);
    const data: MidiData[][] = notes_array.map((notes) =>
        notes.map(({ pitch, duration, time }) => {
            return { pitch, duration, time };
        }),
    );
    console.log(data);
});
