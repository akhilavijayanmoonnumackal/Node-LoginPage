var express=require("express");
var router=express.Router();

const credential={
    email:'akhilavijayan964@gmail.com',
    password:'akhila123'
}


//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.render('base',{title:'Express',logout:'Invalid Username or Password'})
    }
});


//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base')
    }
});

// TESTING

// router.get('/route',(req,res)=>{
//     if(req.session.user){
//         res.render('dashboard',{user:credential.email})
//     }else{
//         res.render('base')
//     }
// })

//TESTING DONE

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
       if(err){
        //console.log(err);
        res.send("Error")
       }else{
        res.render('base',{title:'Express',logout:'Logout Successfully'})
       }
    })
})
module.exports=router;