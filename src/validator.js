const fieldLevelValidation = () => {
  return function (fieldName, value) {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        return getErrorMsgForEmail(value);

      case "phoneNumber":
        return getErrorMsgForPhoneNo(value);

      case "adharNo":
        return getErrorMsgForAdharNo(value);

      case "password":
        return getErrorMsgForPassword(value);

      case "name":
      case "description":
      case "lastName":
      case "firstName":
        return getErrorMsgForOther(value, fieldName);
    }

    return errorMessage;
  };
};


const formLevelValidation = () => {

    return function(data)
    {
        let errorMessages = "";
        Object.keys(data).forEach(( item, index) => {
          if(data[item].length > 0)
          {
            if(index === 0)
            {
                errorMessages = fieldValidation(item, data[item]);
            }
            else
            {
              let message = fieldValidation(item, data[item]);
              if(message.length > 0)
              {
                errorMessages += "\n" + message;
              }
            }  
          }     
        });

        console.log("form validation", errorMessages);
        return errorMessages;
    }
}

const getErrorMsgForEmail = (email) => {
  var regexp= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(regexp.test(email))
    {
        return "";
    }

    return `Invalid email, make sure to add "inmar.com"`;
}

const getErrorMsgForPhoneNo = (phoneNo) => {

  var regexp= /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if(regexp.test(phoneNo))
    {
        return "";
    }

    return `Invalid phone number"`;
}

const getErrorMsgForAdharNo = (adharNo) => {
    var regexp= /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    if(regexp.test(adharNo))
    {
        return "";
    }

    return `Invalid adhar number, should be 12 digits"`;
}

const getErrorMsgForPassword = (password) => {

    const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(password)) {
          return "Password must not contain Whitespaces.";
        }
    
    
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(password)) {
          return "Password must have at least one Uppercase Character.";
        }
    
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(password)) {
          return "Password must have at least one Lowercase Character.";
        }
    
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(password)) {
          return "Password must contain at least one Digit.";
        }
    
        const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(password)) {
          return "Password must contain at least one Special Symbol.";
        }

        const isValidLength = /^.{10,16}$/;
        if (!isValidLength.test(password)) {
          return "Password must be 10-16 Characters Long.";
        }
      
      return "";
}

const getErrorMsgForOther = (value, fieldName) => {

    return value.length  > 0 ? "" : `${fieldName} Value should not be empty`;
}

const fieldValidation = fieldLevelValidation();
const formValidation = formLevelValidation();

export {fieldValidation, formValidation};


