const mongoose= require ('mongoose')


const isValid= function (value){

    if (value == null || value == undefined) return false;
    if (typeof value == "string" && value.trim() == "") return false;
    if (typeof value !== 'string')return false
    return true
}

const isEmailValid= function (email){

return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
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
module.exports={isValid,isEmailValid,isMobileNumValid,isObjectIdValid,isRequestBodyValid}