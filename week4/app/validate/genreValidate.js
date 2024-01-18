const log = require("../util/logger/logger");

exports.validate = (genre) => {
    const { name } = genre;

    if (typeof name !== 'string') {
        const errorMessage = `[GENRE_VALIDATE] The variable type is incorrect!`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    if (name.length < 2 || name.length > 30) {
        const errorMessage = `[GENRE_VALIDATE] The length of title is incorrect. The length of title is ${name} = ${name.length}`;
        log.error(errorMessage);
        return { valid: false, message: errorMessage };
    }

    return { valid: true, message: "[GENRE_VALIDATE] Successfully!" };
}