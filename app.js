// app.js
const express = require('express');
const exphbs = require('express-handlebars');

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 80;

const hbsConfig = {
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require("./public/js/helpers.js").helpers
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.engine('hbs', exphbs.engine(hbsConfig));
app.set('view engine', 'hbs');

app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Up and Running! Listening on port ${port}`);
});
