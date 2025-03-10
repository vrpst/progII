import { Midi } from "@tonejs/midi";

Midi.fromUrl("test.mid").then((midi) => console.log(midi));
