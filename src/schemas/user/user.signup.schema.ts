import zod from "zod";

export const UserSignUpSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string().min(6),
});

export type UserSignUp = zod.infer<typeof UserSignUpSchema>;
