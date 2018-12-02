"use strict"
const multer  = require('multer')
const fs = require('fs');
const rimraf = require('rimraf');
const express = require('express');
const bodyParser = require( 'body-parser' );

const app = express();
app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

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



app.post('/createDir',function(req,res,next){
  fs.mkdirSync(galery+req.body.text);
  res.redirect('/administrator')
})

app.post('/deleteDir',function(req,res,next){
    rimraf(galery+req.body.text, function () {
    res.redirect('/administrator')});
})

app.post('/profile', multer().array('photo', 100), function (req, res, next) {
  //  console.log(req.files);
    for (let i=0;i<req.files.length;i++){
      let wstream = fs.createWriteStream(galery+req.body.text+'/'+req.files[i].originalname);
        wstream.write(req.files[i].buffer);
        wstream.end();
    }
      res.redirect('/administrator')
})

/////////////////создание папки
/*
const mkdirSync = function (path) {
  try {
    fs.mkdirSync(path)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}*/
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

fs.readFile( './sitemap.xml', function(err, data) {
    app.get('/sitemap.xml', function(req, res) {
  res.setHeader('content-type', 'text/xml; charset=utf-8');
  res.setHeader('content-disposition', 'inline');

      res.send(data);
    });
 });

/*
 app.get('/sitemap.xml', (req,res) => {
 fs.readFile('./sitemap.xml', data => res.send(data))
})
*/

 app.get('/robots.txt', function(req, res) {
   res.send( fs.readFileSync("robots.txt", "utf8"));
 });


 app.listen(80, () => {

      console.log('--// PARK AVENJU start --//');
  })﻿;
