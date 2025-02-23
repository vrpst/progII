let numNotes:number = 50;
let notelist:number[] = new Array(numNotes); 
for (let i = 0; i < notelist.length; i++) {
    notelist[i] = 1;
    notelist[i] = Math.floor(Math.random() * 3); 
}

let svgWidth = (numNotes + 1) * 5
let svgCode = `<svg width="${svgWidth.toString()}rem" height="13rem" viewBox="0 0 ${svgWidth.toString()} 13" xmlns="http://www.w3.org/2000/svg">`;
let currentX:number = 5; 
for (let i = 0; i < numNotes; i++) {
    svgCode = svgCode + `<line class="thin-line" x1="${currentX}" y1="0" x2="${currentX}" y2="13" stroke-linecap="round"/>`;
    currentX += 5;
}
svgCode = svgCode + `<path id="noteslist" class="line" d="`;
let prevX:number = 5;
let prevY:number = 0;
let prevHeight:number|null = null; 
for (let i = 0; i < notelist.length; i++) {
    if (prevHeight == null) {
        prevHeight = notelist[i]; 
        if (notelist[i] == 0) {
            svgCode = svgCode + `M ${prevX.toString()} 2.5 `
            prevY = 2.5; 
        }
        else if (notelist[i] == 1) {
            svgCode = svgCode + `M ${prevX.toString()} 6.5 `
            prevY = 6.5;
        }
        else if (notelist[i] == 2) {
            svgCode = svgCode + `M ${prevX.toString()} 10.5 `
            prevY = 10.5;
        }
    }
    else {
        if (notelist[i] == prevHeight) {
            svgCode = svgCode + `L ${(prevX+5).toString()} ${prevY.toString()} `
        }   
        else if (notelist[i] == prevHeight + 1) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY+2).toString()} Q ${(prevX+2.5).toString()} ${(prevY+4).toString()} ${(prevX+5).toString()} ${(prevY+4).toString()} `;
            prevY += 4;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 1) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY-2).toString()} Q ${(prevX+2.5).toString()} ${(prevY-4).toString()} ${(prevX+5).toString()} ${(prevY-4).toString()} `;
            prevY -= 4;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight + 2) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY+2).toString()} L ${(prevX+2.5)} ${(prevY+6)} Q ${(prevX+2.5).toString()} ${(prevY+8).toString()} ${(prevX+5).toString()} ${(prevY+8).toString()} `;
            prevY += 8;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 2) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY-2).toString()} L ${(prevX+2.5)} ${(prevY-6)} Q ${(prevX+2.5).toString()} ${(prevY-8).toString()} ${(prevX+5).toString()} ${(prevY-8).toString()} `;
            prevY -= 8;
            prevHeight = notelist[i];
        }
        prevX += 5; 
    }
}
svgCode = svgCode + `" stroke-linecap="round"/></svg>`;
let svgContainer = document.createElement('div'); 
svgContainer.id = 'svg-container';
svgContainer.innerHTML = svgCode;
let gameContainer = document.getElementById('game-inner') as HTMLElement | null;
if (gameContainer) {
    gameContainer.appendChild(svgContainer);
}
svgContainer.style.transitionDuration = `${(numNotes * 0.5 + 5).toString()}s` // note separation time + travel time to cross the screen
svgContainer.style.left =  `-${svgWidth.toString()}rem`
setTimeout(function(){
    svgContainer.style.left = `58rem`;
},1);

