const log = require('../util/logger/logger');

exports.validate = (book) => {
    const { title, author, publishYear, pageCount, price } = book;

    if (
        typeof title !== 'string' ||
        typeof author !== 'string' ||
        typeof publishYear !== 'number' ||
        typeof pageCount !== 'number' ||
        typeof price !== 'number'
    ) {
        const errorMessage = `[BOOK_VALIDATE] The variable type is incorrect!`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    if (title.length < 2 || title.length > 30) {
        const errorMessage = `[BOOK_VALIDATE] The length of title is incorrect. The length of title is ${title} = ${title.length}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    if (author.length < 2 || author.length > 30) {
        const errorMessage = `[BOOK_VALIDATE] The length of author is incorrect. The length of author is ${author} = ${author.length}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    const publishedYearDataFormat = new Date(publishYear);

    if (publishedYearDataFormat < new Date("01.01.1900") ||
        publishedYearDataFormat > new Date("01.01.2024")) {
        const errorMessage = `[BOOK_VALIDATE] The publish year is not within the allowed range. The publish year is ${publishYear}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    if (pageCount < 3 || pageCount > 1300) {
        const errorMessage = `[BOOK_VALIDATE] The page count is not within the allowed range. The page count is ${pageCount}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    if (price < 0 || price > 150000) {
        const errorMessage = `[BOOK_VALIDATE] The price is not within the allowed range. The price is ${price}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    return { valid: true, message: "[BOOK_VALIDATE] Successfully!" };
}
