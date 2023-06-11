const InternModel= require('../model/internmodel');
const CollegeModel= require('../model/collegemodel')
const validator = require('../util/validator')

//================================================================================================

const createCollege =async(req,res)=>{
    data=req.body;
    const {name,fullName,logoLink}=data;

    if(!validator.isRequestBodyValid(data))
     return res.status(400).send({status:false,message:"Invalid request"})

    if(!validator.isValid(name))
    return res.status(400).send({status:false,message:"name is invalid"})
    if(!name){
        res.status(400).send({status:false,message:"name is required"});
    }
    if(!validator.isValid(fullName))
    return res.status(400).send({status:false,message:"fullName is invalid"})
    if(!fullName){
        res.status(400).send({status:false,message:"fullName is required"});
    }
    if(!validator.isValid(logoLink))
    return res.status(400).send({status:false,message:"logoLink is invalid"})
    if(!logoLink){
        res.status(400).send({status:false,message:"logoLink is required"});
    }
    namefind= await CollegeModel.findOne({name:name})
    if(namefind){
        return res.status(400).send({status:false,message:"Name already exists"})
    }


    const college= await CollegeModel.create(data);

    response= {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        isDeleted: college.isDeleted
    }
    res.status(201).send({status:true,data:response});
}


//==================================================================================================

const createIntern= async (req,res)=>{
    data=req.body;
    const {name,email,mobile,collegeId}=data;

    if(!validator.isRequestBodyValid(data))
     return res.status(400).send({status:false,message:"Invalid request"})


    if(!validator.isValid(name))
    return res.status(400).send({status:false,message:"name is invalid"})
    if(!name){
        res.status(400).send({status:false,message:"name is required"});}


    if(!validator.isEmailValid(email)){
        res.status(400).send({status:false,message:"email is invalid"})}
    if(!email){
        res.status(400).send({status:false,message:"email is required"});}
    emailfind= await InternModel.findOne({email:email})
    if(emailfind){
        return res.status(400).send({status:false,message:"Email already exists"})
    }

    if(!validator.isMobileNumValid(mobile)){
        return res.status(400).send({status:false,message:"mobile number is invalid"});}
    if(!mobile){
        res.status(400).send({status:false,message:"mobile is required"});}
    mobilefind= await InternModel.findOne({mobile:mobile})
    if(mobilefind){
        return res.status(400).send({status:false,message:"Mobile number already exists"})}


    if(!validator.isObjectIdValid(collegeId)){
        return res.status(400).send({status:false,message:"collegeId is invalid"});}
    if(!collegeId){
        res.status(400).send({status:false,message:"collegeId is required"});
    }

    const intern= await InternModel.create(data);
    console.log(intern.email)

    response={
        isDeleted: intern.isDeleted,
        name: intern.name,
        email: intern.email,
        mobile: intern.mobile,
        collegeId: intern.collegeId
    }

    res.status(201).send({status:true,data:response})

}

//==========================================================================================================

const getAllCollegeInterns=async(req,res)=>{
    collegeName = req.query.collegeName

    const college= await CollegeModel.findOne({name:collegeName})
    if(!college){
        return res.status(404).send({status:false,message:"college not found"})
    }

    const interns= await InternModel.find({collegeId:college._id})

    response={
        name: collegeName,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: interns
    }

    res.status(200).send({status:true,data:response});
    
}

module.exports={
    createIntern,
    createCollege,
    getAllCollegeInterns
}