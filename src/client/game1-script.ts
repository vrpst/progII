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

    getTotalScore() { //T Sums score from all phrases and returns total
        let total: number = 0;
        for(let phrase of this._phrases) {
            total += phrase.getScore()
        }
        return total
    }

    drawNotes() { 
        this._phrases[this._currentPhrase].drawNotes();
    }
}

// phrase class 
class Phrase {
    private _notes: Note[] = [];
    private _currentFrame: number = 0;
    private _score: number = 0; //T Total score for the phrase, summed by the Level
    private _badInputCount: number = 0 //T Total times the user has clicked too far from any note (fail state after too many)
    constructor(phrase: {[key: string]: number}[]) { 
        let currentX: number = 0; 
        for (let note of phrase) { 
            this._notes.push(new Note(currentX, note['duration']));
            currentX += note['duration'];
        }
    }

    getScore() {
        return this._score
    }

    handleInput(inputTime: number) { //T Takes a keypress during the players turn and gives points and scores notes
        let minTimeDiff: number = Infinity;
        let closestNote: Note | null = null;
        for(let note of this._notes) { // Finds the closest note to the press and the time difference
            let timeDiff: number = Math.abs(note.getXPos() - inputTime);
            if (timeDiff < minTimeDiff) {
                minTimeDiff = timeDiff;
                closestNote = note;
            }
        }
        let pointsToAdd: number = this.pointsFromDiff(minTimeDiff);
        if (pointsToAdd == -40 || closestNote.isScored()) { // Input was too far from note or note already struck
            this._badInputCount ++;
        } else {
            this._score += pointsToAdd; // add the points
            closestNote.score(); // score the note
        }
    }

    pointsFromDiff(timeDiff: number) { //T takes a time difference and returns points
        if (timeDiff <= 0.03) return 100;  // ≤30ms
        if (timeDiff <= 0.08) return 80;   // ≤80ms
        if (timeDiff <= 0.14) return 50;   // ≤140ms
        if (timeDiff <= 0.2) return 20;    // ≤200ms
        return -40; // too far out
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
    private _scored: boolean = false; //T false if the user hasn't tried to hit the note, true otherwise

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

    isScored() { //T tells you if a boolean is scored
        return this._scored
    }

    score() { //T Makes _scored true
        this._scored = true
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
