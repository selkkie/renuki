const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://selkie:kommsussertod@ds041516.mlab.com:41516/renuki', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

console.log('you just activated my trap card!')



app.get('/', (req, res) => {
  db.collection('parts').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {parts: result, projects: result, procurement: result})
  })
})






app.post('/parts', (req, res) => {
  db.collection('parts').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/projects', (req, res) => {
  db.collection('projects').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/procurement', (req, res) => {
  db.collection('procurement').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


app.get('/', (req, res) => {
  var cursor = db.collection('projects').find()
})
app.get('/', (req, res) => {
  var cursor = db.collection('parts').find()
})

app.get('/', (req, res) => {
  var cursor = db.collection('procurement').find()
})