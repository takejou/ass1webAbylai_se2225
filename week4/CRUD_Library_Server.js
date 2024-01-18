const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.json());
app.use(fileUpload());
const PORT = 3000;

const logger = require('./app/util/logger/logger')

const authorRoutes = require('./app/routers/authorsRouter');
const bookRoutes = require('./app/routers/booksRouter');
const genreRoutes = require('./app/routers/genresRouter');
const fileRoutes = require('./app/routers/fileRouter');

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);
app.use('/file', fileRoutes);

app.listen(PORT, () => {
    logger.success(`The server is running on port ${PORT}`)
})