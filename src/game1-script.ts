// create random number array for notes
let numNotes: number = 50;
let notelist: number[] = new Array(numNotes);
for (let i = 0; i < notelist.length; i++) {
    notelist[i] = 1;
    notelist[i] = Math.floor(Math.random() * 3);
}
// create svg of background notes timeings
let svgWidth = (numNotes + 1) * 5;
let svgCode = `<svg width="${svgWidth.toString()}rem" height="13rem" viewBox="0 0 ${svgWidth.toString()} 13" xmlns="http://www.w3.org/2000/svg">`;
let currentX: number = 5;
for (let i = 0; i < numNotes; i++) {
    svgCode =
        svgCode +
        `<line class="thin-line" x1="${currentX}" y1="0" x2="${currentX}" y2="13" stroke-linecap="round"/>`;
    currentX += 5;
}
// create svg connecting notes
svgCode = svgCode + `<path id="noteslist" class="line" d="`;
let prevX: number = 5;
let prevY: number = 0;
let prevHeight: number | null = null;
for (let i = 0; i < notelist.length; i++) {
    if (prevHeight == null) {
        prevHeight = notelist[i];
        if (notelist[i] == 0) {
            svgCode = svgCode + `M ${prevX.toString()} 2.5 `;
            prevY = 2.5;
        } else if (notelist[i] == 1) {
            svgCode = svgCode + `M ${prevX.toString()} 6.5 `;
            prevY = 6.5;
        } else if (notelist[i] == 2) {
            svgCode = svgCode + `M ${prevX.toString()} 10.5 `;
            prevY = 10.5;
        }
    } else {
        if (notelist[i] == prevHeight) {
            svgCode =
                svgCode + `L ${(prevX + 5).toString()} ${prevY.toString()} `;
        } else if (notelist[i] == prevHeight + 1) {
            svgCode =
                svgCode +
                `Q ${(prevX + 2.5).toString()} ${prevY.toString()} ${(prevX + 2.5).toString()} ${(prevY + 2).toString()} Q ${(prevX + 2.5).toString()} ${(prevY + 4).toString()} ${(prevX + 5).toString()} ${(prevY + 4).toString()} `;
            prevY += 4;
            prevHeight = notelist[i];
        } else if (notelist[i] == prevHeight - 1) {
            svgCode =
                svgCode +
                `Q ${(prevX + 2.5).toString()} ${prevY.toString()} ${(prevX + 2.5).toString()} ${(prevY - 2).toString()} Q ${(prevX + 2.5).toString()} ${(prevY - 4).toString()} ${(prevX + 5).toString()} ${(prevY - 4).toString()} `;
            prevY -= 4;
            prevHeight = notelist[i];
        } else if (notelist[i] == prevHeight + 2) {
            svgCode =
                svgCode +
                `Q ${(prevX + 2.5).toString()} ${prevY.toString()} ${(prevX + 2.5).toString()} ${(prevY + 2).toString()} L ${prevX + 2.5} ${prevY + 6} Q ${(prevX + 2.5).toString()} ${(prevY + 8).toString()} ${(prevX + 5).toString()} ${(prevY + 8).toString()} `;
            prevY += 8;
            prevHeight = notelist[i];
        } else if (notelist[i] == prevHeight - 2) {
            svgCode =
                svgCode +
                `Q ${(prevX + 2.5).toString()} ${prevY.toString()} ${(prevX + 2.5).toString()} ${(prevY - 2).toString()} L ${prevX + 2.5} ${prevY - 6} Q ${(prevX + 2.5).toString()} ${(prevY - 8).toString()} ${(prevX + 5).toString()} ${(prevY - 8).toString()} `;
            prevY -= 8;
            prevHeight = notelist[i];
        }
        prevX += 5;
    }
}
svgCode = svgCode + `" stroke-linecap="round"/>`;
for (let i = 0, currentX = 5; i < notelist.length; i++, currentX += 5) {
    if (notelist[i] == 0) {
        svgCode =
            svgCode +
            `<circle class="circle" cx="${currentX}" cy = "2.5" r="0.6" fill="var(--red)"/>`;
    } else if (notelist[i] == 1) {
        svgCode =
            svgCode +
            `<circle class="circle" cx="${currentX}" cy = "6.5" r="0.6" fill="var(--red)"/>`;
    } else {
        svgCode =
            svgCode +
            `<circle class="circle" cx="${currentX}" cy = "10.5" r="0.6" fill="var(--red)"/>`;
    }
}
svgCode = svgCode + `</svg>`;
// create static svg
let staticSvgCode = `
<svg width="58rem" height="13rem" viewBox="0 0 58 13" xmlns="http://www.w3.org/2000/svg">
    <line class="thick-line" x1="50" y1="0.75" x2="50" y2="12.25" stroke-linecap="round"/>
    <circle class="static-circle" cy = "2.5" fill="var(--grey)"/>
    <circle class="static-circle" cy = "6.5" fill="var(--grey)"/>
    <circle class="static-circle" cy = "10.5" fill="var(--grey)"/>
</svg>`;

// add svgs to "game-inner" div
let svgContainer = document.createElement("div");
svgContainer.id = "notes-svg-container";
svgContainer.innerHTML = svgCode;
let staticSvgContainer = document.createElement("div");
staticSvgContainer.id = "static-svg-container";
staticSvgContainer.innerHTML = staticSvgCode;
let gameContainer = document.getElementById("game-inner") as HTMLElement | null;
if (gameContainer) {
    gameContainer.appendChild(svgContainer);
    gameContainer.appendChild(staticSvgContainer);
}

// set transition timings and positions
let noteTime = 0.75;
svgContainer.style.transitionDuration = `${(numNotes * noteTime + 12 * noteTime).toString()}s`;
svgContainer.style.left = `-${svgWidth.toString()}rem`;

// start game
let gameStarted: Boolean = false;
let startTime: number;
function startGame() {
    svgContainer.style.left = `55rem`;
    let button = document.getElementById("start-button") as HTMLElement | null;
    gameStarted = true;
    startTime = Date.now();
    if (button) {
        button.id = "start-button-pressed";
    }
}
document.addEventListener("keypress", (e) => {
    if (gameStarted) {
        switch (e.key.toLowerCase()) {
            case "k":
                console.log("bottom beat at " + (Date.now() - startTime));
                break;
            case "o":
                console.log("middle beat at " + (Date.now() - startTime));
                break;
            case "p":
                console.log("top beat at " + (Date.now() - startTime));
        }
    } else {
        console.log("Start the game first");
    }
});

document.getElementById("start-button").onclick = startGame;
