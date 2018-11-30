"use strict"

let busboy = require('connect-busboy')
const multer  = require('multer')

const fs = require('fs');

const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));
app.use(busboy());

const galery = './public/image/galery/';

let service= require("./public/json/serviceJSON.js");
let desert= require("./public/json/desert.js");
let menuPizza = require("./public/json/menuPizza.js");
let menuHot = require("./public/json/menuHot.js");
let menuCold = require("./public/json/menuCold.js");
let menuGarnirs= require("./public/json/garnirs.js");
let cocktail= require("./public/json/cocktail.js");
let pivo= require("./public/json/pivo.js");
let vodka= require("./public/json/vodka.js");
let tea= require("./public/json/tea.js");
let sokmorozh= require("./public/json/sokmorozh.js");
let supzavtrak= require("./public/json/supzavtrak.js");
let sandwblinch= require("./public/json/sandwblinch.js");
let salat= require("./public/json/salat.js");

let allMenuWith = menuPizza.concat(salat, sandwblinch, supzavtrak, menuHot,menuCold, menuGarnirs,desert);
let allMenuWithout = pivo.concat(vodka,tea,sokmorozh,cocktail);

app.post('/profile', function(req, res) {
  console.log(req);
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./public/image/galery/'+'Новый год/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send('upload succeeded!');
        });
    });
});

/*
app.post('/profile', multer(

  { dest: './public/image/galery/' }
).single('avatar'), function (req, res, next) {
  console.log(req.file);
  res.send('ok')
})
*/
/////////////////создание папки
const mkdirSync = function (path) {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

//mkdirSync(testFolder+'new_folber');

//////////////чтение файлов
app.get('/galeryFolber',(req, res) => {
    fs.readdir(galery, (err, files) => {
    res.send(files);
    })
})

app.post("/getFilesInFolber", (req,res) => {
    fs.readdir(galery+req.body.name, (err, files) => {
    res.send(files);
  })
});

app.get('/allMenu', (req,res) =>{
         res.send (require("./public/json/allMenu.js"));
})

app.get('/menuWith', (req,res) =>{
         res.send (allMenuWith);
})

app.get('/menuWithout', (req,res) =>{
         res.send (allMenuWithout);
})

app.get('/service/:id', (req,res) => {
     let id = req.params.id;
     let push = [];
     for (let i=0;i<service.length;i++){
       if (req.params.id ===service[i].id) {
         push = service[i]
       }
     }
     res.render('oneService.ejs',{post:push});
   })

app.get('/',(req, res) => {
  res.render('index.ejs');
})

app.get('/menu',(req, res) => {
  res.render('menu.ejs');
})

app.get('/about',(req, res) => {
  res.render('about.ejs');
})

app.get('/service',(req, res) => {
  res.render('service.ejs');
})


app.get('/galery',(req, res) => {
  res.render('galery.ejs');
})
app.get('/administrator', (req,res) =>{
      res.render('administrator.ejs');
})
 app.listen(3000, () => {

      console.log('--// PARK AVENJU start --//');
  })﻿;
