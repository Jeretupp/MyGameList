import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

const App = () => {
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://localhost:8080/');
			const data = await response.json();

			try {

				setLoading(false);
				setGame(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
	}, []);

	const [game, setGame] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<Fragment>
			<header>
				<h1>My Game List: React Front End</h1>
				<a href="http://localhost:8080">View All Game</a>
				<a href="http://localhost:8080/add-game">Add New Game &#x27A2;</a>
			</header>

			<div className="container">
				{loading ? (
					<div>
						<p>No data to load</p>
					</div>
				) : (
					<div>
						{game.map((data) => (
							<div key={data._id}>
								<main>
									<ul className="game">
										<li>
											<img src={data.image} alt={data.name} className="game-img" />
										</li>
										<li>
											<h1>{data.name}</h1>
										</li>

										<li>
											<a href={data._id}>View Game &#x21DB;</a>
										</li>
									</ul>
								</main>
							</div>
						))}
					</div>
				)}
			</div>
			{/* <div>
				<h1>Add New Game</h1>
				<form method="POST" action="http://localhost:8080/add-game">
					<div>
						<label>Name</label>
						<input type="text" name="name" required />
					</div>
					<div>
						<label>Image</label>
						<input type="text" name="image" required />
					</div>
					<div>
						<label>Description</label>
						<input type="text" name="description" required />
					</div>

					<div>
						<button type="submit">Add Game</button>
					</div>
				</form>
			</div> */}
		</Fragment>
	);
};

export default App;
