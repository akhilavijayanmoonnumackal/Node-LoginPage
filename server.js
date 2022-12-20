const express=require('express');
const path=require('path');
const bodyparser=require('body-parser') ;
const session=require('express-session');
const  {v4:uuidv4}=require("uuid");
const nocache=require('nocache');
const router=require('./router');

const app=express();

const port=process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(nocache());

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

//local static asset
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);

//home route
app.get('/',(req,res)=>{
    if(req.session.user==null){
        res.render('base',{title:"Login System"});
    }else{
        res.render('dashboard');
    }   
});

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")});