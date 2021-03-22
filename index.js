var express = require("express");
const dbConnect=require('monk')('localhost:27017/sonali')



var validator= require('validator');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

// console.log("server running");
var app= express();
app.set('view engine' , 'ejs');

app.use(express.urlencoded({extended:true}));


// app.get('/', function (req, res) {
    

//     // res.send('hello world')
//   });

app.get("/",function(req,res){
    res.render('indexpage');
})
app.get("/addPage",function(req,res){
    dbConnect.get('users').find().then(function(result){

         // console.log(result);
         if(result.length>0){
            // console.log('result exist');

            res.render('addpage',{name:"sonali",age:22,place:"kalyan", tech:[],
                dataFromdb:result 
            });
       
        }
    })
       
});
app.get("/showPage",function(req,res){
    res.render('showpage');
})

app.post("/formAction",function(req,res){
    console.log(req.body);
    var textEmail=req.body.userEmail;
    var textPass=req.body.userPass;
    // console.log(textEmail);
    
    if(validator.isEmpty(textEmail)||validator.isEmpty(textPass)){
        msg='please enter email id and password';
    }
    else if(!validator.isEmail(textEmail)){
        msg='invalid email';
    }
    
     console.log(msg);
    
})

app.get("/product/:pname/:price/:bname", function(req,res){
    console.log(req.params);
    console.log(req.params.bname);
});

app.get('/addProfile',function(req ,res){
    res.render('profilepage');
})

app.post('/fileUploadAction',upload.single('userImage'),function(req,res){
    console.log(req.body);
    console.log(req.file);
    res.send("file upload done")
})

app.get("/addUserPage",function(req,res){
    res.render('adduserpage')
})
app.post("/formUser",function(req,res){
    console.log(req.body);
    dbConnect.get('users').insert(req.body);
    res.redirect("/")
})


  
app.listen(3000 , "localhost" , function(){
    console.log("server running");
})