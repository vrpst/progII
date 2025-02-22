var notelist:number[] = new Array(10); 
for (let i = 0; i < 10; i++) {
    notelist[i] = Math.floor(Math.random() * 3); 
}

let svgCode = `
<svg width="60rem" height="15rem" viewBox="0 0 60 15" xmlns="http://www.w3.org/2000/svg">
    <path id="noteslist" class="line" d="M 0 7.5 L 5 7.5 Q 7.5 7.5 7.5 5 Q 7.5 2.5 10 2.5 L 15 2.5" stroke-linecap="round"/>
</svg>`; 
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
