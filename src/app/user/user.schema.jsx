import { object, string } from "yup";
export const SchemaSignUp = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(8).max(32).required(),
});
