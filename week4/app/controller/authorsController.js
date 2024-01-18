const authorService = require('../services/authorService');
const logger = require('../util/logger/logger');
const HttpStatus = require('http-status');
const path = require('path');
const filename = path.basename(__filename);

exports.getAllAuthor = async (req, res) => {
    try {
        const name_param = req.query.name;
        const limit_param = req.query.limit;

        const authors = authorService.getAllAuthor(name_param, limit_param);

        res
            .status(HttpStatus.OK)
            .json(authors);

        logger.success(`[AUTHOR_CONTROLLER] GET - 200`);
    } catch (error) {
        logger.error(`[AUTHOR_CONTROLLER] GET - 500`);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}


exports.addAuthor = async (req, res) => {
    try {
        const author = req.body;
        const message = authorService.addAuthor(author);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[AUTHOR_CONTROLLER] POST - 200");
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = req.body;
        const message = authorService.updateAuthor(authorId, author);
        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[AUTHOR_CONTROLLER] PUT - 200");
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}

exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const message =  authorService.deleteAuthor(authorId);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[AUTHOR_CONTROLLER] DELETE - 200");
    } catch (error) {
        logger.error(error.message);

        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message: error.message});
    }
}