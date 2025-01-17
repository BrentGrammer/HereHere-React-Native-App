export const emailValidator = (email) => {
  let isValid = false;
  const regex = new RegExp(/(?!.*\.\.)(^[^@\s]+@[^@\s]+\.[^@\s\.]+$)/);
  if (regex.test(email) && email.length > 0) {
    isValid = true;
  }

  return isValid;
};