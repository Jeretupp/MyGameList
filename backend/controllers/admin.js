const Game = require('../models/Game');

exports.getIndex = async (req, res) => {
    const game = await Game.find((data) => data);

    try {
        console.log(game);
        res.status(200).render('index', { game: game });
    } catch (error) {
        console.log(error)
    }
};
exports.getGame = async (req, res) => {
    const gameId = req.params.gameId;

    const game = await Game.findById(gameId, (game) => game);

    try {
        console.log(game);
        res.status(200).render('game', { game: game });
    } catch (error) {
        console.log(error);
    }
}
exports.getAddGame = (req, res) => {
    res.status(200).render('edit-list', { editing: false });
};

exports.getEditList = async (req, res) => {
    const gameId = req.params.gameId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const game = await Game.findById(gameId);

    try {
        if (!gameId) {
            return res.redirect('/')
        }
        console.log(game);
        res.status(200).render('edit-list', { game: game, editing: editMode })
    } catch (eror) {
        console.log(error)
    }
};

exports.postGame = (req, res) => {
    const { name, image, description, playtime } = req.body;

    const game = new Game({ name: name, image: image, description: description, playtime: playtime })
    game.save();
    console.log('Game Added to the database');
    res.status(201).redirect('/');
};

exports.postEditList = (req, res) => {
    const gameId = req.body.gameId;
    const { name, image, description, playtime } = req.body;

    Game.findById(gameId)
        .then((game) => {
            game.name = name;
            game.image = image;
            game.description = description;
            game.playtime = playtime;

            return game.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res) => {
    const gameId = req.body.gameId;
    const game = await Game.findByIdAndRemove(gameId, (data) => data);

    try {
        console.log(game);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};