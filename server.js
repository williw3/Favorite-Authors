var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static( __dirname + '/author/dist'));
app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');
var mongoose = require('mongoose'); //require mongoose
mongoose.connect('mongodb://localhost/authorsdb');
mongoose.Promise = global.Promise;


// var Schema = mongoose.Schema;

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quote: {type: String, required: true}
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');


app.get('/allAuthors', function(req, res){
    Author.find({}, function(err, authors){
        if(err){
            res.json({message: 'Error', err})
        }
        else{
            res.json({data: authors})
        }
    })
})

app.post('/authors', function(req, res){
    console.log('In the server');
    var new_author = new Author({name: req.body.name, quote: req.body.quote});
    console.log(new_author);
    new_author.save(function(err, authors){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: authors})
        }
    })
})

app.get('/authors/:id', function(req, res){
    Author.findOne({_id: req.params.id}, function(err, authors){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({data: authors})
        }
    })
})

app.delete('/authors/:id', function(req, res){
    console.log("In the servvverererer", req.params.id);
    Author.remove({_id: req.params.id}, function(err, authors){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: authors})
        }
    })
})

app.put('/authors/:id', function(req, res){
    console.log("made it to the SERVER.js");
    Author.update({_id: req.params.id}, {name: req.body.name, quote: req.body.quote}, function(err, authors){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: authors})
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});



app.listen(8000, function(){
    console.log("Listening on port 8000");
})