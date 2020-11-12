const Game = require('../models/Game');

exports.getIndex = async (req, res) => {
	const game = await Game.find((data) => data);


	try {
		res.status(200).render('index', { game: game });

	} catch (error) {
		console.log(error);
	}
};

exports.getGame = async (req, res) => {
	const gameId = req.params.gameId;

	const game = await Game.findById(gameId, (game) => game);

	try {
		res.status(200).render('game', { game: game });
	} catch (error) {
		console.log(error);
	}
};

exports.getAddGame = (req, res) => {
	res.status(200).render('edit-game', { editing: false });
};

exports.getEditGame = async (req, res) => {
	const gameId = req.params.gameId;

	const editMode = req.query.edit;

	if (!editMode) {
		return res.redirect('/');
	}

	const game = await Game.findById(gameId);

	try {
		if (!gameId) {
			return res.redirect('/');
		}
		res.status(200).render('edit-game', { game: game, editing: editMode });
	} catch (error) {
		console.log(error);
	}
};

exports.postGame = (req, res) => {
	const { name, image, description, playtime, rating, review } = req.body;

	const game = new Game({ name: name, image: image, description: description, playtime: playtime, rating: rating, review: review });
	game.save();

	res.status(201).redirect('/');
};

exports.postEditGame = (req, res) => {
	const gameId = req.body.gameId;
	const { name, image, description, playtime, rating, review } = req.body;

	Game.findById(gameId)
		.then((game) => {
			game.name = name;
			game.image = image;
            game.description = description;
            game.playtime = playtime;
            game.rating = rating;
            game.review = review;

			return game.save();
		})
		.then(() => {
			res.status(201).redirect(`/${gameId}`);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDelete = async (req, res) => {
	const gameId = req.body.gameId;

	const game = await Game.findByIdAndRemove(gameId, (data) => data);

	try {
		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
};
