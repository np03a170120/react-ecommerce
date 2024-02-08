import { object, string, number } from "yup";
export const SchemaSignUp = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().required(),
  password: string().min(8).max(32).required(),
});
export const SchemaLogin = object({
  email: string().email().required(),
  password: string().min(8).max(32).required(),
});
