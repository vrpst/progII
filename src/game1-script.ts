declare var ctx: CanvasRenderingContext2D | null; 

function remToPixels(rem:number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// level class 
class Level {
    private _speed: number | null = null; 
    private _level: {[key: string]: number}[][] | null = null; 
    private _phrases: Phrase[] = [];

    constructor(speed: number, level: {[key: string]: number}[][]) {
        this._speed = speed;
        this._level = level; 
        this.createPhrases();
    }

    createPhrases() {
        for (let phrase of this._level) {
            this._phrases.push(new Phrase(phrase));
        }
    }

    drawNotes(phraseNo: number) { 
        this._phrases[phraseNo].drawNotes();
    }
}

// phrase class 
class Phrase {
    private _noteSpacingMult: number = 5;
    private _noteStartPos: number = 5;
    private _notes: Note[] = [];
    private _phrase: {[key: string]: number}[] | null = null;

    constructor(phrase: {[key: string]: number}[]) { 
        this._phrase = phrase;
        this.createNotes();
    }

    createNotes() {
        let currentX: number = this._noteStartPos; 
        for (let note of this._phrase) { 
            note['xPos'] = currentX;
            this._notes.push(new Note(note));
            currentX += note['duration'] * this._noteSpacingMult;
        }
    }

    drawNotes() {
        for (let note of this._notes) {
            note.draw();
        }
    }
}

// note class 
class Note {
    private _note: {[key: string]: number} | null = null;

    constructor(note: {[key: string]: number}){ 
        this._note = note;
    }

    draw() { 
        ctx.beginPath();
        ctx.arc(remToPixels(this._note['xPos']), canvas.height/2, remToPixels(0.5), 0, 2*Math.PI);
        ctx.stroke(); 
    }
}

// get css root variables 
let rootStyle = window.getComputedStyle(document.body) as CSSStyleDeclaration | null; 
let red = null;
if (rootStyle) { 
    red = rootStyle.getPropertyValue('--red');
} 

// create canvas
const canvas = document.createElement('canvas');
canvas.id = 'game-canvas';
canvas.width = remToPixels(58);
canvas.height = remToPixels(13);
let gameContainer = document.getElementById('game-inner') as HTMLElement | null;
if (gameContainer) {
    gameContainer.appendChild(canvas);
}

// create level, phrases and notes with assumed input 
let levelInput: {[key: string]: number}[][] = [
    [{'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}],
    [{'duration': 1, 'pitch': 1}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 0}]
];
let levelObject: Level = new Level(1, levelInput); 

// draw circles
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    if (red) {
        globalThis.ctx.strokeStyle = red;
    }
    else { 
        ctx.strokeStyle = 'red';
    }
    ctx.lineWidth = remToPixels(0.5);
    levelObject.drawNotes(0);
}
else {
    // make this output something to the user later e.g. unsupported browser
    console.log('canvas not supported on this browser');
}
