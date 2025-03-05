// create random number array for notes 
var numNotes = 50;
var notelist = new Array(numNotes);
for (var i = 0; i < notelist.length; i++) {
    notelist[i] = 1;
    notelist[i] = Math.floor(Math.random() * 3);
}
// create svg of background notes timeings 
var svgWidth = (numNotes + 1) * 5;
var svgCode = "<svg width=\"".concat(svgWidth.toString(), "rem\" height=\"13rem\" viewBox=\"0 0 ").concat(svgWidth.toString(), " 13\" xmlns=\"http://www.w3.org/2000/svg\">");
var currentX = 5;
for (var i = 0; i < numNotes; i++) {
    svgCode = svgCode + "<line class=\"thin-line\" x1=\"".concat(currentX, "\" y1=\"0\" x2=\"").concat(currentX, "\" y2=\"13\" stroke-linecap=\"round\"/>");
    currentX += 5;
}
// create svg connecting notes 
svgCode = svgCode + "<path id=\"noteslist\" class=\"line\" d=\"";
var prevX = 5;
var prevY = 0;
var prevHeight = null;
for (var i = 0; i < notelist.length; i++) {
    if (prevHeight == null) {
        prevHeight = notelist[i];
        if (notelist[i] == 0) {
            svgCode = svgCode + "M ".concat(prevX.toString(), " 2.5 ");
            prevY = 2.5;
        }
        else if (notelist[i] == 1) {
            svgCode = svgCode + "M ".concat(prevX.toString(), " 6.5 ");
            prevY = 6.5;
        }
        else if (notelist[i] == 2) {
            svgCode = svgCode + "M ".concat(prevX.toString(), " 10.5 ");
            prevY = 10.5;
        }
    }
    else {
        if (notelist[i] == prevHeight) {
            svgCode = svgCode + "L ".concat((prevX + 5).toString(), " ").concat(prevY.toString(), " ");
        }
        else if (notelist[i] == prevHeight + 1) {
            svgCode = svgCode + "Q ".concat((prevX + 2.5).toString(), " ").concat(prevY.toString(), " ").concat((prevX + 2.5).toString(), " ").concat((prevY + 2).toString(), " Q ").concat((prevX + 2.5).toString(), " ").concat((prevY + 4).toString(), " ").concat((prevX + 5).toString(), " ").concat((prevY + 4).toString(), " ");
            prevY += 4;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 1) {
            svgCode = svgCode + "Q ".concat((prevX + 2.5).toString(), " ").concat(prevY.toString(), " ").concat((prevX + 2.5).toString(), " ").concat((prevY - 2).toString(), " Q ").concat((prevX + 2.5).toString(), " ").concat((prevY - 4).toString(), " ").concat((prevX + 5).toString(), " ").concat((prevY - 4).toString(), " ");
            prevY -= 4;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight + 2) {
            svgCode = svgCode + "Q ".concat((prevX + 2.5).toString(), " ").concat(prevY.toString(), " ").concat((prevX + 2.5).toString(), " ").concat((prevY + 2).toString(), " L ").concat((prevX + 2.5), " ").concat((prevY + 6), " Q ").concat((prevX + 2.5).toString(), " ").concat((prevY + 8).toString(), " ").concat((prevX + 5).toString(), " ").concat((prevY + 8).toString(), " ");
            prevY += 8;
            prevHeight = notelist[i];
        }
        else if (notelist[i] == prevHeight - 2) {
            svgCode = svgCode + "Q ".concat((prevX + 2.5).toString(), " ").concat(prevY.toString(), " ").concat((prevX + 2.5).toString(), " ").concat((prevY - 2).toString(), " L ").concat((prevX + 2.5), " ").concat((prevY - 6), " Q ").concat((prevX + 2.5).toString(), " ").concat((prevY - 8).toString(), " ").concat((prevX + 5).toString(), " ").concat((prevY - 8).toString(), " ");
            prevY -= 8;
            prevHeight = notelist[i];
        }
        prevX += 5;
    }
}
svgCode = svgCode + "\" stroke-linecap=\"round\"/>";
for (var i = 0, currentX_1 = 5; i < notelist.length; i++, currentX_1 += 5) {
    if (notelist[i] == 0) {
        svgCode = svgCode + "<circle class=\"circle\" cx=\"".concat(currentX_1, "\" cy = \"2.5\" r=\"0.6\" fill=\"var(--red)\"/>");
    }
    else if (notelist[i] == 1) {
        svgCode = svgCode + "<circle class=\"circle\" cx=\"".concat(currentX_1, "\" cy = \"6.5\" r=\"0.6\" fill=\"var(--red)\"/>");
    }
    else {
        svgCode = svgCode + "<circle class=\"circle\" cx=\"".concat(currentX_1, "\" cy = \"10.5\" r=\"0.6\" fill=\"var(--red)\"/>");
    }
}
svgCode = svgCode + "</svg>";
// create static svg 
var staticSvgCode = "\n<svg width=\"58rem\" height=\"13rem\" viewBox=\"0 0 58 13\" xmlns=\"http://www.w3.org/2000/svg\">\n    <line class=\"thick-line\" x1=\"50\" y1=\"0.75\" x2=\"50\" y2=\"12.25\" stroke-linecap=\"round\"/>\n    <circle class=\"static-circle\" cy = \"2.5\" fill=\"var(--grey)\"/>\n    <circle class=\"static-circle\" cy = \"6.5\" fill=\"var(--grey)\"/>\n    <circle class=\"static-circle\" cy = \"10.5\" fill=\"var(--grey)\"/>\n</svg>";
// add svgs to "game-inner" div
var svgContainer = document.createElement('div');
svgContainer.id = 'notes-svg-container';
svgContainer.innerHTML = svgCode;
var staticSvgContainer = document.createElement('div');
staticSvgContainer.id = 'static-svg-container';
staticSvgContainer.innerHTML = staticSvgCode;
var gameContainer = document.getElementById('game-inner');
if (gameContainer) {
    gameContainer.appendChild(svgContainer);
    gameContainer.appendChild(staticSvgContainer);
}
// set transition timings and positions 
var noteTime = 0.75;
svgContainer.style.transitionDuration = "".concat((numNotes * noteTime + 12 * noteTime).toString(), "s");
svgContainer.style.left = "-".concat(svgWidth.toString(), "rem");
// start game 
var gameStarted = false;
var startTime;
function startGame() {
    svgContainer.style.left = "55rem";
    var button = document.getElementById('start-button');
    gameStarted = true;
    startTime = Date.now();
    if (button) {
        button.id = 'start-button-pressed';
    }
}
document.addEventListener("keypress", function (e) {
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
    }
    else {
        console.log("Start the game first");
    }
});
