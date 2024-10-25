export const checkValidData = (name, email, password, isSignInForm) =>{

const isNameValid = /^[a-zA-Z\s]{2,30}$/.test(name);
const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(!isEmailValid) return "Email Id is not valid";
if(!isPasswordValid) return "Password is not valid";
if(!isNameValid && !isSignInForm) return "Name is not valid";

return null;
};