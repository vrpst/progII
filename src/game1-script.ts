function remToPixels(rem:number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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

// draw on canvas 
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    if (red) {
        ctx.strokeStyle = red;
    }
    else { 
        ctx.strokeStyle = 'red';
    }
    ctx.lineWidth = remToPixels(0.5);
    ctx.beginPath();
    ctx.arc(remToPixels(6.5), canvas.height/2, remToPixels(0.5), 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(remToPixels(10), canvas.height/2, remToPixels(0.5), 0, 2*Math.PI);
    ctx.stroke();
} 
else {
    // make this output something to the user later e.g. unsupported browser
    console.log('canvas not supported on this browser');
}
