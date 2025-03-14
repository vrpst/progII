const place_holder_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
		eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function GameContainer({
    href,
    id,
    name,
    description,
}: {
    href: string;
    id: string;
    name?: string;
    description?: string;
}) {
    return (
        <a href={href} className="game" id={id}>
            <div className="game-image"></div>
            <div className="game-text-area">
                <div className="game-text-container">
                    <div className="title-container">
                        <h2>{name || "Lorem ipsum"}</h2>
                    </div>
                    <div className="text-container">
                        <p>{description || place_holder_description}</p>
                    </div>
                </div>
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
                        name="Rhythm Game"
                    />
                    <GameContainer href="" id="game2" />
                    <GameContainer href="" id="game3" />
                    <GameContainer href="" id="game4" />
                </div>
            </body>
        </html>
    );
}
