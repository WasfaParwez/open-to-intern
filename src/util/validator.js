const mongoose= require ('mongoose')


const isValid= function (value){

    if (value == null || typeof value === undefined) return false;
    if (typeof value == "string" && value.trim() == "") return false;
    if (typeof value !== 'string')return false
    return true
}

const validString = (input)=>{
  return /^[a-zA-Z\s]+$/.test(input)
}

const isEmailValid= function (email){

return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
};

const isMobileNumValid= function (mobilenum){

    if(mobilenum.length !== 10) {return false}
    return mobilenum.match(/^[0-9]+$/)
}

const isObjectIdValid = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

  const isRequestBodyValid = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };
module.exports={isValid,isEmailValid,isMobileNumValid,isObjectIdValid,isRequestBodyValid,validString}