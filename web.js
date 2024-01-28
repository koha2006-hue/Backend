const express = require('express');
let router =express.Router();

const initwebRoutes=(app)=>{
    router.get('/', (req,res)=>{
        res.render('index.js');}
    )

    router.get('/about',(req,res)=>{
        res.send("Hello about page");
})
    return app.use("/",router);

}
module.exports=initwebRoutes;

