import { parseMidi as parse_midi } from "midi-file";

fetch("test.mid")
    .then((req) => req.bytes())
    .then((bytes) => console.log(parse_midi(bytes)));
