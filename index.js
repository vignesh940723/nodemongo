const express =  require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Post = require('./database/models/post');

app.use(express.static('public'))

app.get('/ui',  function(req,res){
    res.sendFile(path.resolve(__dirname,'index.html'));
})

app.get('/tasks',function(req,res){ 
    res.status(200).send('returns the list of tasks as array')
})

app.get('/tasks/:id',function(req,res){
    res.status(200).send('returns a single task')
})

app.post('/task',function(req,res){
    res.status(201).send('creates a task')
})
app.put('/tasks/:id',function(req,res){
    res.status(200).send('updates a single task')
})

app.delete('/tasks/:id',function(req,res){
    res.status(200).send('returns a single task')
})


app.get('/create',function(req,res){
    Post.create({
        name:'test',
        email:'test@tst.com'
    }).then(post =>{
        res.send(post)
    }).catch(err => {
        res.send(err);
    })
})

app.get('/post/:id',function(req,res){
    Post.findById(req.params.id).then(post=>{
        res.status(200).send(post)
    }).catch(err =>{
        res.status(500).send(err);
    })
})


app.listen(3000,function(){
    console.log('App running at port 3000');
})

mongoose.connect('mongodb://localhost/node-js-tests')