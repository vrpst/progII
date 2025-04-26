import { Midi } from "@tonejs/midi";
import { Note } from "@tonejs/midi/dist/Note";

const levelLengths: {[key: number]: number} = {1: 2}

export interface MidiData {
    pitch: string;
    duration: number;
    time: number;
}

export function build_midi(levelNumber: number): MidiData[][] {
    let levelMidi: MidiData[][]= [];
    let phraseNumber: number = 0;
    for (let i = 1; i <= levelLengths[levelNumber]; i++) {
        phraseNumber += 1;
        const midiUrl = '../assets/audio/' + levelNumber.toString() + '/' + phraseNumber.toString() + '.mid';
        try {
            parse_midi(midiUrl).then((data) => {
                levelMidi.push(data[0]); 
            })
        }
        catch (error) {
            console.log(error)  // advanced error handling techniques
        };
    };
    return levelMidi;
};

async function parse_midi(url: string): Promise<MidiData[][]> {
    const midi = await Midi.fromUrl(url);

    const notes_array: Note[][] = midi.tracks.map((track) => track.notes);

    const data: MidiData[][] = notes_array.map((notes) =>
        notes.map(({ pitch, duration, time }) => {
            return { pitch, duration, time };
        }),
    );
    return data;
}
