const bookService = require('../services/bookService');
const HttpStatus = require('http-status');
const logger = require('../util/logger/logger');

exports.getAllBooks = async (req, res) => {
    try {
        const price_param = req.query.price;
        const reverseSort = req.query.reverseSort;
        const priceOption = req.query.priceOption;
        const limit_param = req.query.limit;

        const books = bookService.getAllBooks(price_param, priceOption, reverseSort, limit_param);

        res
            .status(HttpStatus.OK)
            .json(books);

        logger.success("[BOOK_CONTROLLER] GET - All books fetched successfully");
    } catch (error) {
        logger.error(error);
    }
};

exports.addBook = async (req, res) => {
    try {
        const book = req.body;
        const message = bookService.addBook(book);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[BOOK_CONTROLLER] POST - Book added successfully");
    } catch (error) {
        logger.error(error);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateBook = req.body;

        const message = bookService.updateBook(bookId, updateBook);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[BOOK_CONTROLLER] PUT - Book updated successfully");
    } catch (error) {
        logger.error(error);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const message = bookService.deleteBook(bookId);

        res
            .status(HttpStatus.OK)
            .json(message);

        logger.success("[BOOK_CONTROLLER] DELETE - Book deleted successfully");
    } catch (error) {
        logger.error(error);
    }
};
