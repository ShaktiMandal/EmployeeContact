//This is all about validating the data


// This is field level validation
// for example - email , password
// input - field name and field value
// output - error message (if there is any) / empty string (if no error)
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
      case "groupName":
      case "description":
      case "lastName":
      case "firstName":
        return getErrorMsgForOther(value, fieldName);
    }

    return errorMessage;
  };
};


// This is form level validation
// for example - Add group / sign in / register
// input - fall form data as an object
// output - error message (if there is any) / empty string (if no error)

const formLevelValidation = () => {

    return function(data)
    {
        let errorMessages = "";
        Object.keys(data).forEach(( item, index) => {
     
            if(index === 0)
            {
                errorMessages = fieldValidation(item, data[item]);
            }
            else
            {
              let message = fieldValidation(item, data[item]);
              if(message.length > 0)
              {
                //here appending "/ " between two error message
                errorMessages += " / " + message;
              }
            }  
               
        });

        return errorMessages;
    }
}

const getErrorMsgForEmail = (email) => {
  var regexp= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(email.length === 0 || email === undefined)
    {
      return "Please enter email id"
    }
    if(!email.includes("@inmar.com"))
    {
      // this is specific check to validate inmar.com domain present or not
      return "Invalid email, should have @inmar.com"
    }
    if(regexp.test(email))
    {
        return "";
    }

    return "Invalid email";
}

const getErrorMsgForPhoneNo = (phoneNo) => {

  var regexp= /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if(phoneNo.length === 0 || phoneNo === undefined)
    {
      return "Please enter mobile number";
    }
    if(regexp.test(phoneNo))
    {
        return "";
    }

    return `Invalid phone number"`;
}

const getErrorMsgForAdharNo = (adharNo) => {
    var regexp= /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

    if(adharNo.length === 0 || adharNo === undefined)
    {
      return "Please enter adhaar number";
    }
    if(regexp.test(adharNo))
    {
        return "";
    }

    return `Invalid adhar number, should be 12 digits"`;
}

const getErrorMsgForPassword = (password) => {

    if(password.length === 0 || password === undefined)
    {
      return "Please enter password";
    }
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

    return value.length > 0 || value === undefined ? "" : `${fieldName} Value should not be empty`;
}


//Just rtaking the reference the function
//thus, no need to create reference every time function
//call happen, reduce memory optimization

const fieldValidation = fieldLevelValidation();
const formValidation = formLevelValidation();

export {fieldValidation, formValidation};



