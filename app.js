const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const booksRouter = require('./src/routes/books');
const membersRouter = require('./src/routes/members');

const swaggerDocs = require('./swagger');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/members', membersRouter);

swaggerDocs(app);

module.exports = app;
