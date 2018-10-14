const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path=require('path');

const port=process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error while writing log in the file');
        }
    })
    next();
});
// app.use((req, res, next) => {
//     res.render('maintinance.hbs');
// });
//app.use(express.static(path.join(__dirname, '/styles')));
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageInfo: 'Welcome...',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageInfo: 'This is about page',
    });
});
app.get('/bad', (req, res) => {
    res.send('<h2 style="color:red;">Bad Request</h2>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});