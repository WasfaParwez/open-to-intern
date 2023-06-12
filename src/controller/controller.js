const InternModel= require('../model/internmodel');
const CollegeModel= require('../model/collegemodel')
const validator = require('../util/validator')
const isURL = require('is-url');

//================================================================================================

const createCollege =async(req,res)=>{
    try{
    const data=req.body;
    const {name,fullName,logoLink}=data;

    if(!validator.isRequestBodyValid(data))
     return res.status(400).send({status:false,message:"Invalid request"})

    if(!name){
        return res.status(400).send({status:false,message:"name is required"});
    }
    if(!validator.isValid(name))
    return res.status(400).send({status:false,message:"name is invalid"})
    if(!validator.validString(name))
    return res.status(400).send({status:false,message:"name is not in valid format"})

    if(!fullName){
        return res.status(400).send({status:false,message:"fullName is required"});
    }
    if(!validator.isValid(fullName))
    return res.status(400).send({status:false,message:"fullName is invalid"})
    if(!validator.validString(fullName))
    return res.status(400).send({status:false,message:"fullName is not in valid format"})

    if(!logoLink){
        return res.status(400).send({status:false,message:"logoLink is required"});
    }
    if(!validator.isValid(logoLink))
    return res.status(400).send({status:false,message:"logoLink is invalid"})
    if (!isURL(logoLink)) return res.status(400).send({ status: false, msg: "not a valid logoLink" });

    const namefind = await CollegeModel.findOne({name:name})
    if(namefind){
        return res.status(400).send({status:false,message:"Name already exists"})
    }


    const college= await CollegeModel.create(data);

    const response= {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        isDeleted: college.isDeleted
    }
    res.status(201).send({status:true,data:response});
}
catch(error){
    res.status(500).send({status:false,message:error.message});
}
}


//=================================================================================================

const createIntern= async (req,res)=>{
    try{
    const data=req.body;
    const {name,email,mobile,collegeId}=data;

    if(!validator.isRequestBodyValid(data))
     return res.status(400).send({status:false,message:"Invalid request"})

    if(!name){
        return res.status(400).send({status:false,message:"name is required"});}
    if(!validator.isValid(name))
    return res.status(400).send({status:false,message:"name is invalid"})
    if(!validator.validString(name))
    return res.status(400).send({status:false,message:"name is not in valid format"})

    if(!email){
        return res.status(400).send({status:false,message:"email is required"});}
    if(!validator.isEmailValid(email)){
        return res.status(400).send({status:false,message:"email is invalid"})}
    emailfind= await InternModel.findOne({email:email})
    if(emailfind){
        return res.status(400).send({status:false,message:"Email already exists"})
    }
    if(!mobile){
        return res.status(400).send({status:false,message:"mobile is required"});}
    if(!validator.isMobileNumValid(mobile)){
        return res.status(400).send({status:false,message:"mobile number is invalid"});}
    mobilefind= await InternModel.findOne({mobile:mobile})
    if(mobilefind){
        return res.status(400).send({status:false,message:"Mobile number already exists"})}

    if(!collegeId){
            return res.status(400).send({status:false,message:"collegeId is required"});
        }
    if(!validator.isObjectIdValid(collegeId)){
        return res.status(400).send({status:false,message:"collegeId is invalid"});}

    const intern= await InternModel.create(data);
    console.log(intern.email)

    const response={
        isDeleted: intern.isDeleted,
        name: intern.name,
        email: intern.email,
        mobile: intern.mobile,
        collegeId: intern.collegeId
    }

    res.status(201).send({status:true,data:response})

}
catch(error){
    res.status(500).send({status:false,message:error.message});
}
}

//==========================================================================================================

const getAllCollegeInterns=async(req,res)=>{
    try{
    const collegeName = req.query.collegeName

    const college= await CollegeModel.findOne({name:collegeName})
    if(!college){
        return res.status(404).send({status:false,message:"college not found"})
    }

    const interns= await InternModel.find({collegeId:college._id}).select({"name": 1,"email": 1,"mobile": 1})

    const response={
        name: collegeName,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: interns
    }

    res.status(200).send({status:true,data:response}); 
    
}
catch(error){
    res.status(500).send({status:false,message:error.message});
}
}

module.exports={
    createIntern,
    createCollege,
    getAllCollegeInterns
}