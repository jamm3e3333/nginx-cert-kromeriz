const express = require('express');
const app = express();
const path = require('path');
const port = 3010;

const publicPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

app.set('view engine','hbs');
app.set('views', viewsPath);
app.use(express.json());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
