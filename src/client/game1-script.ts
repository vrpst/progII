declare var ctx: CanvasRenderingContext2D | null; 
const fps: number = 60;
const START_SPACING: number = 5; 
const SPACING_MULT: number = 5;
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
    drawLine() {
        this._phrases[this._currentPhrase].drawLine();
    }
}

// phrase class 
class Phrase {
    private _notes: Note[] = [];
    private _currentFrame: number = -30*(START_SPACING/SPACING_MULT);
    private _score: number = 0; //T Total score for the phrase, summed by the Level
    private _badInputCount: number = 0 //T Total times the user has clicked too far from any note (fail state after too many)
    private _doneDrawing: boolean = false //T To help in ending the draw phase
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
        let minTimeDiff: number = Infinity; // this and input time are in milliseconds
        let closestNote: Note | null = null;
        for(let note of this._notes) { // Finds the closest note to the press and the time difference
            let timeDiff: number = Math.abs(note.getXPos()*1000 - inputTime); // *1000 to get ms from s
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
            closestNote.score(minTimeDiff); // score the note
        }
    }

    pointsFromDiff(timeDiff: number) { //T takes a time difference and returns points
        if (timeDiff <= 30) return 100;  // ≤30ms
        if (timeDiff <= 80) return 80;   // ≤80ms
        if (timeDiff <= 140) return 50;   // ≤140ms
        if (timeDiff <= 200) return 20;    // ≤200ms
        return -40; // too far out
    }
    async drawNotes() {
        let runningNoteFrame: number = 0;
        let done: boolean = false;
        for (let i: number = 0; i < this._notes.length; i++) {
            let noteFrameLength: number; 
            if (i - 1 < 0) {
                noteFrameLength= 0;
            }
            else {
                let noteDuration: number = this._notes[i - 1].getDuration(); 
                noteFrameLength = noteDuration * fps; 
            }
            runningNoteFrame += noteFrameLength; 
            if (this._currentFrame >= runningNoteFrame) { 
                this._notes[i].draw();
                if (i === this._notes.length - 1 && !this._doneDrawing) {
                    console.log('finished drawing notes');
                    this._doneDrawing = true;
                    setTimeout(() => {
                        clearInterval(gameInterval); 
                        console.log('trigger next stage of level');
                    }, 1000);
                }
            }
        }
        ctx.strokeStyle, ctx.fillStyle = red; //T Resets the canvas colour back to --red
        this._currentFrame += 1;
    }
    drawLine() { //draws a line that follows along with the current frame
        let x = remToPixels(this._currentFrame / fps * SPACING_MULT + START_SPACING);
        ctx.strokeStyle = bad
        ctx.lineWidth = remToPixels(0.2);
        ctx.beginPath();
        ctx.moveTo(x, 0.9 * canvas.height);
        ctx.lineTo(x, 0.1 * canvas.height);
        ctx.stroke();
        ctx.lineWidth = remToPixels(0.5);
    }
}

// note class 
class Note {
    private _xPos: number | null = null; 
    private _duration: number | null = null;
    private _scored: boolean = false; //T false if the user hasn't tried to hit the note, true otherwise
    private _accuracy: number = -1; /* T accuracy of user hit for a note
    -1 -> not scored yet
    0 -> perfect
    1 -> great
    2 -> okay
    3 -> bad
    */

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

    getAccuracy() { //T Gets the accuracy from when the note was scored
        return this._accuracy
    }
    isScored() { //T tells you if a boolean is scored
        return this._scored
    }

    score(timeDiff: number) { //T Makes _scored true and updates accuracy
        this._scored = true;
        if (timeDiff <= 30) this._accuracy = 0;  // perfect
        if (timeDiff <= 80) this._accuracy = 1;   // great
        if (timeDiff <= 140) this._accuracy = 2;   // okay
        if (timeDiff <= 200) this._accuracy = 3;    // bad
    }
    draw() { 
        if (ctx) {
            ctx.beginPath();
            let accuracyText: string = ""
            if (this._xPos != null) { 
                switch (this._accuracy) { //T Changes canvas colour to match the note accuracy
                    case 0: 
                        ctx.strokeStyle = perfect; 
                        ctx.fillStyle = perfect; 
                        accuracyText = "Perfect";
                        break;
                    case 1: 
                        ctx.strokeStyle = great; 
                        ctx.fillStyle = great; 
                        accuracyText = "Great";
                        break;
                    case 2: 
                        ctx.strokeStyle = okay; 
                        ctx.fillStyle = okay; 
                        accuracyText = "Okay";
                        break;
                    case 3:
                        ctx.strokeStyle = bad; 
                        ctx.fillStyle = bad;
                        accuracyText = "Bad";
                        break;
                    default:
                        ctx.strokeStyle = red; 
                        ctx.fillStyle = red;
                }
                let x = remToPixels(this._xPos * SPACING_MULT + START_SPACING);
                let y = canvas.height/2;
                ctx.arc(x, y, remToPixels(0.5), 0, 2*Math.PI);
                ctx.strokeStyle = black
                ctx.fillText(accuracyText, x, y - remToPixels(1));
            }
            ctx.stroke();
        } 
    }
}

// get css root variables 
let rootStyle = window.getComputedStyle(document.body) as CSSStyleDeclaration | null; 
let red: string | null = null;
let perfect: string | null = null;
let great: string | null = null;
let okay: string | null = null;
let bad: string | null = null;
let black: string | null = null;
if (rootStyle) { 
    red = rootStyle.getPropertyValue('--red');
    perfect = rootStyle.getPropertyValue('--perfect');
    great = rootStyle.getPropertyValue('--great');
    okay = rootStyle.getPropertyValue('--okay');
    bad = rootStyle.getPropertyValue('--bad');
    black = rootStyle.getPropertyPriority('--black');
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
    [{'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 1}, {'duration': 1, 'pitch': 0}, {'duration': 1, 'pitch': 0}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 0}],
    [{'duration': 1, 'pitch': 1}, {'duration': 0.5, 'pitch': 0}, {'duration': 1, 'pitch': 0}]
];
let levelObject: Level = new Level(levelInput); 

// set up drawing 
let gameInterval: NodeJS.Timeout;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.font = `${remToPixels(1.5)}px sans-serif`; // adjust font size if needed
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
                    ctx.clearRect(0, 0, canvas.width, canvas.height); //scrubs the canvas so the line can move along
                    levelObject.drawNotes();
                    levelObject.drawLine();
                }, 1000/fps)
            }, 500);
        });
    }
}
else {
    // make this output something to the user later e.g. unsupported browser
    alert('canvas not supported on this browser');
}