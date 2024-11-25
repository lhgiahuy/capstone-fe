export const vnPhoneRegex =
  /^(([+84]{3})|([84]{2})|0)([3|5|7|8|9])+([0-9]{8})\b/g;

// Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);
