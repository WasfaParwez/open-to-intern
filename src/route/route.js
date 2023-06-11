const express=require('express');
const route= express.Router();
const controller= require ('../controller/controller.js')



route.post('/functionup/colleges',controller.createCollege);

route.post('/functionup/interns',controller.createIntern); 

route.get('/functionup/collegeDetails',controller.getAllCollegeInterns);


module.exports=route;
