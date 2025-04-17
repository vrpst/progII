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

    drawPlayerNotes() {
        this._phrases[this._currentPhrase].drawPlayerNotes();
    }

    drawLine() {
        this._phrases[this._currentPhrase].drawLine();
    }

    resetValues() {
        this._phrases[this._currentPhrase].resetValues();
    }

    addPlayerNote() {
        this._phrases[this._currentPhrase].addPlayerNote();
    }
}

// phrase class 
class Phrase {
    private _notes: Note[] = [];
    private _playerHits: PlayerHit[] = [];
    private _currentFrame: number = -30*(START_SPACING/SPACING_MULT);
    private _doneDrawing: boolean = false //T To help in ending the draw phase
    private _startTime: number = null//T Time the game is started
    private _drawingTime: number = null//T Time taken to draw all of the notes, syncs the playback section up
    constructor(phrase: {[key: string]: number}[]) { 
        let currentX: number = 0; 
        for (let note of phrase) { 
            this._notes.push(new Note(currentX, note['duration']));
            currentX += note['duration'];
        }
    }
    getNotes() {
        return this._notes
    }
    getScore() {
        let totalScore: number = 0;
        let missCount: number = 0;
        for (let hit of this._playerHits) {
            let hitScore = hit.getScore();
            totalScore += hitScore;
            if (hitScore == -40) { //if it was a miss
                missCount ++;
                if (missCount == 5) { //too many misses
                    return -1 //indicates disqualification
                }
            }
        }
        return totalScore
    }

    resetValues() {
        this._currentFrame = -30*(START_SPACING/SPACING_MULT);
        this._startTime = Date.now();
    }

    async drawNotes() {
        let runningNoteFrame: number = 0;
        let done: boolean = false;
        for (let i: number = 0; i < this._notes.length; i++) {
            let noteFrameLength: number; 
            if (i - 1 < 0) {
                noteFrameLength = 0;
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
                    this._drawingTime = Date.now() - this._startTime;
                    setTimeout(() => {
                        clearInterval(drawExampleInterval); 
                        console.log('trigger next stage of level');
                        playerDrawn();
                    }, 1000);
                }
            }
        }
        ctx.strokeStyle, ctx.fillStyle = red; //T Resets the canvas colour back to --red
        this._currentFrame += 1;
    }

    async drawPlayerNotes() {
        for (let hit of this._playerHits) {
            hit.draw();
        }
        if (Date.now() - this._startTime >= this._drawingTime) {
            setTimeout(() => {
                clearInterval(playerDrawnInterval); 
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                console.log('phrase complete');
                console.log(this.getScore())
            }, 1000);
        }
        ctx.strokeStyle, ctx.fillStyle = red; //T Resets the canvas colour back to --red
        this._currentFrame += 1;
    }

    addPlayerNote() {
        this._playerHits.push(new PlayerHit(Date.now() - this._startTime, this))
        console.log(Date.now()-this._startTime);
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
class PlayerHit {
    private _time: number | null = null; // time from the first note in seconds
    private _note: Note | null = null; // the note the hit is for

    constructor(time: number, phrase: Phrase) {
        this._time = time/1000 - 30*(START_SPACING/SPACING_MULT)/fps;
        let minTimeDiff: number = Infinity; // this and input time are in milliseconds
        let closestNote: Note | null = null;
        for(let note of phrase.getNotes()) { // Finds the closest note to the press and the time difference
            let timeDiff: number = Math.abs(note.getXPos()*1000  - this._time*1000); // *1000 to get ms from s
            if (timeDiff < minTimeDiff) {
                minTimeDiff = timeDiff;
                closestNote = note;
            }
        }
        console.log(minTimeDiff)
        if (minTimeDiff < 200 && !closestNote.isScored()) { // Input was too far from note or note already struck
            this._note = closestNote;
            closestNote.score(minTimeDiff);
        }

    }
    getScore(): number {
        if (this._note === null) {
            return -40;
        }
        let accuracy: number = this._note.getAccuracy();
        switch (accuracy) {
            case 0:
                return 100;
            case 1:
                return 80;
            case 2:
                return 40;
            case 3:
                return 20;
        }
    }
    draw() { 
        if (ctx) {
            ctx.beginPath();
            let accuracyText: string = ""
            if (this._note === null) {
                ctx.strokeStyle = red; 
                ctx.fillStyle = red;
                accuracyText = "miss";
            } else {
                switch (this._note.getAccuracy()) { //T Changes canvas colour to match the note accuracy
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
            }
            let x = remToPixels(this._time * SPACING_MULT + START_SPACING); //HERE IT IS
            let y = canvas.height/2;
            ctx.arc(x, y, remToPixels(0.5), 0, 2*Math.PI);
            ctx.strokeStyle = black
            ctx.fillText(accuracyText, x, y - remToPixels(1));
            ctx.stroke();
        } 
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
        else if (timeDiff <= 80) this._accuracy = 1;   // great
        else if (timeDiff <= 140) this._accuracy = 2;   // okay
        else if (timeDiff <= 200) this._accuracy = 3;    // bad
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

// space press tracking 
let spacePressedSinceCheck: boolean = false; 
window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        spacePressedSinceCheck = true; 
    }
})
function wasSpacePressed() {
    let pressed = spacePressedSinceCheck;
    spacePressedSinceCheck = false; 
    return pressed 
}

// function for drawing example notes 
let drawExampleInterval: NodeJS.Timeout;
function drawExample() { 
    levelObject.resetValues();
    console.log('started drawing example notes');
    drawExampleInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //scrubs the canvas so the line can move along
        levelObject.drawNotes();
        levelObject.drawLine();
    }, 1000/fps);
}

// function for drawing player inputs 
let playerDrawnInterval: NodeJS.Timeout;
function playerDrawn() {
    levelObject.resetValues();
    console.log('started drawing player notes');
    playerDrawnInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (wasSpacePressed()) {
            levelObject.addPlayerNote();
        }
        levelObject.drawPlayerNotes();
        levelObject.drawLine();
    }, 1000/fps);
}

// set up drawing 
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
            document.getElementById('start-button').style.display = 'none';
            setTimeout(() => {
                drawExample();
            }, 500);
        });
    }
}
else {
    // make this output something to the user later e.g. unsupported browser
    alert('canvas not supported on this browser');
}