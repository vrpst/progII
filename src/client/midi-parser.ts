import { Midi } from "@tonejs/midi";
import { Note } from "@tonejs/midi/dist/Note";

export interface MidiData {
    pitch: string;
    duration: number;
    time: number;
}

export async function parse_midi(url: string): Promise<MidiData[][]> {
    const midi = await Midi.fromUrl(url);

    const notes_array: Note[][] = midi.tracks.map((track) => track.notes);

    const data: MidiData[][] = notes_array.map((notes) =>
        notes.map(({ pitch, duration, time }) => {
            return { pitch, duration, time };
        }),
    );

    return data;
}
