const genreService = require('../services/genreService');
const HttpStatus = require('http-status');
const logger = require('../util/logger/logger')

exports.getAllGenre = async (req, res) => {
    try {
        const genres = genreService.getAllGenre();

        res
            .status(HttpStatus.OK)
            .json(genres);

        logger.success(`[GENRE_CONTROLLER] GET - 200`);
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.addGenre = async (req, res) => {
    try {
        const genre = req.body;
        const message = genreService.addGenre(genre);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success(`[GENRE_CONTROLLER] POST - 200`);
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.updateGenre = async (req, res) => {
    try {
        const genreId = req.params.id;
        const updateGenre = req.body;

        const message = genreService.updateGenre(genreId, updateGenre)

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success(`[GENRE_CONTROLLER] PUT - 200`);
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.deleteGenre = async (req, res) => {
    try {
        const genreId = req.params.id;

        const message = genreService.deleteGenre(genreId);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success(`[GENRE_CONTROLLER] DELETE - 200`);
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

