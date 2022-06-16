export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(String(phone).toLowerCase());
};
export const validateAadhar = (aadhar) => {
  const re = /^\d{12}$/;
  return re.test(String(aadhar).toLowerCase());
};
export const validateBloodGroup = (group) => {
  const re = /(a|b|ab|o)[+-]/;
  return re.test(String(group).toLowerCase());
};
export const validatePassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!&$%@]).{8,20}$/;
  return re.test(String(password));
};
