declare var ctx: CanvasRenderingContext2D | null; 

function remToPixels(rem:number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// level class 
class Level {
    private _speed: number | null = null; 
    private _phrases: Phrase[] = [];

    constructor(speed: number, level: {[key: string]: number}[][]) {
        this._speed = speed;
        for (let phrase of level) {
            this._phrases.push(new Phrase(phrase));
        }
    }

    drawNotes(phraseNo: number) { 
        this._phrases[phraseNo].drawNotes();
    }
}

// phrase class 
class Phrase {
    private _notes: Note[] = [];

    constructor(phrase: {[key: string]: number}[]) { 
        let currentX: number = 0; 
        for (let note of phrase) { 
            this._notes.push(new Note(currentX, note['duration']));
            currentX += note['duration'];
        }
    }

    async drawNotes() {
        for (let note of this._notes) {
            note.draw();
            let pauseTime: number = note.getDuration(); 
            await new Promise(f => setTimeout(f, pauseTime * 1000));
        }
    }
}

// note class 
class Note {
    private _startSpacing: number = 5; 
    private _spacingMult: number = 5
    private _xPos: number | null = null; 
    private _duration: number | null = null;

    constructor(xPos: number, duration: number){ 
        this._xPos = xPos; 
        this._duration = duration;
    }

    getXPos() {
        return this._xPos
    }

    getDuration() {
        return this._duration
    }

    draw() { 
        ctx.beginPath();
        ctx.arc(remToPixels(this._xPos * this._spacingMult + this._startSpacing), canvas.height/2, remToPixels(0.5), 0, 2*Math.PI);
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
    [{'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}],
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
    alert('canvas not supported on this browser');
}
