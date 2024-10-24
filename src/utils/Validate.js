export const checkValidData = (name, email, password, isSignInForm) => {
  const isNameValid = /^[a-zA-Z\s]{2,30}$/.test(name);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    ); 

if (!isNameValid && !isSignInForm) return "Name is not valid"; // Only check for name in Sign Up
if (!isEmailValid) return "Email is not valid";
if (!isPasswordValid) return "Password is not valid";

  return null;
};


 