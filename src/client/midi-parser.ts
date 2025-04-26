import { Midi } from "@tonejs/midi";
import { Note } from "@tonejs/midi/dist/Note";

interface MidiData {
    pitch: string;
    duration: number;
    time: number;
}

function build_midi(levelNumber: number): Array<MidiData[][]> {
    const levelMidi: Array<MidiData[][]> = []
    let midiFound: boolean = true
    let phraseNumber: number = 0
    while (midiFound) {
        phraseNumber += 1
        const midiUrl = '../assets/audio/' + levelNumber.toString() + '/' + phraseNumber.toString() + '.mid'
        try {
            parse_midi(midiUrl).then((data) => {
                levelMidi.push(data); 
            })
        }
        catch (error) {
            console.log(error)
            midiFound = false
        }
    }
    return levelMidi
}

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
