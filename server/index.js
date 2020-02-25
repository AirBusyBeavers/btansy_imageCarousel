const nr = require('newrelic');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const controllers = require('./controllers');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/gallery/:id', controllers.gallery.getOne);

// app.get('/gallery/:id', controllers.gallery.cache, controllers.gallery.getOne);

app.get('/galleries', controllers.gallery.getAll);

app.post('/gallery', controllers.gallery.postOne);

app.put('/gallery/:id', controllers.gallery.updateOne);

app.delete('/gallery/:id', controllers.gallery.deleteOne);

app.delete('/gallery/', controllers.gallery.deleteAll);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
