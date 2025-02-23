var notelist:number[] = new Array(13); 
for (let i = 0; i < notelist.length; i++) {
    notelist[i] = 1;
    notelist[i] = Math.floor(Math.random() * 3); 
}

let svgCode = `<svg width="60rem" height="15rem" viewBox="0 0 60 15" xmlns="http://www.w3.org/2000/svg">`;
let currentX:number = 5; 
for (let i = 0; i < 11; i++) {
    svgCode = svgCode + `<line class="thin-line" x1="${currentX}" y1="0" x2="${currentX}" y2="15" stroke-linecap="round"/>`;
    currentX += 5;
}
svgCode = svgCode + `<path id="noteslist" class="line" d="`;
let prevX:number = 0;
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
            svgCode = svgCode + `M ${prevX.toString()} 7.5 `
            prevY = 7.5;
        }
        else if (notelist[i] == 2) {
            svgCode = svgCode + `M ${prevX.toString()} 12.5 `
            prevY = 12.5;
        }
    }
    else {
        if (notelist[i] == prevHeight) {
            svgCode = svgCode + `L ${(prevX+5).toString()} ${prevY.toString()} `
        }   
        else if (notelist[i] == prevHeight + 1) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY+2.5).toString()} Q ${(prevX+2.5).toString()} ${(prevY+5).toString()} ${(prevX+5).toString()} ${(prevY+5).toString()} `;
            prevY += 5;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 1) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY-2.5).toString()} Q ${(prevX+2.5).toString()} ${(prevY-5).toString()} ${(prevX+5).toString()} ${(prevY-5).toString()} `;
            prevY -= 5;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight + 2) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY+2.5).toString()} L ${(prevX+2.5)} ${(prevY+7.5)} Q ${(prevX+2.5).toString()} ${(prevY+10).toString()} ${(prevX+5).toString()} ${(prevY+10).toString()} `;
            prevY += 10;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 2) {
            svgCode = svgCode + `Q ${(prevX+2.5).toString()} ${prevY.toString()} ${(prevX+2.5).toString()} ${(prevY-2.5).toString()} L ${(prevX+2.5)} ${(prevY-7.5)} Q ${(prevX+2.5).toString()} ${(prevY-10).toString()} ${(prevX+5).toString()} ${(prevY-10).toString()} `;
            prevY -= 10;
            prevHeight = notelist[i];
        }
        prevX += 5; 
    }
}
svgCode = svgCode + `" stroke-linecap="round"/></svg>`;
//svgCode = svgCode + `<path id="noteslist" class="line" d="M 0 7.5 L 5 7.5 Q 7.5 7.5 7.5 5 Q 7.5 2.5 10 2.5 Q 12.5 2.5 12.5 5 L 12.5 10 Q 12.5 12.5 15 12.5 L 20 12.5" stroke-linecap="round"/></svg>`;
let svgContainer = document.createElement('div'); 
svgContainer.id = 'game-container';
svgContainer.innerHTML = svgCode;
document.body.appendChild(svgContainer);

let root = document.querySelector(':root') as HTMLElement | null; 
let path = document.querySelector('#noteslist') as SVGGeometryElement | null;
if (root && path) {
    let pathLength = path.getTotalLength(); 
    root.style.setProperty('--notes-path-length', pathLength.toString());
}
