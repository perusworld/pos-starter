var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs')
var app = express();

var dummyData = [];
var dummyDataFiles = ['www/data/menu.json'];
dummyDataFiles.forEach(function (file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        dummyData[file] = JSON.parse(data);
    });
});

var useDummyData = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

app.post('/menu', function (req, res) {
    if (useDummyData) {
        res.json(dummyData[dummyDataFiles[0]]);
    } else {
    }
});

app.post('/orders', function (req, res) {
    if (useDummyData) {
        res.json({});
    } else {
    }
});

app.post('/confirm', function (req, res) {
    if (useDummyData) {
        res.json({});
    } else {
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
