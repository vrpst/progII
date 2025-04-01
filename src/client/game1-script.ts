declare var ctx: CanvasRenderingContext2D | null; 
const fps: number = 30;

function remToPixels(rem:number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// level class 
class Level {
    private _phrases: Phrase[] = [];
    private _currentPhrase: number = 0; 

    constructor(level: {[key: string]: number}[][]) {
        for (let phrase of level) {
            this._phrases.push(new Phrase(phrase));
        }
    }

    drawNotes() { 
        this._phrases[this._currentPhrase].drawNotes();
    }
}

// phrase class 
class Phrase {
    private _notes: Note[] = [];
    private _currentFrame: number = 0;

    constructor(phrase: {[key: string]: number}[]) { 
        let currentX: number = 0; 
        for (let note of phrase) { 
            this._notes.push(new Note(currentX, note['duration']));
            currentX += note['duration'];
        }
    }

    async drawNotes() {
        this._notes[0].draw();
        let runningNoteFrame: number = 0;
        for (let i: number = 1; i < this._notes.length; i++) {
            let noteDuration: number = this._notes[i - 1].getDuration(); 
            let noteFrameLength: number = noteDuration * fps; 
            runningNoteFrame += noteFrameLength; 
            if (this._currentFrame >= runningNoteFrame) { 
                this._notes[i].draw();
                if (i === this._notes.length - 1) {
                    console.log('finished drawing notes');
                    clearInterval(gameInterval); 
                    setTimeout(() => {
                        console.log('trigger next stage of level');
                    }, 1000);
                }
            }
        }
        this._currentFrame += 1;
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
        if (ctx) {
            ctx.beginPath();
            if (this._xPos != null) {
                ctx.arc(remToPixels(this._xPos * this._spacingMult + this._startSpacing), canvas.height/2, remToPixels(0.5), 0, 2*Math.PI);
            }
            ctx.stroke();
        } 
    }
}

// get css root variables 
let rootStyle = window.getComputedStyle(document.body) as CSSStyleDeclaration | null; 
let red: string | null = null;
if (rootStyle) { 
    red = rootStyle.getPropertyValue('--red');
} 

// create canvas
const canvas = document.createElement('canvas');
canvas.id = 'game-canvas';
canvas.width = remToPixels(59);
canvas.height = remToPixels(14);
let gameContainer = document.getElementById('game-inner') as HTMLElement | null;
if (gameContainer) {
    gameContainer.appendChild(canvas);
}

// create level, phrases and notes with assumed input 
let levelInput: {[key: string]: number}[][] = [
    [{'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}],
    [{'duration': 1, 'pitch': 1}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 0}]
];
let levelObject: Level = new Level(levelInput); 

// set up drawing 
let gameInterval: NodeJS.Timeout;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    if (ctx) {
        if (red) {
            ctx.strokeStyle = red;
        }
        else { 
            ctx.strokeStyle = 'red';
        }
        ctx.lineWidth = remToPixels(0.5);

        // set up game loop 
        document.getElementById('start-button').addEventListener('click', () => {
            console.log('game start clicked');
            setTimeout(() => {
                console.log('started drawing notes');
                gameInterval = setInterval(() => {
                    levelObject.drawNotes();
                }, 1000/fps)
            }, 1000);
        });
    }
}
else {
    // make this output something to the user later e.g. unsupported browser
    alert('canvas not supported on this browser');
}
