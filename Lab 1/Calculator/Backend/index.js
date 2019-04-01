var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var math = require('mathjs');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



app.post('/Calculator', function (req, res) {
    var equation = req.body.equation;
    console.log(equation);
     var ans = math.eval(equation);
     console.log(ans);

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(""+ans);
    
    
});




app.listen(3001);
console.log("Server Listening on port 3001");