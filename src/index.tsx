const placeholder_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
		eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function GameContainer({
    href,
    id,
    name = "Lorem ipsum",
    description = placeholder_description,
    children,
}: {
    href?: string;
    id?: string;
    name?: string;
    description?: string;
    children?: any;
}) {
    return (
        <a href={href} id={id} className="game">
            <div className="game-text-area">
                <div className="title-container">
                    <h2>{name}</h2>
                </div>
                <div className="text-container">
                    <p>{description}</p>
                </div>
            </div>
            <div className="bracket-container">
                <img src="assets/images/brace.svg"></img>
            </div>
            <div className="lines-container-bottom">
                <img src="assets/images/lines.svg"></img>
            </div>
            <div className="lines-container-top">
                <img src="assets/images/lines.svg"></img>
            </div>
        </a>
    );
}

export default function Index() {
    return (
        <html>
            <head>
                <link rel="stylesheet" href="styles/style.css" />
                <link rel="stylesheet" href="styles/index-style.css" />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="assets/favicon.ico"
                />
            </head>
            <body>
                <div id="header-container"></div>
                <div id="games-container">
                    <GameContainer
                        href="game1.html"
                        id="game1"
                        name="Rhythm Precision"
                        description="Hear the beat, see the rhythm, and tap it back in perfect time! Test your memory and timing in this accuracy-focused rhythm match game."
                    />
                    <GameContainer id="game2" />
                    <GameContainer id="game3" />
                    <GameContainer id="game4" />
                </div>
            </body>
        </html>
    );
}
