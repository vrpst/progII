import ReactDom from "react-dom/client";
import React from "react";

ReactDom.createRoot(document.body).render(
	<>
		<link rel="stylesheet" href="../styles/style.css" />
		<link rel="stylesheet" href="../styles/index-style.css" />
		<div id="header-container"></div>
		<div id="games-container">
			<div id="game1" className="game" onClick={() => window.location.href = "game1.html"}>
				<div className="game-image"></div>
				<div className="game-text-area">
					<div className="game-text-container">
						<div className="title-container">
							<h2>Rhythm Game</h2>
						</div>
						<div className="text-container">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="game2" className="game">
				<div className="game-image"></div>
				<div className="game-text-area">
					<div className="game-text-container">
						<div className="title-container">
							<h2>Lorem Ipsum</h2>
						</div>
						<div className="text-container">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="game3" className="game">
				<div className="game-image"></div>
				<div className="game-text-area">
					<div className="game-text-container">
						<div className="title-container">
							<h2>Lorem Ipsum</h2>
						</div>
						<div className="text-container">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="game4" className="game">
				<div className="game-image"></div>
				<div className="game-text-area">
					<div className="game-text-container">
						<div className="title-container">
							<h2>Lorem Ipsum</h2>
						</div>
						<div className="text-container">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div >
	</>
);
