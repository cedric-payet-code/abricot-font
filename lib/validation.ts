export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  "Au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&).";

export const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
